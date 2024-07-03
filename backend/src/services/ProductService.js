const db = require('../models/database');

const overview = async () => {
    var arr_name = [];
    var arr_price = [];
    var arr_id = [];

    db.get((db.dbRef, `/Products/`))
        .then((snapshot) => {
            console.log("AA")
            
            if(snapshot) {
                arr_name.push(snapshot.Name);
                arr_price.push(snapshot.Price);
                arr_id.push(snapshot.key);
            }
        })
        .catch((err) => {
            return err;
        })
    return "aaa";
}

module.exports = {
    overview
}