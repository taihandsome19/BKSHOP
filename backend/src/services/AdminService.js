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
                        var user_name, email, phonenum
                        const userRef = ref(db, "users");
                        get(userRef)
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                if (snapshot.key === uid) {
                                    const users = snapshot.val();
                                    users.forEach((user) => {
                                        const infor = user.child('infor')
                                        user_name = infor.child('name')
                                        email = infor.child('email')
                                        phonenum = infor.child('phonenum')
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
                            order.child('items').forEach((item) => {
                                var temp = {
                                    productId: item.key,
                                    user_name: user_name,
                                    name_product: item.child('name'),
                                    quantity: item.child('quantity'),
                                    status: order.child('status'),
                                    email: email,
                                    phonenum: phonenum
                                }
                                result.push(temp)
                            })
                        })
                    });
                    resolve(result)
                }
                else {
                    resolve({status: false});
                }
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
                    const products = snapshot.val()
                    const result = Object.keys(products).map(uid => ({
                        id: uid,
                        name: products[uid].name,
                        brand: products[uid].brand,
                        price: products[uid].price
                    }));
                    resolve(result)
                } else {
                    resolve({status: false});
                }})
            .catch((error) => {
                reject(error);
            });
        });
    }
    
}

module.exports = new AdminService