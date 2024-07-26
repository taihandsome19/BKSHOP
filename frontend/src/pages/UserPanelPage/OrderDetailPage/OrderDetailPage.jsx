import React, { useState } from 'react';
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
    WrapperAvatar,
    WrapperName,
    WrapperText,
    WrapperTextAvt,
    WrapperCardHome,
    CardSection,
    ButtonGroup,
    CardOrder,
    WrapperImg,
    ButtonClose
} from "./style";
import avt from "../../../assets/images/avt.png";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import ip13 from '../../../assets/images/ip13/ip13.webp';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../../assets/times-new-roman';
import { Modal, Input, Rate } from 'antd';

const OrderDetailPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);


    const handlePrintInvoice = () => {
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
                        <WrapperBoxTextMain>
                            <ShopOutlined style={{ fontSize: "20px", color: "#0688B4" }} />
                            <WrapperTextNavMain>Lịch sử mua hàng</WrapperTextNavMain>
                        </WrapperBoxTextMain>
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
                        <WrapperBoxText>
                            <LogoutOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                            <WrapperTextNav>Thoát tài khoản</WrapperTextNav>
                        </WrapperBoxText>
                    </WrapperNavbar>
                    <WrapperRight>
                        <div style={{ display: 'flex', gap: '10px', alignContent: 'center', alignItems: 'center' }}>
                            <ArrowLeftOutlined style={{ fontSize: "20px", color: '#444' }} />
                            <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#444' }}>Chi tiết đơn hàng</div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '8px', alignContent: 'center', alignItems: 'center', justifyContent: "space-between" }}>
                                <div style={{ display: 'flex', gap: '8px', alignContent: 'center', alignItems: 'center' }}>
                                    <div style={{ fontSize: '15px', color: '#6f6f6f' }}>Mã đơn hàng: </div>
                                    <div style={{ fontSize: '15px', color: '#444', fontWeight: 'bold' }}>#BKS1000205</div>
                                </div>
                                <div>
                                    <ButtonClose onClick={handlePrintInvoice}>In hoá đơn</ButtonClose>
                                    <ButtonClose>Xác nhận huỷ</ButtonClose>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
                                <div style={{ fontSize: '15px', color: '#6f6f6f' }}>Trạng thái: </div>
                                <div style={{ display: "flex", justifyContent: "center", width: "80px", padding: '8px', fontSize: "12px", borderRadius: "5px", backgroundColor: "#e3f4e9", color: "#007b55" }}>Đã giao hàng</div>
                            </div>
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: 'bold', paddingTop: '10px', color: '#444' }}>Thông tin sản phẩm</div>
                        <CardOrder>
                            <div>
                                <div style={{ display: "flex" }}>
                                    <WrapperImg src={ip13} />
                                    <div style={{ padding: "20px", width: "100%" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ fontSize: "15px", fontWeight: "600", color: '#444' }}>iPhone 13 128GB | Chính hãng VN/A</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "8px", color: "#6f6f6f", fontSize: "13px", paddingTop: "10px" }}>
                                            <div>Màu sắc: Trắng,</div>
                                            <div>Dung lượng: 128GB</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "8px", color: "#6f6f6f", fontSize: "13px", paddingTop: "10px" }}>
                                            <div>Số lượng: 1</div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignContent: 'center', paddingTop: '5px' }}>
                                            <div style={{ fontSize: "15px", fontWeight: "bold", color: "#0688B4" }}>13.750.000đ</div>
                                            <ButtonClose onClick={showModal}>Đánh giá</ButtonClose>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardOrder>
                        <CardOrder>
                            <div>
                                <div style={{ display: "flex" }}>
                                    <WrapperImg src={ip13} />
                                    <div style={{ padding: "20px", width: "100%" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ fontSize: "15px", fontWeight: "600", color: '#444' }}>iPhone 13 128GB | Chính hãng VN/A</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "8px", color: "#6f6f6f", fontSize: "13px", paddingTop: "10px" }}>
                                            <div>Màu sắc: Trắng,</div>
                                            <div>Dung lượng: 128GB</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "8px", color: "#6f6f6f", fontSize: "13px", paddingTop: "10px" }}>
                                            <div>Số lượng: 1</div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignContent: 'center', paddingTop: '5px' }}>
                                            <div style={{ fontSize: "15px", fontWeight: "bold", color: "#0688B4" }}>13.750.000đ</div>
                                            <ButtonClose onClick={showModal}>Đánh giá</ButtonClose>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardOrder>
                        <div style={{ fontSize: '17px', fontWeight: 'bold', paddingTop: '10px', color: '#444' }}>Thông tin thanh toán</div>
                        <CardOrder>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', padding: '20px 25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Số lượng sản phẩm</div>
                                    <div>1</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#909EAB', paddingBottom: '10px' }}>Tiền hàng</div>
                                    <div>{(100000).toLocaleString('vi-VN')}đ</div>
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
                                    <div style={{ fontWeight: '600' }}>{(1000000).toLocaleString('vi-VN')}đ</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                        <div style={{ fontWeight: '600' }}>Đã thanh toán</div>
                                        <div style={{ color: '#909EAB' }}>(chuyển khoản)</div>
                                    </div>
                                    <div style={{ fontWeight: '600', color: '#54D62B' }}>{(1000000).toLocaleString('vi-VN')}đ</div>
                                </div>
                            </div>
                        </CardOrder>
                        <div style={{ fontSize: '17px', fontWeight: 'bold', paddingTop: '10px', color: '#444' }}>Thông tin khách hàng</div>
                        <CardOrder>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', padding: '20px 25px' }}>
                                <div style={{ display: 'flex', alignContent: 'center' }}>
                                    <UserOutlined style={{ color: '#909EAB' }} />
                                    <div style={{ color: '#909EAB', paddingLeft: '8px' }}>Họ và tên:</div>
                                    <div style={{ color: '#444', paddingLeft: '15px' }}>Trần Thành Tài</div>
                                </div>
                                <div style={{ display: 'flex', alignContent: 'center' }}>
                                    <MailOutlined style={{ color: '#909EAB' }} />
                                    <div style={{ color: '#909EAB', paddingLeft: '8px' }}>Địa chỉ mail:</div>
                                    <div style={{ color: '#444', paddingLeft: '15px' }}>tai@hcmut.edu.vn</div>
                                </div>
                                <div style={{ display: 'flex', alignContent: 'center' }}>
                                    <PhoneOutlined style={{ color: '#909EAB' }} />
                                    <div style={{ color: '#909EAB', paddingLeft: '8px' }}>Số điện thoại:</div>
                                    <div style={{ color: '#444', paddingLeft: '15px' }}>0888888888</div>
                                </div>
                                <div style={{ display: 'flex', alignContent: 'center' }}>
                                    <TruckOutlined style={{ color: '#909EAB' }} />
                                    <div style={{ color: '#909EAB', paddingLeft: '8px' }}>Địa chỉ:</div>
                                    <div style={{ color: '#444', paddingLeft: '15px' }}>Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương</div>
                                </div>
                            </div>
                        </CardOrder>
                    </WrapperRight>
                    <Modal title="Đánh giá sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Đánh giá" cancelText="Hủy bỏ">
                        <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '20px'}}>
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
