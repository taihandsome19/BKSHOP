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
            items: {}
        }
    }
};

module.exports = new Support