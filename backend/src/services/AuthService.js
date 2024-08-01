const { db, ref, set, child, onValue } = require('../models/database');
const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential, updatePassword } = require('../models/auth');

class AuthService {
    createUser = async (data) => {
        const { email, password, name } = data;
        return new Promise((resolve, reject) => {
            fetchSignInMethodsForEmail(auth, email)
            .then((signInMethods) => {
                if(signInMethods.length > 0) {
                    resolve({status: false});
                } else {
                    createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const uid = userCredential.user.uid;
                        const userRef = child(ref(db, "users"), `${uid}`);
                        set(userRef, {
                            infor: {
                                name: name,
                                phonenum: "",
                                email: email,
                                address: "",
                                sex: "",
                                date_of_birth: ""
                            },
                            role: "user",
                            status: true
                        });
                        resolve({
                            status: true,
                            name: name,
                            email: email,
                            role: "user",
                            user_status: true
                        });
                    })
                    .catch((error) => {
                        resolve({status: false, message: error.code});
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
                        const user = snapshot.val();
                        if (user.status === true) {
                            resolve({
                                status: true,
                                name: user.infor.name,
                                email: user.infor.email,
                                role: user.role,
                                user_status: user.status
                            });
                        }
                        else resolve({status: false, message: "Tài khoản của bạn đã bị cấm!"})
                    } else resolve({status: false});
                }, (error) => reject(error));
            })
            .catch((error) => {
                resolve({status: false, message: "Sai email hoặc mật khẩu!"});
            })
        })
    }

    forgotPassword = async (body) => {
        const { email } = body;
        return new Promise ((resolve, reject) => {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                resolve({status: true});
            })
            .catch((error) => {
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
    }
    
}

module.exports = new AuthService