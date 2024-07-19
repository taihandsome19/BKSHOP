<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
>>>>>>> nhap
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
<<<<<<< HEAD
import { Input, Checkbox } from 'antd';
=======
import { Input, Checkbox, message } from 'antd';
>>>>>>> nhap
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import card from '../../assets/images/card.png';
import cod from '../../assets/images/cod.png';

const PaymentPage = () => {
<<<<<<< HEAD
    const [products] = useState([
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
            memory: "256GB",
            price: 23790000,
            quantity: 2,
            checked: false
        },
    ]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');

=======
    const [dataInfo, setDataInfo] = useState(null);
    const [dataPayment, setDataPayment] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');

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

>>>>>>> nhap
    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

<<<<<<< HEAD
    const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);
=======
    const handlePayment = async () => {
        const email = document.getElementById('email-input').value;
        const phone = document.getElementById('phone-input').value;
        const address = document.getElementById('address-input').value;

        const payload = {
            email,
            phone,
            address,
            method: selectedPaymentMethod.toUpperCase(),
            items: dataPayment.reduce((items, product) => {
                items[product.productId] = {
                    color: product.color,
                    memorysize: product.memorysize,
                    name: product.name,
                    quantity: product.quantity,
                    price: product.price
                };
                return items;
            }, {})
        };

        try {
            const response = await axios.post('YOUR_API_ENDPOINT_HERE', payload);
            console.log('Payment successful', response.data);
        } catch (error) {
            console.error('Payment failed', error);
        }
    };

    if (dataPayment === null || dataInfo === null) {
        return null; 
    }

    const totalAmount = dataPayment.reduce((total, product) => total + product.price * product.quantity, 0);
>>>>>>> nhap

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
<<<<<<< HEAD
                                <Link to="/cart" style={{ color: '#323232', textDecoration: "none" }}>
=======
                                <Link to="/cart/payment_info" style={{ color: '#323232', textDecoration: "none" }}>
>>>>>>> nhap
                                    <ArrowLeftOutlined style={{ fontSize: "20px" }} />
                                </Link>
                            </IconWrapper>
                            Thông tin
                        </HeaderAreaCart>
                        <div style={{ display: 'flex', gap: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#909EAB', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #909EAB', padding: '0 10px 10px' }}>
<<<<<<< HEAD
                                1. THÔNG TIN
=======
                                <Link to="/cart/payment_info" style={{ color: '#909EAB', textDecoration: "none" }}>
                                    1. THÔNG TIN
                                </Link>
>>>>>>> nhap
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#0688B4', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #0688B4', padding: '0 10px 10px' }}>
                                2. THANH TOÁN
                            </div>
                        </div>
                        <WrappCard>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', padding: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số lượng sản phẩm</div>
<<<<<<< HEAD
                                    <div>01</div>
=======
                                    <div>{dataPayment.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0)}</div>
>>>>>>> nhap
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
<<<<<<< HEAD
                                    <Input placeholder="Địa chỉ mail" value="tai.tranthanh@hcmut.edu.vn" disabled={true} />
                                </div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số điện thoại</div>
                                    <Input placeholder="Số điện thoại" value="0868000000" disabled={true} />
                                </div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Địa chỉ nhận hàng</div>
                                    <Input placeholder="Địa chỉ nhận hàng" value="Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương" disabled={true} />
=======
                                    <Input id="email-input" placeholder="Địa chỉ mail" defaultValue={dataInfo ? dataInfo.email : ''} disabled={true} />
                                </div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số điện thoại</div>
                                    <Input id="phone-input" placeholder="Số điện thoại" defaultValue={dataInfo ? dataInfo.phone : ''} disabled={true} />
                                </div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Địa chỉ nhận hàng</div>
                                    <Input id="address-input" placeholder="Địa chỉ nhận hàng" defaultValue={dataInfo ? dataInfo.address : ''} disabled={true} />
>>>>>>> nhap
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
<<<<<<< HEAD
                                    <BuyButton >
=======
                                    <BuyButton onClick={handlePayment}>
>>>>>>> nhap
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
