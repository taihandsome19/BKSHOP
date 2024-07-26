const { db, ref, set, get, onValue, child } = require('../models/database');
const { auth } = require('../models/auth');
const supportFunction = require('../services/support')

class UserService {
    info = async () => {
        const uid = await auth.currentUser.uid;
        // console.log(uid)
        const dbRef = ref(db, `users/${uid}`);
        return new Promise((resolve, reject) => {
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // console.log(data)
                    resolve(data);
                } else {
                    resolve(null);
                }
            }, (error) => reject(error))
        });
    }

    order_overview = async () => {
        const uid = await auth.currentUser.uid;
        const dbRef = ref(db, `orders/${uid}`);
        return new Promise((resolve, reject) => {
            get(child(dbRef))
            .then((snapshot) => {
                if(snapshot.exists()) {
                    const orders = snapshot.val();
                    const orderInfo = Object.keys(orders).map(orderId => ({
                        orderId: orderId,
                        name: orders[orderId].name,
                        price: orders[orderId].price,
                        image: orders[orderId].image,
                        color: orders[orderId].color,
                        memorySize: orders[orderId].memorySize
                    }));
                    var totalPrice = 0;
                    for (var order of orderInfo) {
                        totalPrice += order.price;
                    }
                    resolve({orderInfo: orderInfo, totalPrice: totalPrice})
                }
                else resolve({status: false})
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    order_detail = async (orderId) => {
        const uid = await auth.currentUser.uid;
        const dbRef = ref(db, `orders/${uid}/${orderId}`);
        return new Promise((resolve, reject) => {
            get(child(dbRef))
            .then((snapshot) => {
                if(snapshot.exists()) {
                    const orderDetail = Object.values(snapshot.val());
                    resolve({status: true, orderDetail: orderDetail});
                }
                else resolve({status: false})
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    updateInfo = async (info) => {
        const { name, email, sex, address, date_of_birth, phonenum } = info
        const uid = await auth.currentUser.uid;
        const userRef = ref(db, `users/${uid}/infor`)
        return new Promise((resolve, reject) => {
            set(userRef, {
                name: name,
                email: email,
                sex: sex,
                address: address,
                date_of_birth: date_of_birth,
                phonenum: phonenum
            })
            .then(() => {
                resolve({status: true})
            })
            .catch((error) => {
                reject(error)
            });
        })
    }

    addToOrder = async (body) => {
        const { payment, address, phonenum, indexs, status } = body
        const userId = await auth.currentUser.uid
        const order = await supportFunction.createOrder({ payment, address, phonenum, status })
        return new Promise(async (resolve, reject) => {
            const originalValues = []
            let allProductsAvailable = true
            for (var index of indexs) {
                const cartRef = ref(db, `carts/${userId}/${index}`)
                try {
                    const productSnapshot = await get(cartRef);
                    if (productSnapshot.exists()) {
                        const quantity = productSnapshot.child('quantity').val()
                        const productId = productSnapshot.child('productId').val()
                        const color = productSnapshot.child('color').val()
                        const memorysize = productSnapshot.child('memorysize').val()
                        const name = productSnapshot.child('name').val()
                        const price = productSnapshot.child('price').val()
                        const productRef = ref(db, `products/${productId}/inventory/${color}/${memorysize}`)
                        const snapshot = await get(productRef)
                        if (snapshot.val() < quantity) {
                            allProductsAvailable = false
                            resolve({
                                status: false, 
                                error:  `${name} không đủ số lượng trong kho!`
                            });
                            break
                        } else {
                            originalValues.push({ 
                                ref: productRef, 
                                value: snapshot.val(), 
                                quantity: quantity,
                                productId: productId,
                                color: color,
                                memorysize: memorysize,
                                name: name,
                                price: price
                            })
                        }
                    } else {
                        resolve({
                            status: false, 
                            error: "Sản phẩm chưa được thêm vào giỏ hàng!"
                        })
                    }
                } catch (error) {
                    reject(error)
                }
            }
            if (allProductsAvailable) {
                try {
                    for (let item of originalValues) {
                        await set(item.ref, item.value - item.quantity)
                        order.items[item.productId] = {
                            color: item.color,
                            memorySize: item.memorysize,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity
                        }
                    }
                    // remove product from cart
                    const removeRef = ref(db, `carts/${userId}`)
                    get(removeRef)
                    .then((removeSnapshot) => {
                        var data = removeSnapshot.val() || []
                        indexs.sort((a, b) => b - a)
                        for (var index of indexs) data.splice(index, 1)
                        set(ref(db, `carts/${userId}`), data)
                        const orderId = Date.now();
                        const orderRef = child(ref(db, "orders"), `${userId}/a`);
                        console.log(order)
                        // const orderRef = child(ref(db, "orders"), `${uid}`);
                        // const cartRef = child(ref(db, "carts"), `${uid}`);
                        // const orderRef = ref(db, `orders/${userId}/${orderId}`)
                        // add product to order
                        set(orderRef, order)
                        .then(() => {
                            const orderListRef = ref(db, `users/${userId}/orderlist`)
                            // update user orderlist
                            get(orderListRef)
                            .then((orderListSnapshot) => {
                                if (orderListSnapshot.exists() && orderListSnapshot.val() != "") {
                                    const orderList = orderListSnapshot.val()
                                    orderLisxt.push(orderId)
                                    set(orderListRef, orderList)
                                }
                                else set(orderListRef, [orderId])
                            })
                            .catch((error) => {
                                reject(error);
                            });
                            resolve({ status: true, orderId });
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    })
                } catch (error) {
                    reject(error);
                }
            } 
            else resolve({
                status: false, 
                error: "Không đủ số lượng trong kho!"
            })
        })
    }
}

module.exports = new UserService
