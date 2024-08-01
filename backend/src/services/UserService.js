const { db, ref, set, get, onValue } = require('../models/database');
const { auth } = require('../models/auth');
const supportFunction = require('../services/support');

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

    updateInfo = async (info) => {
        const { name, sex, address, date_of_birth, phonenum } = info;
        const email = await auth.currentUser.email;
        const uid = await auth.currentUser.uid;
        const userRef = ref(db, `users/${uid}/infor`)
        return new Promise((resolve, reject) => {
            set(userRef, {
                email: email,
                name: name,
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

    notification = async () => {
        const uid = await auth.currentUser.uid;
        return new Promise((resolve, reject) => {
            var userRef = ref(db, `users/${uid}/notificationList`)
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var notificationList = snapshot.val()
                    const notificationArray = Object.entries(notificationList);
                    notificationArray.sort(supportFunction.compareNotifications);
                    notificationList = Object.fromEntries(notificationArray);
                    resolve({status: true, notificationList: notificationList})
                }
                else resolve({status: false, message: "no notification"})
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    updateNotification = async (body) => {
        const uid = await auth.currentUser.uid;
        const { notificationId, status } = body
        return new Promise((resolve, reject) => {
            const notificationRef = ref(db, `users/${uid}/notificationList/${notificationId}`)
            get(notificationRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var statusRef = ref(db, `users/${uid}/notificationList/${notificationId}/status`)
                    set(statusRef, status)
                    .then((snapshot) => {
                        resolve({status: true})
                    })
                    .catch((error) => {
                        reject(error);
                    });
                }
                else resolve({status: false, message: "non-existent notice"})
            })
            .catch((error) => {
                reject(error);
            });
        })
    }
    
    review = async (body) => {
        const uid = await auth.currentUser.uid;
        const { star, content, productId, email, name, orderId } = body;
        const productRef = ref(db, `products/${productId}`);
        const reviewRef = ref(db, `products/${productId}/review/${Date.now()}`);
        return new Promise((resolve, reject) => {
            get(productRef)
            .then((snapshot) => {
                if(snapshot.exists()) {
                    set(ref(db, `orders/${uid}/${orderId}/items/${productId}/reviewstatus`), true);
                    set(reviewRef, {
                        star: star,
                        content: content,
                        email: email,
                        name: name
                    })
                    .then(resolve({status: true}))
                    .catch((error) => {
                        reject(error);
                    });
                } else {
                    resolve({status: false, message: "Sản phẩm không tồn tại"});
                }
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

}

module.exports = new UserService