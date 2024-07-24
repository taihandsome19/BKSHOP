const { db, ref, set, get, onValue, child } = require('../models/database');
const { auth } = require('../models/auth');

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
        const { payment, address, phonenum, indexs } = body
        const userRef = ref(db, "users")
        const userId = await auth.currentUser.uid;

        return new Promise((resolve, reject) => {
            get(userRef)
            .then((snapshot) => {
                if (!snapshot.exists()) resolve({ status: false })
                if (!userId) reject(new Error('user does not exist'))
                const time = new Date()
                const order = {
                    orderdate: `${time.getUTCDate()}/${time.getUTCMonth() + 1}/${time.getUTCFullYear()}`,
                    payment: {
                        method: payment,
                        status: false
                    },
                    status: false,
                    items: {},
                    address: address,
                    phonenum: phonenum
                }
                const promises = [];
                for (var index of indexs) {
                    const cartRef = ref(db, `carts/${userId}/${index}`)
                    promises.push(
                        get(cartRef)
                        .then((productSnapshot) => {
                            if (productSnapshot.exists()) {
                                const productId = productSnapshot.child('productId').val();
                                order.items[productId] = {
                                    color: productSnapshot.child('color').val(),
                                    memorySize: productSnapshot.child('memorysize').val(),
                                    name: productSnapshot.child('name').val(),
                                    price: productSnapshot.child('price').val(),
                                    quantity: productSnapshot.child('quantity').val(),
                                    image: productSnapshot.child('image').val(),
                                }
                            } 
                            else reject(new Error('Product does not exist'))
                        })
                        .catch((error) => {
                            reject(error)
                        })
                    );
                }
                const removeRef = ref(db, `carts/${userId}`)
                get(removeRef)
                .then((snapshot) => {
                    var data = Object.values(snapshot.val());
                    indexs.sort((a, b) => b - a)
                    for (var index of indexs) data.splice(index, 1);
                    set(ref(db, `carts/${userId}`), data);
                })
                .catch((error) => {
                    reject(error);
                });
                Promise.all(promises)
                .then(() => {
                    const orderId = Date.now()
                    const orderRef = ref(db, `orders/${userId}/${orderId}`);
                    set(orderRef, order)
                    .then(() => {
                        const orderListRef = ref(db, `users/${userId}/orderlist`)
                        get(orderListRef)
                        .then((snapshot) => {
                            if (snapshot.exists() && snapshot.val() != "") {
                                const orderList = snapshot.val()
                                orderList.push(orderId)
                                set(orderListRef, orderList)
                            }
                            else set(orderListRef, [orderId])
                            resolve({ status: true, order });
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
                    reject(error)
                });
            })
            .catch((error) => {
                reject(error)
            });
        })
    }
}

module.exports = new UserService
