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

    
}

module.exports = new AdminService