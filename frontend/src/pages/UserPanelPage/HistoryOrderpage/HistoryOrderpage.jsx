import React, { useEffect, useState } from 'react'
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  KeyOutlined
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
  ButtonGroup,
  CardOrder,
  WrapperImg,
  ButtonClose
} from "./style"
import avt from "../../../assets/images/avt.png";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { message, Spin, Button } from 'antd';

const handleLogout = async () => {
  try {
    await axios.post('http://localhost:3001/auth/log_out');

    localStorage.clear();

    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const HistoryOrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [datainfo, setDataInfo] = useState({});
  const [loadingbutton, setLoadingButton] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/user/order`);
        if (res.data && res.data.status === true) {
          setDataInfo(res.data);
          setLoading(false);
        } else {
          message.error('Lỗi khi lấy lịch sử đơn hàng');
        }
      } catch (error) {
        message.error('Lỗi khi lấy lịch sử đơn hàng');
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      />
    );
  }


  const handlecanleorder = async (orderId) => {
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


  return (
    <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Helmet>
        <title>Lịch sử mua hàng - BKSHOP</title>
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
            <WrapperBoxText style={{ cursor: 'pointer' }} onClick={handleLogout}>
              <LogoutOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Thoát tài khoản</WrapperTextNav>
            </WrapperBoxText>
          </WrapperNavbar>
          <WrapperRight>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ width: "100px" }}>
                <WrapperAvatar src={avt} alt="User Avatar" preview={false} />
              </div>
              <WrapperTextAvt >
                <WrapperName>{localStorage.getItem('User_name')}</WrapperName>
                <WrapperText>{localStorage.getItem('User_email')}</WrapperText>
              </WrapperTextAvt>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <ButtonGroup>Tất cả</ButtonGroup>
              <ButtonGroup>Chờ xác nhận</ButtonGroup>
              <ButtonGroup>Đang vận chuyển</ButtonGroup>
              <ButtonGroup>Đã giao hàng</ButtonGroup>
              <ButtonGroup>Đã huỷ</ButtonGroup>
            </div>
            {datainfo.orderInfo.map(order => (
              <CardOrder key={order.orderId}>
                <div style={{ margin: '0 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', alignContent: 'center', alignItems: 'center' }}>
                    <div style={{ fontSize: "14px", color: "#444", fontWeight: 'bold' }}>Mã đơn: #{order.orderId}</div>
                    {(order.status === "Đã giao hàng") ? (
                      <div style={{ display: "flex", justifyContent: "center", padding: '8px 10px', fontSize: "12px", borderRadius: "5px", backgroundColor: "#e3f4e9", color: "#007b55" }}>{order.status}</div>
                    ) : (
                      <div style={{ display: "flex", justifyContent: "center", padding: '8px 10px', fontSize: "12px", borderRadius: "5px", backgroundColor: "#ffbaba", color: "#ce0a0a" }}>{order.status}</div>
                    )}
                  </div>
                  {Object.values(order.items).map(item => (
                    <div key={item.name} style={{ display: "flex", borderBottom: '2px solid #F5F5F5' }}>
                      <WrapperImg src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${item.image}?alt=media`} alt={item.name} />
                      <div style={{ padding: "20px", width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontSize: "16px", fontWeight: "600" }}>{item.name}</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px", color: "#6f6f6f", fontSize: "13px", paddingTop: "10px" }}>
                          <div>Màu sắc: {item.color},</div>
                          <div>Dung lượng: {item.memorySize}</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px", color: "#6f6f6f", fontSize: "13px", paddingTop: "10px" }}>
                          <div>Số lượng: {item.quantity}</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ marginTop: "15px", fontSize: "15px", fontWeight: "bold", color: "#0688B4" }}>{parseInt(item.price).toLocaleString('vi-VN')}đ</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#0688B4', padding: '20px 0', display: 'flex', justifyContent: 'end', gap: '5px' }}>
                    <div style={{ color: '#6f6f6f' }}>Tổng tiền:</div>
                    {parseInt(order.totalPrice).toLocaleString('vi-VN')}đ
                  </div>
                  <div style={{ display: 'flex', gap: '5px', justifyContent: 'end', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'end' }}>
                      {(order.status !== "Đã giao hàng" && order.status !== "Đang vận chuyển" && order.status !== "Đã huỷ") ? (
                        <Button loading={loadingbutton} onClick={() => handlecanleorder(order.orderId)} type='dashed'>Huỷ đơn hàng</Button>
                      ) : null}
                    </div>
                    <Link to={`/user/order/detail?orderId=${order.orderId}`} style={{ textDecoration: "none" }}>
                      <ButtonClose style={{ backgroundColor: '#0688B4', color: '#fff', border: 'none' }}>Xem chi tiết</ButtonClose>
                    </Link>
                  </div>
                </div>
              </CardOrder>
            ))}
          </WrapperRight>
        </WrapperBox>
      </WrapperPage>
    </div>
  )
}

export default HistoryOrderPage