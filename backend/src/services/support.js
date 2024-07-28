const { db, ref, get } = require('../models/database');

class Support {
    createOrder = async (body) => {
        const time = new Date()
        const { payment, address, phonenum, status } = body
        return {
            address: address,
            orderdate: `${time.getUTCDate()}/${time.getUTCMonth() + 1}/${time.getUTCFullYear()}`,
            payment: {
                method: payment,
                status: false
            },
            phonenum: phonenum,
            status: status,
            items: {},
            totalPrice: 0
        }
    }

    compareNotifications = (a, b) => {
        if (a[1].status === true && b[1].status === false) return 1;
        if (a[1].status === false && b[1].status === true) return -1;
        return parseInt(b[0], 10) - parseInt(a[0], 10);
    };
    
};

module.exports = new Support