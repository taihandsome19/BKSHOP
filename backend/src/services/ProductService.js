const { db, ref, onValue } = require('../models/database');

class ProductService {
    overview = async () => {
        const dbRef = ref(db, `products`);
        return new Promise((resolve, reject) => {
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const products = snapshot.val();
                    const productInfo = Object.keys(products).map(productId => ({
                        productId: productId,
                        brand: products[productId].brand,
                        name: products[productId].name,
                        price: products[productId].price,
                        image: products[productId].image[0]
                    }));
                    // console.log(products)
                    resolve(productInfo);
                } else {
                    resolve(null);
                }
            }, (error) => reject(error))
        });
    }

    productDetail = async (product_id) => {
        const dbRef = ref(db, `products/${product_id}`);
        return new Promise((resolve, reject) => {
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const product = snapshot.val();
                    // console.log(product)
                    // resolve({ // optional
                    //     product_id: product_id,
                    //     ...product});
                    resolve(product);
                } else {
                    resolve(null);
                }
            }, (error) => reject(error))
        });
    }

}

module.exports = new ProductService