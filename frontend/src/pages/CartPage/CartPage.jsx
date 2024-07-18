import React, { useState, useEffect } from 'react';
import { Checkbox, message, Spin } from 'antd';
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
    ButtonProduct
} from "./style";
import {
    ArrowLeftOutlined,
    DeleteOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/user/cart')
            .then(response => {
                const updatedProducts = response.data.map(product => ({
                    ...product,
                    checked: false
                }));
                setProducts(updatedProducts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                message.error("Lỗi khi lấy thông tin giỏ hàng");
                setLoading(false);
            });
    }, []);

    /*
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "iPhone 13 VNA",
            color: "Trắng",
            memory: "128GB",
            price: 13790000,
            quantity: 1,
            checked: false
        },
        {
            id: 2,
            name: "iPhone 15 | Chính hãng VNA",
            color: "Hồng",
            memory: "256B",
            price: 23790000,
            quantity: 1,
            checked: false
        },
        {
            id: 3,
            name: "Samsung Galaxy S24",
            color: "Hồng",
            memory: "256B",
            price: 23790000,
            quantity: 1,
            checked: false
        }
    ]);
    */

    const [checkedAll, setCheckedAll] = useState(false);

    const handleQuantityChange = (id, increment) => {
        setProducts(products.map(product =>
            product.productId === id ? {
                ...product,
                quantity: increment ? product.quantity + 1 : Math.max(product.quantity - 1, 1)
            } : product
        ));
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.productId !== id));
    };

    const handleSelectAll = () => {
        const newCheckedAll = !checkedAll;
        setCheckedAll(newCheckedAll);
        setProducts(products.map(product => ({ ...product, checked: newCheckedAll })));
    };

    const handleProductCheck = (id) => {
        setProducts(products.map(product =>
            product.productId === id ? { ...product, checked: !product.checked } : product
        ));
    };

    const handleDeleteSelected = () => {
        setProducts(products.filter(product => !product.checked));
        setCheckedAll(false);
    };

    const handleBuyNow = () => {
        const selectedProducts = products.filter(product => product.checked);
        localStorage.setItem('dataPayment', JSON.stringify(selectedProducts));
        window.location.href = '/cart/payment_info';
    };

    const ProductCard = ({ product }) => (
        <WrappCard>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", paddingBottom: "10px" }}>
                <Checkbox checked={product.checked} onChange={() => handleProductCheck(product.productId)} />
                <WrapperProduct>
                    <img src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${product.image}?alt=media`} alt="icon" preview={false} height={"100px"} />
                    <div style={{ width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                            <div style={{ fontSize: "15px" }}>{product.name}</div>
                            <DeleteOutlined style={{ fontSize: "18px" }} onClick={() => handleDelete(product.productId)} />
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
                            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                <ButtonProduct onClick={() => handleQuantityChange(product.productId, false)}>-</ButtonProduct>
                                <div style={{ color: "#444" }}>{product.quantity}</div>
                                <ButtonProduct onClick={() => handleQuantityChange(product.productId, true)}>+</ButtonProduct>
                            </div>
                        </div>
                    </div>
                </WrapperProduct>
            </div>
        </WrappCard>
    );

    const totalSelectedProducts = products.filter(product => product.checked).length;

    if (loading) {
        return (
            <Spin
                size="large"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
            />
        );
    }

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Giỏ hàng - BKSHOP</title>
                </Helmet>
                <HeaderComponent />
                <WrapperPage>
                    <WrapperBox>
                        <HeaderAreaCart>
                                <IconWrapper>
                                    <Link to="/" style={{color: '#323232', textDecoration: "none"}}>
                                    <ArrowLeftOutlined style={{ fontSize: "20px" }} />
                                    </Link>
                                </IconWrapper>
                            Giỏ hàng của bạn
                        </HeaderAreaCart>
                        {products.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '100px', fontSize: '16px', color: "#6f6f6f" }}>
                                <CloseCircleOutlined style={{ fontSize: "40px", paddingBottom: "5px" }} />
                                <div style={{ paddingBottom: "5px" }}>
                                    Không có sản phẩm nào trong giỏ hàng của bạn
                                </div>
                                <Link to="/">
                                    <div style={{ color: "#6f6f6f" }}>
                                        Quay lại trang chủ tại đây.
                                    </div>
                                </Link>
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
                        )};
                        <div style={{paddingBottom: "40px"}}>
                            {products.map(product => (
                                <ProductCard key={product.productId} product={product} />
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
