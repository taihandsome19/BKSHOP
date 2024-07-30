import React, { useState, useEffect, useContext } from 'react';
import { Checkbox, message, Spin, InputNumber } from 'antd';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {
    WrapperPage,
    WrapperBox,
    DeleteDiv,
    HeaderAreaCart,
    IconWrapper,
    SelectAll,
    CardBuy,
    BuyButton,
    WrappCard,
    WrapperProduct,
    ButtonProduct,
    StyledInput
} from "./style";
import {
    ArrowLeftOutlined,
    DeleteOutlined,
    FrownOutlined
} from '@ant-design/icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserCartContext } from '../../components/UserCartContext/UserCartContext';

const CartPage = () => {
    const { User_cart, setUserCart } = useContext(UserCartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/user/cart')
            .then(response => {
               try{
                    if(response.data.length !== User_cart){
                        setUserCart(response.data.length);
                    }
                    const updatedProducts = response.data.map(product => ({
                        ...product,
                        checked: false
                    }));
                    setProducts(updatedProducts);
               }catch{
                    console.log("Không có dữ liệu");
               }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                message.error("Lỗi khi lấy thông tin giỏ hàng");
                setLoading(false);
            });
    }, [User_cart,setUserCart]);

    const [checkedAll, setCheckedAll] = useState(false);

    const handleQuantityChange = (index, increment) => {
        const newQuantity = increment ? products[index].quantity + 1 : Math.max(products[index].quantity - 1, 1);
        if(increment){
            axios.post('http://localhost:3001/user/increase', {
                index: index,
            }).then(response => {
                setProducts(products.map((product, idx) => {
                    if (idx === index) {
                        return {
                            ...product,
                            quantity: newQuantity
                        };
                    }
                    return product;
                }));
            }).catch(error => {
                console.error('Error updating quantity:', error);
                message.error("Lỗi khi cập nhật số lượng sản phẩm");
            });
        } else if(products[index].quantity !== 1){
            axios.post('http://localhost:3001/user/decrease', {
                index: index,
            }).then(response => {
                setProducts(products.map((product, idx) => {
                    if (idx === index) {
                        return {
                            ...product,
                            quantity: newQuantity
                        };
                    }
                    return product;
                }));
            }).catch(error => {
                console.error('Error updating quantity:', error);
                message.error("Lỗi khi cập nhật số lượng sản phẩm");
            });
        }
    };
    

    const handleDelete = (index, flag) => {
        axios.post('http://localhost:3001/user/remove', {
            index: index,
        }).then(response => {
            setUserCart(prevUserCart => prevUserCart - 1);
            if(flag){
                setProducts(products.filter((_, idx) => idx !== index));
            }
        }).catch(error => {
            console.error('Error updating quantity:', error);
            message.error("Lỗi khi xoá sản phẩm");
        });
    };

    const handleSelectAll = () => {
        const newCheckedAll = !checkedAll;
        setCheckedAll(newCheckedAll);
        setProducts(products.map(product => ({ ...product, checked: newCheckedAll })));
    };

    const handleProductCheck = (index) => {
        const updatedProducts = products.map((product, idx) =>
            idx === index ? { ...product, checked: !product.checked } : product
        );
        setProducts(updatedProducts);
    
        const allSelected = updatedProducts.every(product => product.checked);
        setCheckedAll(allSelected);
    };

    const handleDeleteSelected = async () => {
        setLoading(true);
    
        const selectedIndexes = products
            .map((product, index) => product.checked ? index : null)
            .filter(index => index !== null);
    
        if (selectedIndexes.length === 0) {
            message.info("Chưa chọn sản phẩm nào để xoá.");
            setLoading(false);
            return;
        }
    
        selectedIndexes.sort((a, b) => b - a);
    
        for (const index of selectedIndexes) {
            try {
                await handleDelete(index, false);
                setProducts(prevProducts => prevProducts.filter((_, idx) => idx !== index));
            } catch (error) {
                console.error('Error deleting product:', error);
                message.error("Lỗi khi xoá sản phẩm");
                break;
            }
        }
    
        setCheckedAll(false);
        setLoading(false);
    };
    

    const handleBuyNow = () => {
        const selectedProducts = products.filter(product => product.checked);
        localStorage.setItem('dataPayment', JSON.stringify(selectedProducts));
        
        const selectedIndexes = products
            .map((product, index) => product.checked ? index : null)
            .filter(index => index !== null);
        localStorage.setItem('dataPaymentIndex', JSON.stringify(selectedIndexes));

        window.location.href = '/cart/payment_info';
    };

    const ProductCard = ({ product, index }) => (
        <WrappCard>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", paddingBottom: "10px" }}>
                <Checkbox checked={product.checked} onChange={() => handleProductCheck(index)} />
                <WrapperProduct>
                    <img src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${product.image}?alt=media`} alt="icon" preview={false} height={"100px"} />
                    <div style={{ width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                            <div style={{ fontSize: "15px" }}>{product.name}</div>
                            <DeleteOutlined style={{ fontSize: "18px" }} onClick={() => handleDelete(index, true)} />
                        </div>
                        <div style={{ display: "flex", gap: "5px", fontSize: "13px", color: "#9F9D9D", paddingBottom: "10px" }}>
                            <div>Màu sắc:</div>
                            <div>{product.color}</div>
                        </div>
                        <div style={{ display: "flex", gap: "5px", fontSize: "13px", color: "#9F9D9D", paddingBottom: "10px" }}>
                            <div>Dung lượng:</div>
                            <div>{product.memorysize}</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "500", color: "#0688B4" }}>
                            <div>{parseInt(product.price).toLocaleString('vi-VN')}đ</div>
                            <div style={{ display: "flex", gap: "15px", alignItems: "center", alignContent: 'center' }}>
                                <ButtonProduct onClick={() => handleQuantityChange(index, false)}>-</ButtonProduct>
                                <StyledInput style={{ display: 'flex', justifyContent: 'center',  color: "#444", width:'40px' }} defaultValue={product.quantity} />
                                <ButtonProduct onClick={() => handleQuantityChange(index, true)}>+</ButtonProduct>
                            </div>
                        </div>
                    </div>
                </WrapperProduct>
            </div>
        </WrappCard>
    );

    const totalSelectedProducts = products.filter(product => product.checked).length;

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Giỏ hàng - BKSHOP</title>
                </Helmet>
                <HeaderComponent />
                <WrapperPage>
                    <WrapperBox>
                        {loading && (
                            <div style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                zIndex: 9999
                            }}>
                                <Spin size="large" />
                            </div>
                        )}
                        <HeaderAreaCart>
                            <IconWrapper>
                                <Link to="/" style={{ color: '#323232', textDecoration: "none" }}>
                                    <ArrowLeftOutlined style={{ fontSize: "20px" }} />
                                </Link>
                            </IconWrapper>
                            Giỏ hàng của bạn
                        </HeaderAreaCart>
                        {products.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '100px', fontSize: '16px', color: "#6f6f6f" }}>
                                <FrownOutlined style={{ fontSize: "40px", paddingBottom: "10px" }} />
                                <div style={{ paddingBottom: "5px" }}>
                                    Không có sản phẩm nào trong giỏ hàng của bạn
                                </div>
                            </div>
                        ) : (
                            <SelectAll>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                                    <Checkbox checked={checkedAll} onChange={handleSelectAll}>
                                        {checkedAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                                    </Checkbox>
                                    {totalSelectedProducts > 0 && (
                                        <DeleteDiv onClick={handleDeleteSelected}>
                                            Xoá sản phẩm đã chọn
                                        </DeleteDiv>
                                    )}
                                </div>
                            </SelectAll>
                        )}
                        <div style={{ paddingBottom: "40px" }}>
                            {products.map((product, index) => (
                                <ProductCard key={index} product={product} index={index} />
                            ))}
                        </div>

                        <CardBuy>
                            <div style={{ padding: "10px 10px 15px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <div style={{ display: "flex", gap: "5px" }}>
                                            <div style={{ fontSize: "17px" }}>
                                                Tổng thanh toán:
                                            </div>
                                            <div style={{ fontSize: "17px", color: "#0688B4", fontWeight: "bold" }}>
                                                {products.filter(product => product.checked).reduce((total, product) => total + product.price * product.quantity, 0).toLocaleString('vi-VN')}đ
                                            </div>
                                        </div>
                                        <div style={{ fontSize: "13px", color: "#9F9D9D", paddingTop: "5px" }}>
                                            Mua với giá ưu đãi nhất
                                        </div>
                                    </div>
                                    <BuyButton disabled={totalSelectedProducts === 0} onClick={handleBuyNow}>
                                        Mua ngay ({totalSelectedProducts})
                                    </BuyButton>
                                </div>
                            </div>
                        </CardBuy>
                    </WrapperBox>
                </WrapperPage>
            </div>
        </HelmetProvider>
    );
}

export default CartPage;
