import React from 'react'
import { WrapperPage, WrapperBox, Buttonleft, Buttonright } from './style';
import { CheckCircleOutlined, FrownOutlined } from '@ant-design/icons';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const PaymentStatusPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('orderId');
    const status = searchParams.get('status');

    return (
        <HelmetProvider>
            <Helmet>
                <title>Trạng thái đặt hàng - BKShopMyAdmin</title>
            </Helmet>
            <WrapperPage style={{ minHeight: '100vh' }}>
                <WrapperBox>
                    <div style={{ display: 'flex', alignContent: "center", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        {status && (
                            status === "success" ? (
                                orderId ? (
                                    <>
                                        <CheckCircleOutlined style={{ fontSize: '50px', color: '#00D67F', paddingTop: '60px' }} />
                                        <div style={{ fontSize: '18px', paddingTop: '20px', fontWeight: "bold", color: "#6B6B6B" }}>Đặt hàng thành công!</div>
                                        <div style={{ fontSize: '15px', paddingTop: '15px', color: '#6B6B6B' }}>Chúng tôi sẽ liên hệ để xác nhận đơn hàng trong thời gian sớm nhất.</div>
                                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', gap: '10px' }}>
                                            <Buttonleft>Xem chi tiết đơn hàng</Buttonleft>
                                            <Buttonright>Tiếp tục mua hàng</Buttonright>
                                        </div>
                                    </>
                                ) : null
                            ) : (
                                <>
                                    <FrownOutlined style={{ fontSize: '50px', color: '#ff4747', paddingTop: '60px' }} />
                                    <div style={{ fontSize: '18px', paddingTop: '20px', fontWeight: "bold", color: "#6B6B6B" }}>Đặt hàng thất bại!</div>
                                    <div style={{ fontSize: '15px', paddingTop: '15px', color: '#6B6B6B' }}>Bạn vui lòng kiểm tra lại thông tin đơn hàng hoặc liên hệ chúng tôi để được hỗ trợ.</div>
                                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', gap: '10px' }}>
                                        <Buttonleft>Quay lại giỏ hàng</Buttonleft>
                                        <Buttonright>Tiếp tục mua hàng</Buttonright>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </WrapperBox>
            </WrapperPage>
        </HelmetProvider>
    )
}

export default PaymentStatusPage