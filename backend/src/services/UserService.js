const { db, ref, set, get, onValue, child } = require('../models/database');
const { auth } = require('../models/auth');
const { resolvePath } = require('react-router-dom');

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

    order = async () => { //Chưa làm xog
        const uid = await auth.currentUser.uid;
        const dbRef = ref(db, `orders/${uid}`);
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

    cart = async () => {
        const uid = await auth.currentUser.uid;
        // console.log(uid)
        const dbRef = ref(db, `carts/${uid}`);
        return new Promise((resolve, reject) => {
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // console.log(snapshot.size)
                    resolve(data);
                } else {
                    resolve(null);
                }
            }, (error) => reject(error))
        });
    }

    addToCart = async (productInfo) => {
        const uid = await auth.currentUser.uid;
        const { productId, quantity, color, memorysize } = productInfo;
        var data = [];
        var found = false;
        
        return new Promise((resolve, reject) => {
            try {
                get(child(ref(db), `carts/${uid}`))
                .then((snapshot) => {
                    if(snapshot.exists() && snapshot.val() != "") {
                        const obj = Object.values(snapshot.val());
                        data = obj.map((item) => {
                            if(item.productId === productId && item.color === color && item.memorysize === memorysize) {
                                found = true;
                                item.quantity += quantity;
                                return item;
                            }
                            return item;
                        });
                        if(!found) data.push(productInfo);
                        set(ref(db, `/carts/${uid}`), data);
                        resolve({status: true})
                    }
                    else {
                        set(ref(db, `/carts/${uid}`), [productInfo]);
                        resolve({status: true})
                    }
                })
                .catch((error) => {
                    // resolve({status: false, error: error});
                    reject(error);
                });
            }
            catch (error) { 
                reject(error);
            }
        })
    }
    
    increaseQuantity = async (body) => {
        const uid = await auth.currentUser.uid;
        const { index } = body;
        // console.log(index)
        return new Promise((resolve, reject) => {
            get(child(ref(db), `carts/${uid}/${index}/quantity`))
            .then((snapshot) => {
                const data = snapshot.val();
                // console.log(data)
                set(ref(db, `carts/${uid}/${index}/quantity`), data + 1);
                resolve({status: true})
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    decreaseQuantity = async (body) => {
        const uid = await auth.currentUser.uid;
        const { index } = body;
        // console.log(index)
        return new Promise((resolve, reject) => {
            get(child(ref(db), `carts/${uid}/${index}/quantity`))
            .then((snapshot) => {
                const data = snapshot.val();
                // console.log(data)
                set(ref(db, `carts/${uid}/${index}/quantity`), data - 1);
                resolve({status: true})
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    remove = async (body) => {
        const uid = await auth.currentUser.uid;
        const { index } = body;
        // console.log(index)
        return new Promise((resolve, reject) => {
            get(child(ref(db), `carts/${uid}`))
            .then((snapshot) => {
                var data = Object.values(snapshot.val());
                // console.log(data)
                data.splice(index, 1);
                set(ref(db, `carts/${uid}`), data);
                resolve({status: true})
            })
            .catch((error) => {
                reject(error);
            });
        })
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
            })
        })
    }
}

module.exports = new UserService
