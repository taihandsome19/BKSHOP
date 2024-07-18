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

    order = async () => {
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
        const { productId, quantity, color, name, memorysize, image } = productInfo;
        var data = [];
        var found = false;
        
        return new Promise((resolve, reject) => {
            try {
                get(child(ref(db), `carts/${uid}`))
                .then((snapshot) => {
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

    remove = async (body) => { //Chưa lm cc gì, bùn ngủ quá nên đi ngủ :DD
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

}

module.exports = new UserService