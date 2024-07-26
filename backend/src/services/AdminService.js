const { update } = require('firebase/database');
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
                    // const userInfo = Object.keys(users).map(uid => ({
                    //     name: users[uid].infor.name,
                    //     email: users[uid].infor.email,
                    //     phone: users[uid].infor.phonenum,
                    // }));
                    const userInfo = Object.keys(users).map(uid => (users[uid].infor));
                    resolve(userInfo);
                } else {
                    resolve({status: false});
                }})
            .catch((error) => {
                reject(error);
            });
        });
    }

    manageOrder = () => {
        const orderRef = ref(db, "orders");
        return new Promise((resolve, reject) => {
            get(orderRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const result = [];
                    snapshot.forEach((orders) => {
                        const uid = orders.key;
                        let user_name, email, phonenum, address;
                        const userRef = ref(db, `users/${uid}/infor`);
                        get(userRef)
                        .then((userSnapshot) => {
                            if (userSnapshot.exists()) {
                                user_name = userSnapshot.child('name').val();
                                email = userSnapshot.child('email').val();
                                phonenum = userSnapshot.child('phonenum').val();
                                address = userSnapshot.child('address').val();
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
                                const temp = {
                                    orderId: order.key,
                                    user_name,
                                    email,
                                    phonenum,
                                    address,
                                    productList: products,
                                    status: order.child('status').val(),
                                    totalPrice: order.child('totalPrice').val()
                                };
                                result.push(temp);
                            });
                        }).then(() => {
                            resolve(result);
                        }).catch((error) => {
                            reject(error);
                        });
                    });
                } else resolve({ status: false});
            }).catch((error) => {
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

    removeProduct = async(body) => {
        const { productId } = body
        const productRef = ref(db, `products/${productId}`)
        const cartRef = ref(db, "carts")
        return new Promise(async (resolve, reject) => {
            remove(productRef)
            .then((snapshot) => {
                get(cartRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const cart = snapshot.val()
                        Object.keys(cart).forEach((user) => {
                            const cartRef = ref(db, `carts/${user}`)
                            get(cartRef)
                            .then((productSnapshot) => {
                                productSnapshot.forEach((product) => {
                                    if (product.child('productId').val() === productId) {
                                        const removeRef = ref(db, `carts/${user}/${product.key}`)
                                        remove(removeRef)
                                        .then(() => {
                                            resolve({status: true})
                                        })
                                        .catch((error) => {
                                            reject(error)
                                        });
                                    }
                                })
                            })
                            .catch((error) => {
                                reject(error)
                            });
                        })
                    }
                    else resolve({status: false})
                })
                .catch((error) => {
                    reject(error)
                })
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}

module.exports = new AdminService