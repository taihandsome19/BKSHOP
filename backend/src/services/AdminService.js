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
                    var result = []
                    snapshot.forEach((productSnapshot) => {
                        const products = productSnapshot.val()
                        productSnapshot.child('inventory').forEach((product) => {
                            product.forEach((number) => {
                                if (number.val() > 0) {
                                    var rac = {
                                        id: productSnapshot.key,
                                        name: products.name,
                                        brand: products.brand,
                                        price: products.price,
                                        description: products.description.detail,
                                        color: product.key,
                                        memorySize: number.key,
                                        quantity: number.val()
                                    }
                                    result.push(rac)
                                }
                            })
                        })
                    })
                    resolve(result)
                } else {
                    resolve({status: false});
                }})
            .catch((error) => {
                reject(error);
            });
        });
    }
    
    updateOrder = async (body) => {
        const { orderId, userId } = body
        const orderRef = ref(db, `orders/${userId}/${orderId}`)
        const userRef = ref(db, `users/${userId}`)
        return new Promise((resolve, reject) => {
            update(orderRef, {
                status: true
            })
            .then(() => {
                // update user orderlist
                
                resolve({status: true})
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    updateProduct = async (body) => {
        const { productId, price, brand, name, description, color, memorySize, quantity } = body
        const productRef = ref(db, `products/${productId}`)
        const descriptionRef = ref(db, `products/${productId}/description`)
        const inventoryRef = ref(db, `products/${productId}/inventory`)
        return new Promise((resolve, reject) => {
            update(productRef, {
                name: name,
                brand: brand,
                price: price
            })
            .then(() => {
                update(descriptionRef, {
                    detail: description
                })
                .then(() => {
                    get(inventoryRef)
                    .then((snapshot) => {
                        var flagcolor = false
                        snapshot.forEach((products) => {
                            if (products.key == color) {
                                flagcolor = true
                                const Ref = ref(db, `products/${productId}/inventory/${color}`)
                                var flagMemorySize = true
                                products.forEach((product) => {
                                    if (product.key == memorySize) {
                                        flagMemorySize = false
                                        const rac = {}
                                        rac[memorySize] = quantity
                                        update(Ref, rac)
                                        .then(() => {
                                            resolve({status: true})
                                        })
                                        .catch((error) => {
                                            reject(error)
                                        });
                                    }
                                });
                                if (flagMemorySize) {
                                    const newMemorySizeRef = ref(db, `products/${productId}/inventory/${color}/${memorySize}`);
                                    set(newMemorySizeRef, quantity)
                                    .then(() => {
                                        resolve({status: true});
                                    })
                                    .catch((error) => {
                                        reject(error);
                                    });
                                }
                            }
                        });
                        if (flagcolor === false) {
                            const newColorRef = ref(db, `products/${productId}/inventory/${color}`);
                            const rac = {}
                            const tmp = rac[color] = {}
                            tmp[memorySize] = quantity
                            set(newColorRef, tmp)
                            .then(() => {
                                resolve({status: true})
                            })
                            .catch((error) => {
                                reject(error)
                            })
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
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