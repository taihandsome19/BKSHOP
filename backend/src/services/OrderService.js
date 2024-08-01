const { db, ref, set, get, onValue, child } = require('../models/database');
const { auth } = require('../models/auth');
const supportFunction = require('../services/support')

class OrderService {
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
                    
                    resolve({ststus: true, orderInfo: orderInfo})
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

    addToOrder = async (body) => {
        const { payment, address, phonenum, indexs, status } = body
        const userId = await auth.currentUser.uid
        return new Promise(async (resolve, reject) => {
            const order = supportFunction.createOrder({ payment, address, phonenum, status })
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
                            reject(`${name} is not enough!`);
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
                    } 
                    else {
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
                            image: item.image,
                            reviewstatus: false
                        }
                        order['totalPrice'] += item.price * item.quantity
                    }
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

    buyNow = async (body) => {
        const { payment, address, phonenum, productId, status, color, memorySize, image } = body
        const uid = await auth.currentUser.uid;
        return new Promise(async (resolve, reject) => {
            const orderId = Date.now()
            const orderRef = ref(db, `orders/${uid}/${orderId}`)
            const order = await supportFunction.createOrder({ payment, address, phonenum, status })
            const productRef = ref(db, `products/${productId}`)
            const quantityRef = ref(db, `products/${productId}/inventory/${color}/${memorySize}`)
            const product_quanlity = await get(quantityRef)
            if (product_quanlity.exists() && product_quanlity.val() > 0) {
                get(productRef)
                .then((snapshot) => {
                    const product = snapshot.val()
                    order.items[productId] = {
                        color: color,
                        memorySize: memorySize,
                        image: image,
                        name: product.name,
                        price: product.price,
                        quantity: 1
                    }
                    order.totalPrice += parseInt(product.price)
                    set(orderRef, order)
                    .then(() => {
                        set(quantityRef, product_quanlity.val() - 1)
                        .then(() => {
                            const orderListRef = ref(db, `users/${uid}/orderlist`)
                            get(orderListRef)
                            .then((orderListSnapshot) => {
                                if (orderListSnapshot.exists() && orderListSnapshot.val() != "") {
                                    const orderList = orderListSnapshot.val()
                                    orderList.push(orderId)
                                    set(orderListRef, orderList)
                                }
                                else set(orderListRef, [orderId])
                                resolve({status: true, orderId: orderId})
                            })
                            .catch((error) => {
                                reject(error);
                            });
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
            }
            else resolve({status: false, message: "Không đủ số lượng trong kho!"})
        })
    }
    
}

module.exports = new OrderService