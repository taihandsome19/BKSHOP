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
            get(dbRef)  
            .then((snapshot) => {
                if(snapshot.exists()) {
                    const orders = snapshot.val();
                    const Ids = Object.keys(orders);
                
                    const orderInfo = Ids.map(orderId => ({
                        orderId: orderId,
                        items: orders[orderId].items,
                        status: orders[orderId].status,
                        totalPrice: orders[orderId].totalPrice
                    }));

                    // let totalPrice = 0;
                    // orders.forEach(order => {
                    //     const items = order.items;
                    //     Object.keys(items).forEach(itemId => {
                    //         const item = items[itemId];
                    //         totalPrice += item.price * item.quantity;
                    //     });
                    // });
                    
                    resolve({status: true, orderInfo: orderInfo})
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
            get(dbRef)
            .then((snapshot) => {
                if(snapshot.exists()) {
                    const orderDetail = snapshot.val();
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
        const { name, sex, address, date_of_birth, phonenum } = info;
        const email = await auth.currentUser.email;
        const uid = await auth.currentUser.uid;
        const userRef = ref(db, `users/${uid}/infor`)
        return new Promise((resolve, reject) => {
            set(userRef, {
                email: email,
                name: name,
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
                        const image = productSnapshot.child('image').val()
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
                                price: price,
                                image: image
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
                const order = await supportFunction.createOrder({ payment, address, phonenum, status })
                try {
                    for (let item of originalValues) {
                        // await set(item.ref, item.value - item.quantity)
                        order.items[item.productId] = {
                            color: item.color,
                            memorySize: item.memorysize,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image
                        }
                        order['totalPrice'] += item.price * item.quantity
                    }
                    // resolve(order)
                    // remove product from cart
                    const removeRef = ref(db, `carts/${userId}`)
                    get(removeRef)
                    .then((removeSnapshot) => {
                        var data = removeSnapshot.val() || []
                        indexs.sort((a, b) => b - a)
                        for (var index of indexs) data.splice(index, 1)
                        set(ref(db, `carts/${userId}`), data)
                        const orderId = Date.now()
                        const orderRef = ref(db, `orders/${userId}/${orderId}`)

                        // add product to order
                        set(orderRef, order)
                        .then(() => {
                            const orderListRef = ref(db, `users/${userId}/orderlist`)
                            // update user orderlist
                            get(orderListRef)
                            .then((orderListSnapshot) => {
                                if (orderListSnapshot.exists() && orderListSnapshot.val() != "") {
                                    const orderList = orderListSnapshot.val()
                                    orderList.push(orderId)
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

    notification = async () => {
        const uid = await auth.currentUser.uid;
        return new Promise((resolve, reject) => {
            var userRef = ref(db, `users/${uid}/notificationList`)
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var notificationList = snapshot.val()
                    const notificationArray = Object.entries(notificationList);
                    notificationArray.sort(supportFunction.compareNotifications);
                    notificationList = Object.fromEntries(notificationArray);
                    resolve({status: true, notificationList: notificationList})
                }
                else resolve({status: false, message: "no notification"})
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    updateNotification = async (body) => {
        const uid = await auth.currentUser.uid;
        const { notificationId, status } = body
        return new Promise((resolve, reject) => {
            const notificationRef = ref(db, `users/${uid}/notificationList/${notificationId}`)
            get(notificationRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var statusRef = ref(db, `users/${uid}/notificationList/${notificationId}/status`)
                    set(statusRef, status)
                    .then((snapshot) => {
                        resolve({status: true})
                    })
                    .catch((error) => {
                        reject(error);
                    });
                }
                else resolve({status: false, message: "non-existent notice"})
            })
            .catch((error) => {
                reject(error);
            });
        })
    }
}

module.exports = new UserService