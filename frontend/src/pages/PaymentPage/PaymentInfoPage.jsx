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
    WrapperProduct,
} from "./style";
import {
    ArrowLeftOutlined,
} from '@ant-design/icons';
import {Input} from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import img from "../../assets/images/ip13/ip13.webp";

const PaymentInfoPage = () => {
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
            memory: "256B",
            price: 23790000,
            quantity: 2,
            checked: false
        },
    ]);

    const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);

    const ProductCard = ({ product }) => (
        <WrappCard>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", paddingBottom: "10px" }}>
                <WrapperProduct>
                    <img src={img} alt="icon" preview={false} height={"100px"} />
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
                            <div>{product.memory}</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "500", color: "#0688B4" }}>
                            <div>{product.price.toLocaleString('vi-VN')}đ</div>
                            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                <div style={{ fontSize: '13px', color: '#9F9D9D' }}>Số lượng: {product.quantity}</div>
                            </div>
                        </div>
                    </div>
                </WrapperProduct>
            </div>
        </WrappCard>
    );

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
                        <div style={{ display: 'flex', gap: '30px'}}>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#0688B4', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #0688B4', padding: '0 10px 10px' }}>
                                1. THÔNG TIN
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#909EAB', fontWeight: '600', fontSize: '16px', borderBottom: '3px solid #909EAB', padding: '0 10px 10px' }}>
                                2. THANH TOÁN
                            </div>
                        </div>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        <div style={{fontSize: '16px'}}>
                            THÔNG TIN NHẬN HÀNG
                        </div>
                        <WrappCard>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px',padding: '10px'}}>
                                <div style={{fontSize: '14px', fontWeight: '600', textTransform: 'uppercase'}}>TRẦN THÀNH TÀI</div>
                                <div>
                                    <div style={{color: '#909EAB', paddingBottom: '10px'}}>Email*</div>
                                    <Input placeholder="Địa chỉ mail" value="tai.tranthanh@hcmut.edu.vn"/>
                                </div>
                                <div>
                                    <div style={{color: '#909EAB', paddingBottom: '10px'}}>Số điện thoại*</div>
                                    <Input placeholder="Số điện thoại" value="0868000000"/>
                                </div>
                                <div>
                                    <div style={{color: '#909EAB', paddingBottom: '10px'}}>Địa chỉ nhận hàng*</div>
                                    <Input placeholder="Địa chỉ nhận hàng*" value="Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương"/>
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
