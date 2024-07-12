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

    
}

module.exports = new AdminService