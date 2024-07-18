const e = require('express');
const { auth } = require('../models/auth');
const { db, ref, set, child, get, onValue } = require('../models/database');

class AdminService {
    createProduct = (data) => {
        const productRef = child(ref(db, "Products"), `${Date.now()}`);
        return new Promise((resolve, reject) => {
            try {
                set(productRef, {
                    Description: {
                        Color: data.description.colors,
                        MemorySize: data.description.memorysize,
                        Detail: data.description.detail
                    },
                    Image: data.images,
                    Inventory: data.inventory,
                    Name: data.name,
                    Price: data.price,
                    Brand: data.brand
                });
                resolve({status: true});
            }
            catch(err) {
                reject(err);
            };
        });
    }

    manageUser = async () => {
        const userRef = ref(db, "Users");
        return new Promise((resolve, reject) => {
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const users = snapshot.val();
                    const userInfo = Object.keys(users).map(uid => ({
                        name: users[uid].Infor.Name,
                        email: users[uid].Infor.Email,
                        phone: users[uid].Infor.PhoneNum
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
                        var user_id = orders.key
                        var user_name, mail, phone
                        const userRef = ref(db, "Users");
                        get(userRef)
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                if (snapshot.key === user_id) {
                                    const users = snapshot.val();
                                    users.forEach((user) => {
                                        const infor = user.child('infor')
                                        user_name = infor.child('name')
                                        mail = infor.child('email')
                                        phone = infor.child('PhoneNum')
                                    })
                                }
                            }
                            else {
                                resolve({status: false});
                            }
                        })
                        .catch((error) => {
                            reject(error)
                        })
                        orders.forEach((order) => {
                            order.child('items').forEach((item) => {
                                var temp = {
                                    id: item.key,
                                    name: user_name,
                                    name_product: item.child('name'),
                                    quantity: item.child('quantity'),
                                    status: order.child('status'),
                                    mail: mail,
                                    phone: phone
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