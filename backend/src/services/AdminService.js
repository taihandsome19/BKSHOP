const { update } = require('firebase/database');
const { db, ref, set, child, get } = require('../models/database');

class AdminService {
    createProduct = (data) => {
        const productRef = child(ref(db, "products"), `${Date.now()}`);
        return new Promise((resolve, reject) => {
            try {
                set(productRef, {
                    description: {
                        color: data.description.colors,
                        memorysize: data.description.memorysize,
                        detail: data.description.detail
                    },
                    image: data.images,
                    inventory: data.inventory,
                    name: data.name,
                    price: data.price,
                    brand: data.brand
                });
                resolve({status: true});
            }
            catch(err) {
                reject(err);
            };
        });
    }

    manageUser = async () => {
        const userRef = ref(db, "users");
        return new Promise((resolve, reject) => {
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const users = snapshot.val();
                    const userInfo = Object.keys(users).map(uid => ({
                        userId: uid,
                        name: users[uid].infor.name,
                        email: users[uid].infor.email,
                        phone: users[uid].infor.phonenum,
                        sex: users[uid].infor.sex,
                        address: users[uid].infor.address,
                        date_of_birth: users[uid].infor.date_of_birth,
                        status: users[uid].status,
                        notificationList: users[uid].notificationList
                    }));
                    resolve({status: true, userInfo: userInfo.reverse()});
                } 
                else resolve({status: false, message: "non-existent user"});
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    manageOrder = async () => {
        const orderRef = ref(db, "orders");
        return new Promise((resolve, reject) => {
            get(orderRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const result = [];
                    snapshot.forEach((orders) => {
                        const uid = orders.key;
                        let user_name, email;
                        const userRef = ref(db, `users/${uid}/infor`);
                        get(userRef)
                        .then((userSnapshot) => {
                            if (userSnapshot.exists()) {
                                user_name = userSnapshot.child('name').val();
                                email = userSnapshot.child('email').val();
                            }
                            orders.forEach((order) => {
                                const items = order.child('items');
                                const products = [];
                                items.forEach((item) => {
                                    const product = {
                                        productId: item.key,
                                        name_product: item.child('name').val(),
                                        color: item.child('color').val(),
                                        memorySize: item.child('memorySize').val(),
                                        price: item.child('price').val(),
                                        quantity: item.child('quantity').val(),
                                        image: item.child('image').val()
                                    };
                                    products.push(product);
                                });
                                var paymentSnapshot = order.child('payment')
                                const temp = {
                                    orderId: order.key,
                                    user_name,
                                    email,
                                    phonenum: order.child('phonenum').val(),
                                    address: order.child('address').val(),
                                    orderDate: order.child('orderdate').val(),
                                    productList: products,
                                    payment_method: paymentSnapshot.child('method').val(),
                                    payment_status: paymentSnapshot.child('status').val(),
                                    order_status: order.child('status').val(),
                                    totalPrice: order.child('totalPrice').val()
                                };
                                result.push(temp);
                            });
                        })
                        .then(() => {
                            result.sort((a, b) => {
                                return parseInt(b.orderId) - parseInt(a.orderId);
                            })
                            resolve({status: true, result: result});
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    });
                } 
                else resolve({ 
                    status: false, 
                    message: "non-existent order"
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    };  
    
    manageProduct = async () => {
        const productRef = ref(db, "products")
        return new Promise ((resolve, reject) => {
            get(productRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const products = snapshot.val();
                    const Ids = Object.keys(products);
                
                    const productInfo = Ids.map(productId => ({
                        [productId]: {
                        ...products[productId]
                        }
                    }));
                    resolve(productInfo.reverse());
                } else {
                    resolve({status: false});
                }})
            .catch((error) => {
                reject(error);
            });
        });
    }
        
    updateOrder = async (body) => {
        const { orderId, status } = body
        return new Promise((resolve, reject) => {
            const Ref = ref(db, "orders")
            get(Ref)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((users) => {
                        users.forEach((orders) => {
                            if (orders.key == orderId) {
                                const userId = users.key
                                const orderRef = ref(db, `orders/${userId}/${orderId}`)
                                update(orderRef, {
                                    status: status
                                })
                                .then(() => {
                                    resolve({status: true})
                                })
                                .catch((error) => {
                                    reject(error)
                                });
                            }
                        })
                    })
                }
                else resolve({status: false});
            })
            .catch((error) => {
                reject(error)
            });
        })
    }
    
    updatePayment = async (body) => {
        const { orderId, status } = body
        return new Promise((resolve, reject) => {
            const Ref = ref(db, "orders")
            get(Ref)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((users) => {
                        users.forEach((orders) => {
                            if (orders.key == orderId) {
                                const userId = users.key
                                const paymentRef = ref(db, `orders/${userId}/${orderId}/payment`)
                                update(paymentRef, {
                                    status: status
                                })
                                .then(() => {
                                    resolve({status: true})
                                })
                                .catch((error) => {
                                    reject(error)
                                });
                            }
                        })
                    })
                }
                else resolve({status: false});
            })
            .catch((error) => {
                reject(error)
            });
        })
    }

    updateProduct = async (body) => {
        const { productId, info } = body
        const productRef = ref(db, `products/${productId}`)
        
        return new Promise((resolve, reject) => {
            try {
                set(productRef, info);
                resolve({status: true});
            }
            catch(err) {
                reject(err);
            };
        });
    }

    removeProduct = async(body) => {
        const { productId }= body
        return new Promise((resolve, reject) => {
            const productRef = ref(db, `products/${productId}`)
            remove(productRef)
            .then(() => {
                resolve({status: true})
            })
            .catch((error) => {
                reject(error)
            });
        })
        
    }

    banUser = async (body) => {
        const { userId, status } = body
        return new Promise((resolve, reject) => {
            const userRef = ref(db, `users/${userId}`)
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const statusRef = ref(db, `users/${userId}/status`)
                    set(statusRef, status)
                    .then(() => {
                        resolve({status: true})
                    })
                    .catch((error) => {
                        reject(error)
                    });
                }
                else resolve({status: false, message: "non-existent user"})
            })
            .catch((error) => {
                reject(error)
            });
        })
    }

    add_notification = async (body) => {
        const { userId, notice } = body
        const notification = {
            notice: notice,
            status: false
        }
        const userRef = ref(db, `users/${userId}`)
        return new Promise((resolve, reject) => {
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const notificationId = Date.now()
                    const notificationRef = ref(db, `users/${userId}/notificationList/${notificationId}`)
                    set(notificationRef, notification)
                    .then(() => {
                        resolve({status: true})
                    })
                    .catch((error) => {
                        reject(error)
                    });
                }
                else resolve({status: false, message: "non-existent user"})
            })
            .catch((error) => {
                reject(error)
            });
        })
    }

    countUser = async () => {
        const userRef = ref(db, "users");
        return new Promise((resolve, reject) => {
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let result = 0;
                    const users = snapshot.val();
                    Object.keys(users).forEach((key) => {
                        const user = users[key];
                        if (user.role === "user") result += 1;
                    });
                    resolve(result.toString());
                }
                else resolve("0");
            })
            .catch((error) => {
                reject(error);
            });
        });
    };
    
    countOrder = async () => {
        const orderRef = ref(db, "orders");
        return new Promise((resolve, reject) => {
            get(orderRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let order = 0;
                    let delivery = 0;
                    let revenue = 0;
                    const users = snapshot.val();
                    Object.keys(users).forEach((userkey) => {
                        const user = users[userkey];
                        Object.keys(user).forEach((orderkey) => {
                            order += 1;
                            const orders = user[orderkey]
                            if (orders.status === "Đã giao hàng") { 
                                delivery += 1;
                                if (orders['payment'].status === true) {
                                    revenue += orders.totalPrice
                                }
                            }
                        })
                    });
                    resolve({
                        order,
                        delivery,
                        revenue
                    });
                } 
                else resolve({
                    order: 0,
                    delivery: 0,
                    revenue: 0
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = new AdminService