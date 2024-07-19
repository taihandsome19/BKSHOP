import React, { useState, useEffect } from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {
    WrapperPage,
    WrapperBox,
    HeaderAreaCart,
    IconWrapper,
    CardBuy,
    BuyButton,
    WrappCard,
    WrapperProduct,
} from "./style";
import {
    ArrowLeftOutlined,
} from '@ant-design/icons';
import { Input, message, Spin } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PaymentInfoPage = () => {
    const User_email = localStorage.getItem("User_email");
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const jsonData = localStorage.getItem('dataPayment');
        if (jsonData) {
            const storedProducts = JSON.parse(jsonData);
            setProducts(storedProducts);
        } else {
            message.error("Không tìm thấy thông tin đơn hàng");
        }
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/user/info');
                setUserData(res.data);
                console.log(res.data);
                setLoading(false);
            } catch (error) {
                message.error('Failed to fetch user data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);

    const handleContinue = () => {
        if(products.length > 0) {
            const email = document.getElementById('email-input').value;
            const phone = document.getElementById('phone-input').value;
            const address = document.getElementById('address-input').value;

            if (!phone.trim()) {
                message.error('Vui lòng nhập số điện thoại');
                return;
            } else if (phone.length < 10) {
                message.error('Vui lòng nhập số điện thoại hợp lệ');
                return;
            } else if (!address.trim()) {
                message.error('Vui lòng nhập địa chỉ nhận hàng');
                return;
            }

            const dataInfo = {
                email,
                phone,
                address,
            };
            const jsonDataInfo = JSON.stringify(dataInfo);
            localStorage.setItem('dataInfo', jsonDataInfo);

            window.location.href = '/cart/payment';
        }
    };

    const ProductCard = ({ product }) => (
        <WrappCard>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", paddingBottom: "10px" }}>
                <WrapperProduct>
                    <img src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${product.image}?alt=media`} alt="icon" preview="false" height={"100px"} />
                    <div style={{ width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                            <div style={{ fontSize: "15px" }}>{product.name}</div>
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
                                <div style={{ fontSize: '13px', color: '#9F9D9D' }}>Số lượng: {product.quantity}</div>
                            </div>
                        </div>
                    </div>
                </WrapperProduct>
            </div>
        </WrappCard>
    );
    if (loading) {
        return (
            <Spin
                size="large"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
            />
        );
    }

    if (!userData) {
        message.error("Lỗi khi lấy thông tin người dùng!");
        return null;
    }

    console.log(products);


    // KIỂM TRA ĐÃ CÓ DATAINFO CHƯA
    const retrievedDataInfo = localStorage.getItem('dataInfo');
    const dataInfo = retrievedDataInfo ? JSON.parse(retrievedDataInfo) : null;

    const l_phone = dataInfo ? dataInfo.phone : userData.infor.phonenum;
    const l_address = dataInfo ? dataInfo.address : userData.infor.address;

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Đặt hàng - BKSHOP</title>
                </Helmet>
                <HeaderComponent />
                <WrapperPage>
                    <WrapperBox>
                        <HeaderAreaCart>
                            <IconWrapper>
                                <Link to="/cart" style={{ color: '#323232', textDecoration: "none" }}>
                                    <ArrowLeftOutlined style={{ fontSize: "20px" }} />
                                </Link>
                            </IconWrapper>
                            Thông tin
                        </HeaderAreaCart>
                        <div style={{ display: 'flex', gap: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#0688B4', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #0688B4', padding: '0 10px 10px' }}>
                                1. THÔNG TIN
                            </div>
                            <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', width: '100%', color: '#909EAB', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #909EAB', padding: '0 10px 10px' }} onClick={handleContinue}>
                                2. THANH TOÁN
                            </div>
                        </div>
                        {products.map(product => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                        {products.length > 0 ? (
                            <>
                                <div style={{ fontSize: '16px' }}>
                                    THÔNG TIN NHẬN HÀNG
                                </div>
                                <WrappCard>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px', padding: '10px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>{userData.infor.name}</div>
                                        <div>
                                            <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Email*</div>
                                            <Input id="email-input" placeholder="Địa chỉ mail" defaultValue={User_email} disabled={true} />
                                        </div>
                                        <div>
                                            <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số điện thoại*</div>
                                            <Input id="phone-input" placeholder="Số điện thoại" defaultValue={userData ? l_phone : ''} />
                                        </div>
                                        <div>
                                            <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Địa chỉ nhận hàng*</div>
                                            <Input id="address-input" placeholder="Địa chỉ nhận hàng*" defaultValue={userData ? l_address : ''} />
                                        </div>
                                    </div>
                                </WrappCard>
                            </>
                        ) : (
                            <></>
                        )}
                        <div style={{ paddingBottom: '40px' }}></div>

                        <CardBuy>
                            <div style={{ padding: "10px 10px 15px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <div style={{ display: "flex", gap: "5px" }}>
                                            <div style={{ fontSize: "17px" }}>
                                                Tổng thanh toán:
                                            </div>
                                            <div style={{ fontSize: "17px", color: "#0688B4", fontWeight: "bold" }}>
                                                {totalAmount.toLocaleString('vi-VN')}đ
                                            </div>
                                        </div>
                                        <div style={{ fontSize: "13px", color: "#9F9D9D", paddingTop: "5px" }}>
                                            Mua với giá ưu đãi nhất
                                        </div>
                                    </div>
                                    <BuyButton onClick={handleContinue} disabled={products.length === 0}>
                                        Tiếp tục
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

export default PaymentInfoPage;
