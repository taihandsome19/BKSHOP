import React, { useEffect, useState } from 'react'
import { WrapperPage, WrapperBox, Buttonleft, Buttonright } from './style';
import { CheckCircleOutlined, FrownOutlined } from '@ant-design/icons';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd'

const PaymentStatusPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('orderCode');
    const status = searchParams.get('status');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === 'CANCELLED') {
            const cancelOrder = async () => {
                setLoading(true);
                try {
                    // Update trạng thái đơn hàng
                    await axios.post('http://localhost:3001/admin/update_order', { orderId: parseInt(orderId), status: 'Đã huỷ' });
                    setLoading(false);
                } catch (error) {
                    // Chuyển hướng đến trang lỗi hiếm gặp
                    console.error('Error cancelling order:', error);
                    setLoading(false);
                }
            };

            cancelOrder();
        } else if (status === 'PAID') {
            const cancelOrder = async () => {
                setLoading(true);
                try {
                    //check xem đã pay chua
                    const res = await axios.get(`http://localhost:3001/payment/get_payment/${orderId}`);
                    if (res.data && res.data.status !== 'PAID') {
                        setLoading(false);
                        // Chuyển hướng đến chưa thanh toán (THÀNH CÔNG)
                        window.location.href = `/payment/status?status=success_banking&orderCode=${orderId}`
                        return;
                    }

                    // Update trạng thái thanh toán
                    await axios.post('http://localhost:3001/admin/update_payment', { orderId: parseInt(orderId), status: true });
                    setLoading(false);
                } catch (error) {
                    // Chuyển hướng đến trang lỗi hiếm gặp
                    console.error('Error cancelling order:', error);
                    setLoading(false);
                }
            };

            cancelOrder();
        }
    }, [status, orderId]);


    const renderStatusMessage = () => {
        switch (status) {
            case 'CANCELLED':
                return (
                    <>
                        <FrownOutlined style={{ fontSize: '50px', color: '#ff4747', paddingTop: '60px' }} />
                        <div style={{ fontSize: '18px', paddingTop: '20px', fontWeight: "bold", color: "#6B6B6B" }}>Đặt hàng thất bại!</div>
                        <div style={{ fontSize: '15px', paddingTop: '15px', color: '#6B6B6B' }}>Bạn đã huỷ thanh toán đơn hàng, liên hệ với chúng tôi nếu bạn gặp sự cố!</div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', gap: '10px' }}>
                            <Link to={"/cart"} style={{ textDecoration: "none" }}>
                                <Buttonleft>Quay lại giỏ hàng</Buttonleft>
                            </Link>
                            <Link to={"/home"} style={{ textDecoration: "none" }}>
                                <Buttonright>Tiếp tục mua hàng</Buttonright>
                            </Link>
                        </div>
                    </>
                );
            case 'PAID':
                return (
                    <>
                        <CheckCircleOutlined style={{ fontSize: '50px', color: '#00D67F', paddingTop: '60px' }} />
                        <div style={{ fontSize: '18px', paddingTop: '20px', fontWeight: "bold", color: "#6B6B6B" }}>Đặt hàng thành công!</div>
                        <div style={{ fontSize: '15px', paddingTop: '15px', color: '#6B6B6B' }}>Chúng tôi sẽ liên hệ để xác nhận đơn hàng trong thời gian sớm nhất.</div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', gap: '10px' }}>
                            <Link to={`/user/order/detail?orderId=${orderId}`} style={{ textDecoration: "none" }}>
                                <Buttonleft>Xem chi tiết đơn hàng</Buttonleft>
                            </Link>
                            <Link to={"/home"} style={{ textDecoration: "none" }}>
                                <   Buttonright>Tiếp tục mua hàng</Buttonright>
                            </Link>
                        </div>
                    </>
                );
            case 'success_cod':
                return (
                    <>
                        <CheckCircleOutlined style={{ fontSize: '50px', color: '#00D67F', paddingTop: '60px' }} />
                        <div style={{ fontSize: '18px', paddingTop: '20px', fontWeight: "bold", color: "#6B6B6B" }}>Đặt hàng thành công!</div>
                        <div style={{ fontSize: '15px', paddingTop: '15px', color: '#6B6B6B' }}>Chúng tôi sẽ liên hệ để xác nhận đơn hàng trong thời gian sớm nhất.</div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', gap: '10px' }}>
                            <Link to={`/user/order/detail?orderId=${orderId}`} style={{ textDecoration: "none" }}>
                                <Buttonleft>Xem chi tiết đơn hàng</Buttonleft>
                            </Link>
                            <Link to={"/home"} style={{ textDecoration: "none" }}>
                                <   Buttonright>Tiếp tục mua hàng</Buttonright>
                            </Link>
                        </div>
                    </>
                );
            case 'success_banking':
                return (
                    <>
                        <CheckCircleOutlined style={{ fontSize: '50px', color: '#00D67F', paddingTop: '60px' }} />
                        <div style={{ fontSize: '18px', paddingTop: '20px', fontWeight: "bold", color: "#6B6B6B" }}>Đặt hàng thành công!</div>
                        <div style={{ fontSize: '15px', paddingTop: '15px', color: '#6B6B6B' }}>Bạn cần thanh toán đơn hàng trong trang chi tiết đơn hàng.</div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', gap: '10px' }}>
                            <Link to={`/user/order/detail?orderId=${orderId}`} style={{ textDecoration: "none" }}>
                                <Buttonleft>Xem chi tiết đơn hàng</Buttonleft>
                            </Link>
                            <Link to={"/home"} style={{ textDecoration: "none" }}>
                                <   Buttonright>Tiếp tục mua hàng</Buttonright>
                            </Link>
                        </div>
                    </>
                );
            case 'error':
                return (
                    <>
                        <FrownOutlined style={{ fontSize: '50px', color: '#ff4747', paddingTop: '60px' }} />
                        <div style={{ fontSize: '18px', paddingTop: '20px', fontWeight: "bold", color: "#6B6B6B" }}>Đặt hàng thất bại!</div>
                        <div style={{ fontSize: '15px', paddingTop: '15px', color: '#6B6B6B' }}>Đơn hàng của bạn chưa được xử lý, liên hệ với chúng tôi nếu bạn gặp sự cố!</div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', gap: '10px' }}>
                            <Link to={"/cart"} style={{ textDecoration: "none" }}>
                                <Buttonleft>Quay lại giỏ hàng</Buttonleft>
                            </Link>
                            <Link to={"/home"} style={{ textDecoration: "none" }}>
                                <Buttonright>Tiếp tục mua hàng</Buttonright>
                            </Link>
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <FrownOutlined style={{ fontSize: '48px', color: 'gray' }} />
                        <h1>Không xác định được trạng thái thanh toán</h1>
                        <Link to="/">
                            <Buttonleft>Trở về trang chủ</Buttonleft>
                        </Link>
                    </>
                );
        }
    };


    return (
        <HelmetProvider>
            <Helmet>
                <title>Trạng thái đặt hàng - BKShopMyAdmin</title>
            </Helmet>
            <WrapperPage style={{ minHeight: '100vh' }}>
                <WrapperBox>
                    <div style={{ display: 'flex', alignContent: "center", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        {loading ? <Spin
                            size="large"
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
                        /> : renderStatusMessage()}
                    </div>
                </WrapperBox>
            </WrapperPage>
        </HelmetProvider>
    )
}

export default PaymentStatusPage