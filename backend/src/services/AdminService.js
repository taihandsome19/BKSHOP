const { update } = require('firebase/database');
const { auth } = require('../models/auth');
const { db, ref, set, child, get, onValue } = require('../models/database');

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
                        name: users[uid].infor.name,
                        email: users[uid].infor.email,
                        phone: users[uid].infor.phonenum
                    }));
                    resolve(userInfo);
                } else {
                    resolve({status: false});
                }})
            .catch((error) => {
                reject(error);
            });
        });
    }

    manageOrder = async () => {
        const orderRef = ref(db, "orders");
        var result = []
        return new Promise((resolve, reject) => {
            get(orderRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((orders) => {
                        var uid = orders.key
                        var user_name, email, phonenum, address
                        const userRef = ref(db, "users");
                        get(userRef)
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                if (snapshot.key == uid) {
                                    const users = snapshot.val();
                                    users.forEach((user) => {
                                        const infor = user.child('infor')
                                        user_name = infor.child('name')
                                        email = infor.child('email')
                                        phonenum = infor.child('phonenum')
                                        address = infor.child('address')
                                    })
                                }
                            }
                            else {
                                resolve({status: false}); // Nếu đúng thì sẽ ko chạy vào case này
                            }
                        })
                        .catch((error) => {
                            reject(error)
                        })
                        orders.forEach((order) => {
                            var products = []
                            order.child('items').forEach((item) => {
                                var product = {
                                    productId: item.key,
                                    name_product: item.child('name'),
                                    color: item.child('color'),
                                    memorySize: item.child('memorySize'),
                                    price: item.child('price'),
                                    quantity: item.child('quantity')
                                }
                                products.push(product)
                            })
                            var temp = {
                                orderId: order.key,
                                user_name: user_name,
                                email: email,
                                phonenum: phonenum,
                                address: address,
                                productList: products,
                                status: order.child('status')
                            }
                            result.push(temp)
                        })
                    });
                    resolve(result)
                }
                else resolve({status: false});
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    manageProduct = async () => {
        const productRef = ref(db, "products")
        return new Promise ((resolve, reject) => {
            get(productRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot)
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

    updateProduct = async (body) => { //chua test
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
}

module.exports = new AdminService