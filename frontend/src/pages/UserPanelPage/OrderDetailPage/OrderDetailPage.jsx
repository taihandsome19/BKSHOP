import React, { useState, useEffect, useCallback } from 'react';
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
import { useNavigate } from 'react-router-dom';

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
    const [curproductId, setcurproductId] = useState('');

    const fetchData = useCallback(async () => {
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
    }, [orderId]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, [fetchData]);

    const handlePrintInvoice = (datainfo, madon, totalQuantity) => {
        const doc = new jsPDF();

        // Set the font
        doc.setFont('TimesNewRoman', 'normal');

        // Title
        doc.setFontSize(14); // Smaller title font size
        const title = 'Hóa Đơn Mua Hàng';
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleWidth = doc.getTextWidth(title);
        const titleX = (pageWidth - titleWidth) / 2;
        doc.text(title, titleX, 16);

        // Order Information
        doc.setFontSize(10); // Font size for other information
        doc.text(`Mã đơn hàng: #BKS${madon}`, 11, 25);
        doc.text(`Ngày mua: ${datainfo.orderDetail.orderdate}`, 11, 30);
        doc.text(`Trạng thái: Đã giao hàng`, 11, 35);

        // Seller Information
        let sellerInfoStartY = 45; // Initial Y position
        doc.text('Thông tin người bán', 11, sellerInfoStartY);
        doc.autoTable({
            startY: sellerInfoStartY + 5,
            head: [['Thông tin', 'Giá trị']],
            body: [
                ['Tên cửa hàng', 'CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ BKSHOP'],
                ['Mã số thuế', '0345678910'],
                ['Số điện thoại', '0888888888'],
                ['Địa chỉ', 'Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương'],
            ],
            styles: { font: 'TimesNewRoman', fontSize: 8, cellPadding: 2 },
            margin: { right: 10, left: 10 },
        });

        // Customer Information
        const na = localStorage.getItem('User_name');
        const em = localStorage.getItem('User_email');
        let customerInfoStartY = doc.autoTable.previous.finalY + 10; // Update position based on last table
        doc.text('Thông tin khách hàng', 11, customerInfoStartY);
        doc.autoTable({
            startY: customerInfoStartY + 5,
            head: [['Thông tin', 'Giá trị']],
            body: [
                ['Họ và tên', na],
                ['Địa chỉ mail', em],
                ['Số điện thoại', datainfo.orderDetail.phonenum],
                ['Địa chỉ', datainfo.orderDetail.address],
            ],
            styles: { font: 'TimesNewRoman', fontSize: 8, cellPadding: 2 },
            margin: { right: 10, left: 10 },
        });

        // Product Information
        let productInfoStartY = doc.autoTable.previous.finalY + 10; // Update position based on last table
        doc.text('Thông tin sản phẩm', 11, productInfoStartY);
        doc.autoTable({
            startY: productInfoStartY + 5,
            head: [['Sản phẩm', 'Màu sắc', 'Dung lượng', 'Số lượng', 'Giá']],
            body: Object.keys(datainfo.orderDetail.items).map(itemId => {
                const item = datainfo.orderDetail.items[itemId];
                return [item.name, item.color, item.memorySize, item.quantity, `${parseInt(item.price).toLocaleString('vi-VN')}đ`];
            }),
            styles: { font: 'TimesNewRoman', fontSize: 8, cellPadding: 2 },
            margin: { right: 10, left: 10 },
        });

        // Payment Information
        let paymentInfoStartY = doc.autoTable.previous.finalY + 10; // Update position based on last table
        doc.text('Thông tin thanh toán', 11, paymentInfoStartY);
        doc.autoTable({
            startY: paymentInfoStartY + 5,
            head: [['Thông tin', 'Giá trị']],
            body: [
                ['Số lượng sản phẩm', totalQuantity],
                ['Tiền hàng', `${parseInt(datainfo.orderDetail.totalPrice).toLocaleString('vi-VN')}đ`],
                ['Phí vận chuyển', 'Miễn phí'],
                ['Tổng tiền (đã gồm VAT)', `${parseInt(datainfo.orderDetail.totalPrice).toLocaleString('vi-VN')}đ`],
                [`Đã thanh toán (${datainfo.orderDetail.payment.method})`, `${parseInt(datainfo.orderDetail.totalPrice).toLocaleString('vi-VN')}đ`],
            ],
            styles: { font: 'TimesNewRoman', fontSize: 8, cellPadding: 2 },
            margin: { right: 10, left: 10 },
        });

        // Save the PDF
        doc.save(`BKS${orderId}.pdf`);
    };

    const navigate = useNavigate();
    const handleNavigate = (id) => {
      navigate(`/product/detail?product_id=${id}`);
    };




    const showModal = (productId) => {
        setIsModalVisible(true);
        setcurproductId(productId);
    };

    const handleOk = async () => {
        if(rating === 0 ){
            message.error("Vui lòng đánh giá số sao!")
            return;
        } else if(review === ""){
            message.error("Vui lòng nhập nội dung đánh giá!")
            return;
        }else if(review.length > 175){
            message.error(`Nội dung đánh giá không được quá 175 ký tự (${review.length}/175)`)
            return;
        }
        try {
            const payload = {
                "star": rating,
                "content": review,
                "productId": parseInt(curproductId),
                "orderId": orderId,
                "email": localStorage.getItem('User_email'), 
                "name": localStorage.getItem('User_name')
            }
            const res = await axios.post("http://localhost:3001/user/review", payload);
            if(res.data && res.data.status === true){
                message.success("Đánh giá sản phẩm thành công!");
                fetchData();
            }else{
                message.error("Đánh giá sản phẩm thất bại!");
                return;
            }
        } catch(error){
            message.error("Đã xảy ra lỗi, vui lòng thử lại sau!")
            return;
        }
        setIsModalVisible(false);
        setReview("");
        setRating(0);
        setcurproductId('');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setcurproductId('');
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

    const items = Object.values(datainfo.orderDetail?.items || {});
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
                    {loading ? (
                        <WrapperRight>
                            <Spin
                                size="large"
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
                            />
                        </WrapperRight>
                    ) : (
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
                                            <ButtonClose onClick={() => handlePrintInvoice(datainfo, orderId,totalQuantity)}>In hoá đơn</ButtonClose>
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
                                    {datainfo.orderDetail.status === "Đã giao hàng" ? (
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            padding: '8px 10px',
                                            fontSize: "12px",
                                            borderRadius: "5px",
                                            backgroundColor: "#e3f4e9",
                                            color: "#007b55"
                                        }}>
                                            {datainfo.orderDetail.status}
                                        </div>
                                    ) : datainfo.orderDetail.status === "Đã xác nhận" ? (
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            padding: '8px 10px',
                                            fontSize: "12px",
                                            borderRadius: "5px",
                                            backgroundColor: "#ffe8a1",
                                            color: "#ff9f00"
                                        }}>
                                            {datainfo.orderDetail.status}
                                        </div>
                                    ) : datainfo.orderDetail.status === "Chờ xác nhận" ? (
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            padding: '8px 10px',
                                            fontSize: "12px",
                                            borderRadius: "5px",
                                            backgroundColor: "#f0f0f0",
                                            color: "#333"
                                        }}>
                                            {datainfo.orderDetail.status}
                                        </div>
                                    ) : datainfo.orderDetail.status === "Đang vận chuyển" ? (
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            padding: '8px 10px',
                                            fontSize: "12px",
                                            borderRadius: "5px",
                                            backgroundColor: "#aad2e0",
                                            color: "#0688B4"
                                        }}>
                                            {datainfo.orderDetail.status}
                                        </div>
                                    ) : (
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            padding: '8px 10px',
                                            fontSize: "12px",
                                            borderRadius: "5px",
                                            backgroundColor: "#ffbaba",
                                            color: "#ce0a0a"
                                        }}>
                                            {datainfo.orderDetail.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ fontSize: '17px', fontWeight: 'bold', paddingTop: '10px', color: '#444' }}>Thông tin sản phẩm</div>
                            {Object.keys(datainfo.orderDetail.items).map((itemId) => {
                                const item = datainfo.orderDetail.items[itemId];
                                return (
                                    <CardOrder key={itemId} onClick={() => handleNavigate(itemId)} style={{cursor: 'pointer'}}>
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
                                                        {(datainfo.orderDetail.status === "Đã giao hàng" && item.reviewstatus !== true) ? (
                                                            <ButtonClose onClick={(e) => { e.stopPropagation(); showModal(itemId); }}>Đánh giá</ButtonClose>
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
                    )}
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
