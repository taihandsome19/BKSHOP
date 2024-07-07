import React, { useState } from 'react';
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
import { Input, Checkbox } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import card from '../../assets/images/card.png';
import cod from '../../assets/images/cod.png';

const PaymentPage = () => {
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

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);

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
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#909EAB', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #909EAB', padding: '0 10px 10px' }}>
                                1. THÔNG TIN
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#0688B4', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #0688B4', padding: '0 10px 10px' }}>
                                2. THANH TOÁN
                            </div>
                        </div>
                        <WrappCard>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', padding: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số lượng sản phẩm</div>
                                    <div>01</div>
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
                                    <Input placeholder="Địa chỉ mail" value="tai.tranthanh@hcmut.edu.vn" disabled={true} />
                                </div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số điện thoại</div>
                                    <Input placeholder="Số điện thoại" value="0868000000" disabled={true} />
                                </div>
                                <div>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Địa chỉ nhận hàng</div>
                                    <Input placeholder="Địa chỉ nhận hàng" value="Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương" disabled={true} />
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
                                    <BuyButton >
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
