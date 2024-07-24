import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {
    WrapperPage,
    WrapperBox,
    HeaderAreaCart,
    IconWrapper,
    CardBuy,
    BuyButton,
    WrappCard,
} from "./style";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Input, Checkbox, message } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import card from '../../assets/images/card.png';
import cod from '../../assets/images/cod.png';
import { UserCartContext } from '../../components/UserCartContext/UserCartContext';

const PaymentPage = () => {
    const [dataInfo, setDataInfo] = useState(null);
    const [dataPayment, setDataPayment] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
    const { setUserCart } = useContext(UserCartContext);

    useEffect(() => {
        const retrievedDataInfo = localStorage.getItem('dataInfo');
        if (retrievedDataInfo) {
            setDataInfo(JSON.parse(retrievedDataInfo));
        } else {
            message.error("Không tìm thấy địa chỉ nhận hàng!");
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }

        const retrieveddataPayment = localStorage.getItem('dataPayment');
        if (retrieveddataPayment) {
            setDataPayment(JSON.parse(retrieveddataPayment));
        } else {
            message.error("Không tìm thấy thông tin đặt hàng!");
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    }, []);

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handlePayment = async () => {
        const phone = document.getElementById('phone-input').value;
        const address = document.getElementById('address-input').value;

        const savedIndexes = JSON.parse(localStorage.getItem('dataPaymentIndex'));
        if (!Array.isArray(savedIndexes)) {
            message.error("Lỗi đồng bộ dữ liệu, vui lòng về giỏ hàng đặt lại!")
            return;
        }

        const payload = {
            payment: selectedPaymentMethod.toUpperCase(),
            address,
            phonenum: phone,
            indexs: savedIndexes
        };

        try {
            const response = await axios.post('http://localhost:3001/user/order', payload);
            if (response.data.status === true) {
                localStorage.clear('dataPayment');
                localStorage.clear('dataPaymentIndex');
                setUserCart(prevUserCart => prevUserCart - savedIndexes.length);
                window.location.href = '/payment/status?status=success&orderId=100'
            } else {
                console.log('Payment failed', response.data);
                message.error("Đã xảy ra lỗi khi đặt hàng!");
            }
        } catch (error) {
            console.error('Payment failed', error);
            message.error("Đã xảy ra lỗi khi đặt hàng!");
        }
    };

    if (dataPayment === null || dataInfo === null) {
        return null; 
    }

    const totalAmount = dataPayment.reduce((total, product) => total + product.price * product.quantity, 0);

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
                                <Link to="/cart/payment_info" style={{ color: '#323232', textDecoration: "none" }}>
                                    <ArrowLeftOutlined style={{ fontSize: "20px" }} />
                                </Link>
                            </IconWrapper>
                            Thông tin
                        </HeaderAreaCart>
                        <div style={{ display: 'flex', gap: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#909EAB', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #909EAB', padding: '0 10px 10px' }}>
                                <Link to="/cart/payment_info" style={{ color: '#909EAB', textDecoration: "none" }}>
                                    1. THÔNG TIN
                                </Link>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#0688B4', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #0688B4', padding: '0 10px 10px' }}>
                                2. THANH TOÁN
                            </div>
                        </div>
                        <WrappCard>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', padding: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số lượng sản phẩm</div>
                                    <div>{dataPayment.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0)}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Tiền hàng</div>
                                    <div>{totalAmount.toLocaleString('vi-VN')}đ</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Phí vận chuyển</div>
                                    <div>Miễn phí</div>
                                </div>
                                <div style={{ borderBottom: '2px solid #F5F5F5' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                        <div style={{ fontWeight: '600' }}>Tổng tiền</div>
                                        <div style={{ color: '#909EAB' }}>(đã gồm VAT)</div>
                                    </div>
                                    <div style={{ fontWeight: '600' }}>{totalAmount.toLocaleString('vi-VN')}đ</div>
                                </div>
                            </div>
                        </WrappCard>
                        <div style={{ fontSize: '16px' }}>
                            THÔNG TIN THANH TOÁN
                        </div>
                        <WrappCard>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', padding: '10px' }}>
                                <div
                                    style={{ fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={() => handlePaymentMethodChange('bank')}
                                >
                                    <div style={{ fontSize: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={selectedPaymentMethod === 'bank'}
                                            onChange={() => handlePaymentMethodChange('bank')}
                                        />
                                        <div>Chuyển khoản ngân hàng</div>
                                    </div>
                                    <img src={card} alt='card' width="25px" />
                                </div>
                                <div
                                    style={{ fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={() => handlePaymentMethodChange('cod')}
                                >
                                    <div style={{ fontSize: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={selectedPaymentMethod === 'cod'}
                                            onChange={() => handlePaymentMethodChange('cod')}
                                        />
                                        <div>Thanh toán khi nhận hàng</div>
                                    </div>
                                    <img src={cod} alt='card' width="25px" />
                                </div>
                            </div>
                        </WrappCard>
                        <div style={{ fontSize: '16px' }}>
                            THÔNG TIN NHẬN HÀNG
                        </div>
                        <WrappCard>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px', padding: '10px' }}>
                                <div style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>TRẦN THÀNH TÀI</div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Email</div>
                                    <Input id="email-input" placeholder="Địa chỉ mail" defaultValue={dataInfo ? dataInfo.email : ''} disabled={true} />
                                </div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số điện thoại</div>
                                    <Input id="phone-input" placeholder="Số điện thoại" defaultValue={dataInfo ? dataInfo.phone : ''} disabled={true} />
                                </div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Địa chỉ nhận hàng</div>
                                    <Input id="address-input" placeholder="Địa chỉ nhận hàng" defaultValue={dataInfo ? dataInfo.address : ''} disabled={true} />
                                </div>
                            </div>
                        </WrappCard>
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
                                    <BuyButton onClick={handlePayment}>
                                        Thanh toán
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

export default PaymentPage;
