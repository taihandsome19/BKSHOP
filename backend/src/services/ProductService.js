const { db, ref, onValue } = require('../models/database');

class ProductService {
    overview = async () => {
        const dbRef = ref(db, `Products`);
        return new Promise((resolve, reject) => {
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const products = snapshot.val();
                    const productInfo = Object.keys(products).map(productId => ({
                        key: productId,
                        name: products[productId].Name,
                        price: products[productId].Price,
                        image: products[productId].Image[0]
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
        const dbRef = ref(db, `Products/${product_id}`);
        return new Promise((resolve, reject) => {
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const product = snapshot.val();
                    console.log(product)
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

    productBrand = async (brand) => {
        const dbRef = ref(db, `Products`);
        return new Promise((resolve, reject) => {
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const products = snapshot.val();
                    const brandProductKeys = Object.keys(products).filter(key => products[key].Supplier === brand)
                    .map(productId => ({
                        key: productId,
                        name: products[productId].Name,
                        price: products[productId].Price,
                        image: products[productId].Image[0]
                    }));
                    console.log({...brandProductKeys})
                    resolve(brandProduct);
                } else {
                    resolve(null);
                }
            }, (error) => reject(error))
        });
    }
}

module.exports = new ProductService