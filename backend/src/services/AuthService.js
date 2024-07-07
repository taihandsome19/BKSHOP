const { db, ref, set, child, onValue } = require('../models/database');
const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } = require('../models/auth');

class AuthService {
    createUser = async (data) => {
        const { email, password, name } = data;
        return new Promise((resolve, reject) => {
            fetchSignInMethodsForEmail(auth, email)//Check email đã đk hay ch?
            .then((signInMethods) => {
                if(signInMethods.length > 0) { //Email đã đăng ký
                    reject({result: "Email đã được đăng ký"});
                } else {
                    createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const uid = userCredential.user.uid;
                        const userRef = child(ref(db, "Users"), `${uid}`);
                        set(userRef, {
                            Infor: {
                                Name: name,
                                PhoneNum: "",
                                Email: email,
                                Address: ""
                            },
                            OrderList: ""
                        });
                        // console.log(`Đăng ký thành công. UID: ${uid}`);
                        resolve({result: "Đăng ký thành công"});
                    })
                    .catch((error) => {
                        reject(error);
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
                resolve(productInfo);
            } else {(error) => reject(error)}
        });
    }

    login = async (data) => {
        const { email, password } = data;
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const dbRef = ref(db, `Users/${userCredential.user.uid}`);
                onValue(dbRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const products = snapshot.val();
                        resolve({
                            Name: products.Infor.Name,
                            Email: products.Infor.Email
                        })
                    } else {
                        resolve(null);
                    }
                }, (error) => reject(error))

            })
            .catch((error) => {
                reject(error);
            })
        })
    }


}

module.exports = new AuthService