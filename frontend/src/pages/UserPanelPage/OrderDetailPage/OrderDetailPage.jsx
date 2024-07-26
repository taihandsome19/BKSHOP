import React, { useState, useEffect } from 'react';
import {
    HomeOutlined,
    UserOutlined,
    ShopOutlined,
    LogoutOutlined,
    QuestionCircleOutlined,
    KeyOutlined,
    ArrowLeftOutlined,
    MailOutlined,
    PhoneOutlined,
    TruckOutlined
} from '@ant-design/icons';
import {
    WrapperNavbar,
    WrapperPage,
    WrapperRight,
    WrapperBox,
    WrapperBoxTextMain,
    WrapperTextNavMain,
    WrapperBoxText,
    WrapperTextNav,
    CardOrder,
    WrapperImg,
    ButtonClose
} from "./style";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../../assets/times-new-roman';
import { Modal, Input, Rate, Spin, message, Button } from 'antd';
import axios from 'axios';

const handleLogout = async () => {
    try {
        await axios.post('http://localhost:3001/auth/log_out');

        localStorage.clear();

        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

const OrderDetailPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [loadingbutton, setLoadingButton] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('orderId');
    const [loading, setLoading] = useState(true);
    const [datainfo, setDataInfo] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/user/order/detail?orderId=${orderId}`);
                if (res.data && res.data.status === true) {
                    setDataInfo(res.data);
                    setLoading(false);
                } else {
                    message.error('Lỗi khi lấy thông tin đơn hàng');
                }
            } catch (error) {
                message.error('Lỗi khi lấy thông tin đơn hàng');
            }
        };
        fetchData();
    }, [orderId]);


    if (loading) {
        return (
            <Spin
                size="large"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
            />
        );
    }

    const handlePrintInvoice = () => {
        // Tạm thời chưa xử lý
        return;
        const doc = new jsPDF();

        doc.setFont('TimesNewRoman', 'normal');

        doc.setFontSize(18);
        doc.text('Hóa Đơn Mua Hàng', 14, 22);

        doc.setFontSize(12);
        doc.text('Mã đơn hàng: #BKS1000205', 14, 32);
        doc.text('Trạng thái: Đã giao hàng', 14, 42);

        // Add product information
        doc.autoTable({
            startY: 52,
            head: [['Sản phẩm', 'Màu sắc', 'Dung lượng', 'Số lượng', 'Giá']],
            body: [
                ['iPhone 13 128GB | Chính hãng VN/A', 'Trắng', '128GB', '1', '13.750.000đ'],
                // Add more products if needed
            ],
            styles: { font: 'TimesNewRoman' }
        });

        // Add payment information
        doc.text('Thông tin thanh toán', 11, doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 20,
            head: [['Thông tin', 'Giá trị']],
            body: [
                ['Số lượng sản phẩm', '1'],
                ['Tiền hàng', '13.750.000đ'],
                ['Phí vận chuyển', 'Miễn phí'],
                ['Tổng tiền (đã gồm VAT)', '13.750.000đ'],
                ['Đã thanh toán (chuyển khoản)', '13.750.000đ'],
            ],
            styles: { font: 'TimesNewRoman' }
        });

        // Add customer information
        doc.text('Thông tin khách hàng', 11, doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 20,
            head: [['Thông tin', 'Giá trị']],
            body: [
                ['Họ và tên', 'Trần Thành Tài'],
                ['Địa chỉ mail', 'tai@hcmut.edu.vn'],
                ['Số điện thoại', '0888888888'],
                ['Địa chỉ', 'Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương'],
            ],
            styles: { font: 'TimesNewRoman' }
        });

        doc.save('hoa_don.pdf');
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Handle review submission logic here
        console.log("Review submitted:", review);
        setIsModalVisible(false);
        setReview(""); // Reset review input after submission
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handlecanleorder = async () => {
        setLoadingButton(true);
        try {
            const res = await axios.post('http://localhost:3001/admin/update_order', { orderId, status: 'Đã huỷ' });
            if (res.data && res.data.status === true) {
                message.success("Huỷ đơn hàng thành công")
                setLoadingButton(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                message.error("Huỷ đơn hàng thất bại")
                setLoadingButton(false);
            }
        } catch (error) {
            message.error("Huỷ đơn hàng thất bại")
            setLoadingButton(false);
        }

    }

    const items = Object.values(datainfo.orderDetail.items);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
            <Helmet>
                <title>Chi tiết đơn hàng - BKSHOP</title>
            </Helmet>
            <WrapperPage>
                <WrapperBox>
                    <WrapperNavbar>
                        <Link to={'/user/'} style={{ textDecoration: "none" }}>
                            <WrapperBoxText>
                                <HomeOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                                <WrapperTextNav>Trang chủ</WrapperTextNav>
                            </WrapperBoxText>
                        </Link>
                        <Link to={'/user/info'} style={{ textDecoration: "none" }}>
                            <WrapperBoxText>
                                <UserOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                                <WrapperTextNav>Tài khoản của bạn</WrapperTextNav>
                            </WrapperBoxText>
                        </Link>
                        <Link to={'/user/order/'} style={{ textDecoration: "none" }}>
                        <WrapperBoxTextMain>
                            <ShopOutlined style={{ fontSize: "20px", color: "#0688B4" }} />
                            <WrapperTextNavMain>Lịch sử mua hàng</WrapperTextNavMain>
                        </WrapperBoxTextMain>
                        </Link>
                        <Link to={'/user/change_pass'} style={{ textDecoration: "none" }}>
                            <WrapperBoxText>
                                <KeyOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                                <WrapperTextNav>Thay đổi mật khẩu</WrapperTextNav>
                            </WrapperBoxText>
                        </Link>
                        <Link to={'/user/support'} style={{ textDecoration: "none" }}>
                            <WrapperBoxText>
                                <QuestionCircleOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                                <WrapperTextNav>Hỗ trợ</WrapperTextNav>
                            </WrapperBoxText>
                        </Link>
                        <WrapperBoxText style={{ cursor: 'pointer' }} onClick={handleLogout}>
                            <LogoutOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                            <WrapperTextNav>Thoát tài khoản</WrapperTextNav>
                        </WrapperBoxText>
                    </WrapperNavbar>
                    <WrapperRight>
                        <div style={{ display: 'flex', gap: '10px', alignContent: 'center', alignItems: 'center' }}>
                            <Link to={'/user/order/'} style={{ textDecoration: "none" }}>
                                <ArrowLeftOutlined style={{ fontSize: "20px", color: '#444' }} />
                            </Link>
                            <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#444' }}>Chi tiết đơn hàng</div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '8px', alignContent: 'center', alignItems: 'center', justifyContent: "space-between" }}>
                                <div style={{ display: 'flex', gap: '8px', alignContent: 'center', alignItems: 'center' }}>
                                    <div style={{ fontSize: '15px', color: '#6f6f6f' }}>Mã đơn hàng: </div>
                                    <div style={{ fontSize: '15px', color: '#444', fontWeight: 'bold' }}>#{orderId}</div>
                                </div>
                                <div>
                                    {datainfo.orderDetail.status === "Đã giao hàng" ? (
                                        <ButtonClose onClick={handlePrintInvoice}>In hoá đơn</ButtonClose>
                                    ) : null}
                                    {(datainfo.orderDetail.status !== "Đã giao hàng" && datainfo.orderDetail.status !== "Đang vận chuyển" && datainfo.orderDetail.status !== "Đã huỷ") ? (
                                        <Button loading={loadingbutton} onClick={handlecanleorder} type='dashed'>Huỷ đơn hàng</Button>
                                    ) : null}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
                                <div style={{ fontSize: '15px', color: '#6f6f6f' }}>Ngày đặt hàng: </div>
                                <div style={{ fontSize: '15px', color: '#444' }}>{datainfo.orderDetail.orderdate}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignContent: 'center', alignItems: 'center', paddingTop: '15px' }}>
                                <div style={{ fontSize: '15px', color: '#6f6f6f' }}>Trạng thái: </div>
                                {(datainfo.orderDetail.status === "Đã giao hàng") ? (
                                    <div style={{ display: "flex", justifyContent: "center", padding: '8px 10px', fontSize: "12px", borderRadius: "5px", backgroundColor: "#e3f4e9", color: "#007b55" }}>{datainfo.orderDetail.status}</div>
                                ) : (
                                    <div style={{ display: "flex", justifyContent: "center", padding: '8px 10px', fontSize: "12px", borderRadius: "5px", backgroundColor: "#ffbaba", color: "#ce0a0a" }}>{datainfo.orderDetail.status}</div>
                                )}
                            </div>
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: 'bold', paddingTop: '10px', color: '#444' }}>Thông tin sản phẩm</div>
                        {Object.keys(datainfo.orderDetail.items).map((itemId) => {
                            const item = datainfo.orderDetail.items[itemId];
                            return (
                                <CardOrder key={itemId}>
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <WrapperImg src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${item.image}?alt=media`} />
                                            <div style={{ padding: '20px', width: '100%' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#444' }}>
                                                        {item.name}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', color: '#6f6f6f', fontSize: '13px', paddingTop: '10px' }}>
                                                    <div>Màu sắc: {item.color}</div>
                                                    <div>Dung lượng: {item.memorySize}</div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', color: '#6f6f6f', fontSize: '13px', paddingTop: '10px' }}>
                                                    <div>Số lượng: {item.quantity}</div>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', paddingTop: '5px' }}>
                                                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#0688B4', height: '33.5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        {Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </div>
                                                    {(datainfo.orderDetail.status === "Đã giao hàng") ? (
                                                        <ButtonClose onClick={showModal}>Đánh giá</ButtonClose>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardOrder>
                            );
                        })}

                        <div style={{ fontSize: '17px', fontWeight: 'bold', paddingTop: '10px', color: '#444' }}>Thông tin thanh toán</div>
                        <CardOrder>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', padding: '20px 25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số lượng sản phẩm</div>
                                    <div>{totalQuantity}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Tiền hàng</div>
                                    <div>{parseInt(datainfo.orderDetail.totalPrice).toLocaleString('vi-VN')}đ</div>
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
                                    <div style={{ fontWeight: '600' }}>{parseInt(datainfo.orderDetail.totalPrice).toLocaleString('vi-VN')}đ</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                        <div style={{ fontWeight: '600' }}>Đã thanh toán</div>
                                        <div style={{ color: '#909EAB' }}>({(datainfo.orderDetail.payment.method === 'COD') ? ("COD") : ("Chuyển khoản")})</div>
                                    </div>
                                    <div>
                                        {(datainfo.orderDetail.payment.status === true) ? (
                                            <div style={{ fontWeight: '600', color: '#54D62B' }}>{parseInt(datainfo.orderDetail.totalPrice).toLocaleString('vi-VN')}đ</div>
                                        ) : (
                                            <div style={{ fontWeight: '600', color: '#ff4d4f' }}>0đ</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardOrder>
                        <div style={{ fontSize: '17px', fontWeight: 'bold', paddingTop: '10px', color: '#444' }}>Thông tin khách hàng</div>
                        <CardOrder>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', padding: '20px 25px' }}>
                                <div style={{ display: 'flex', alignContent: 'center' }}>
                                    <UserOutlined style={{ color: '#909EAB' }} />
                                    <div style={{ color: '#909EAB', paddingLeft: '8px' }}>Họ và tên:</div>
                                    <div style={{ color: '#444', paddingLeft: '15px' }}>{localStorage.getItem('User_name')}</div>
                                </div>
                                <div style={{ display: 'flex', alignContent: 'center' }}>
                                    <MailOutlined style={{ color: '#909EAB' }} />
                                    <div style={{ color: '#909EAB', paddingLeft: '8px' }}>Địa chỉ mail:</div>
                                    <div style={{ color: '#444', paddingLeft: '15px' }}>{localStorage.getItem('User_email')}</div>
                                </div>
                                <div style={{ display: 'flex', alignContent: 'center' }}>
                                    <PhoneOutlined style={{ color: '#909EAB' }} />
                                    <div style={{ color: '#909EAB', paddingLeft: '8px' }}>Số điện thoại:</div>
                                    <div style={{ color: '#444', paddingLeft: '15px' }}>{datainfo.orderDetail.phonenum}</div>
                                </div>
                                <div style={{ display: 'flex', alignContent: 'center' }}>
                                    <TruckOutlined style={{ color: '#909EAB' }} />
                                    <div style={{ color: '#909EAB', paddingLeft: '8px' }}>Địa chỉ:</div>
                                    <div style={{ color: '#444', paddingLeft: '15px' }}>{datainfo.orderDetail.address}</div>
                                </div>
                            </div>
                        </CardOrder>
                    </WrapperRight>
                    <Modal title="Đánh giá sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Đánh giá" cancelText="Hủy bỏ">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                            <Rate
                                value={rating}
                                onChange={setRating}
                            />
                        </div>
                        <Input.TextArea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Viết đánh giá của bạn..."
                            rows={4}
                        />
                    </Modal>
                </WrapperBox>
            </WrapperPage>
        </div>
    );
}

export default OrderDetailPage;
