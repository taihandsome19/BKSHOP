const PayOS = require('@payos/node');
const AdminService = require('./AdminService')

const payos = new PayOS(
    'cc91c9ef-41c0-48a3-a319-1046d6c04a0e', 
    '461cbcec-ebaf-4703-9638-e7910dc6feee', 
    'eed947e86db855d6a208fe255a0b9f30ca7adab3cab705ef19590c69e941c89a'
);

class PaymentService {
    createPayment(info) {
        const { 
            orderCode, amount, description, 
            buyerName, buyerEmail, buyerPhone, 
            buyerAddress, items, cancelUrl, returnUrl 
        } = info;
        const expiredAt = Math.floor(Date.now() / 1000) + 15 * 60;

        const data = {
            orderCode,
            amount,
            description,
            buyerName,
            buyerEmail,
            buyerPhone,
            buyerAddress,
            items,
            cancelUrl,
            returnUrl,
            expiredAt
        };

        return new Promise((resolve, reject) => {
            payos.createPaymentLink(data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getInfoPayment(id) {
        return new Promise((resolve, reject) => {
            payos.getPaymentLinkInformation(id) 
                .then(response => {
                    // Update status nếu thành công
                    if(response && response.status === 'PAID'){
                        AdminService.updateOrder({orderId: id, status: 'Đã xác nhận'});
                        AdminService.updatePayment({orderId: id, status: true})
                    }   
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}

module.exports = new PaymentService();
