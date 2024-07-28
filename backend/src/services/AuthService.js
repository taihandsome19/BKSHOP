const { db, ref, set, child, onValue } = require('../models/database');
const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential, updatePassword } = require('../models/auth');

class AuthService {
    createUser = async (data) => {
        const { email, password, name } = data;
        return new Promise((resolve, reject) => {
            fetchSignInMethodsForEmail(auth, email)//Check email đã đk hay ch?
            .then((signInMethods) => {
                if(signInMethods.length > 0) { //Email đã đăng ký
                    resolve({status: false});
                } else {
                    createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const uid = userCredential.user.uid;
                        const userRef = child(ref(db, "users"), `${uid}`);
                        // const orderRef = child(ref(db, "orders"), `${uid}`);
                        // const cartRef = child(ref(db, "carts"), `${uid}`);
                        set(userRef, {
                            infor: {
                                name: name,
                                phonenum: "",
                                email: email,
                                address: "",
                                sex: "",
                                date_of_birth: ""
                            },
                            role: "user"
                        });
                        // set(orderRef, "");
                        // set(cartRef, "");
                        // console.log(`Đăng ký thành công. UID: ${uid}`);
                        resolve({status: true});
                    })
                    .catch((error) => {
                        resolve({status: false, error: error});
                    })
                }
            })
            .catch((error) => {
                reject(error);
            })
        });
    }

    logout = () => {
        return new Promise((resolve, reject) => {
            if(auth.signOut()) {
                resolve({status: true});
            } else {(error) => reject(error)}
        });
    }

    login = async (data) => {
        const { email, password } = data;
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const dbRef = ref(db, `users/${userCredential.user.uid}`);
                onValue(dbRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const products = snapshot.val();
                        resolve({
                            status: true,
                            name: products.infor.name,
                            email: products.infor.email
                        });
                    } else {
                        resolve({status: false});
                    }
                }, (error) => reject(error));
            })
            .catch((error) => {
                resolve({status: false, message: "Đăng nhập không thành công!", error: error});
            })
        })
    }

    forgotPassword = async (email) => {
        return new Promise ((resolve, reject) => {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                // alert("An email has been sent to you with instructions to reset your password.");
                resolve({status: true});
            })
            .catch((error) => {
                // alert("An error occurred while sending the password reset email");
                reject(error);
            });
        })
    }

    changePassword = async (data) => {
        const { currentPassword, newPassword } = data;
        return new Promise((resolve, reject) => {
            var user = auth.currentUser;
            if (user) {
                var credential = EmailAuthProvider.credential(user.email, currentPassword);
                reauthenticateWithCredential(user, credential)
                .then(() => {
                    updatePassword(user, newPassword)
                    .then(() => {
                        // console.log("Password updated successfully.");
                        resolve({
                            email: user.email,
                            password: newPassword
                        })
                    })
                    .catch((error) => {
                        reject("Mật khẩu yếu xìu");
                    });
                })
                .catch((error) => {
                    reject("Sai mật khẩu nha");
                });
            }
            else reject("Chưa đăng nhập kìa");
        })
    }

    loginState = () => {
        return new Promise((resolve) => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    resolve({status: true});
                } else {
                    resolve({status: false});
                }
            }, (error) => {
                resolve({status: false, error: error});
            });
        });
    };
}

module.exports = new AuthService