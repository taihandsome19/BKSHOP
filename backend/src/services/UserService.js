const { db, ref, get, onValue } = require('../models/database');
const { auth } = require('../models/auth');

class UserService {
    info = async () => {
        const uid = await auth.currentUser.uid;
        console.log(uid)
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
}

module.exports = new UserService