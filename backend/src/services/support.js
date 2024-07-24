
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

    addToOrder = async (body) => {
        const { payment, address, phonenum, indexs } = body
        const userId = await auth.currentUser.uid
        const order = await supportFunction.createOrder({ payment, address, phonenum })
        return new Promise((resolve, reject) => {
            const promises = [];
            for (var index of indexs) {
                const cartRef = ref(db, `carts/${userId}/${index}`)
                promises.push(
                    get(cartRef)
                    .then((productSnapshot) => {
                        if (productSnapshot.exists()) {
                            const quantity = productSnapshot.child('quantity').val()
                            const productId = productSnapshot.child('productId').val()
                            const color = productSnapshot.child('color').val()
                            const memorysize = productSnapshot.child('memorysize').val()
                            const productRef = ref(db, `products/${productId}/inventory/${color}/${memorysize}`)
                            // check product
                            get(productRef)
                            .then((snapshot) => {
                                if (snapshot.val() < quantity) reject(`${productSnapshot.child('name').val()} is not enough`)
                                else {
                                    // set order
                                    order.items[productId] = {
                                        color: color,
                                        memorySize: memorysize,
                                        name: productSnapshot.child('name').val(),
                                        price: productSnapshot.child('price').val(),
                                        quantity: quantity
                                    }
                                    set(productRef, snapshot.val() - quantity)
                                }
                            })
                            .catch((error) => {
                                reject(error)
                            });
                        } 
                        else reject("Product has not been added to the cart")
                    })
                    .catch((error) => {
                        reject(error)
                    })
                );
            }
            Promise.all(promises)
            .then(() => {
                // remove product from cart
                const removeRef = ref(db, `carts/${userId}`)
                get(removeRef)
                .then((snapshot) => {
                    var data = Object.values(snapshot.val());
                    indexs.sort((a, b) => b - a)
                    for (var index of indexs) data.splice(index, 1);
                    set(ref(db, `carts/${userId}`), data);
                    const orderId = Date.now()
                    const orderRef = ref(db, `orders/${userId}/${orderId}`);
                    // add product to order
                    set(orderRef, order)
                    .then(() => {
                        const orderListRef = ref(db, `users/${userId}/orderlist`)
                        // update user orderlist
                        get(orderListRef)
                        .then((snapshot) => {
                            if (snapshot.exists() && snapshot.val() != "") {
                                const orderList = snapshot.val()
                                orderList.push(orderId)
                                set(orderListRef, orderList)
                            }
                            else set(orderListRef, [orderId])
                            resolve({ status: true, order });
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
            })
            .catch((error) => {
                reject(error)
            });
        })
    }
};

module.exports = new Support