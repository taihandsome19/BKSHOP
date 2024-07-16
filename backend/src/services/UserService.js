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
        var data = null;
        var found = false;
        
        return new Promise((resolve, reject) => {
            try {
                get(child(ref(db), `carts/${uid}`))
                .then((snapshot) => {
                    data = snapshot.val().map((item) => {
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
    
}

module.exports = new UserService