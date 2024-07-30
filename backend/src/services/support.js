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
        // if (a[1].status === true && b[1].status === false) return 1;
        // if (a[1].status === false && b[1].status === true) return -1;
        return parseInt(b[0], 10) - parseInt(a[0], 10);
    };
    
    summarizeOrders(orders) {
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      
        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
      
        const summary = {
            order: [],
            revenue: [],
            date: []
        };
      
        for (let date = new Date(sevenDaysAgo); date <= today; date.setDate(date.getDate() + 1)) {
            const dateStr = formatDate(date);
            summary.date.push(dateStr);
            summary.order.push(0);
            summary.revenue.push(0);
        }
      
        Object.values(orders).forEach(userOrders => {
            Object.values(userOrders).forEach(order => {
                const orderDateStr = order.orderdate;
                const index = summary.date.indexOf(orderDateStr);
                if (index !== -1) {
                summary.order[index] += 1;
                if (order.status === "Đã giao hàng") summary.revenue[index] += parseInt(order.totalPrice) / 1e6;
                }
            });
        });
      
        return summary;
    }
};

module.exports = new Support