import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  KeyOutlined,
  FrownOutlined
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
} from "./style";
import avt from "../../../assets/images/avt.png";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { message, Spin, Button } from 'antd';
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

const HistoryOrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [datainfo, setDataInfo] = useState({ orderInfo: [] });
  const [loadingbutton, setLoadingButton] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/user/order`);
      if (res.data && res.data.status === true) {
        const fm = {
          status: res.data.status,
          orderInfo: res.data.orderInfo.reverse(),
        }
        setDataInfo(fm);
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
      message.error('Lỗi khi lấy lịch sử đơn hàng');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const handlecanleorder = async (orderId) => {
    setLoadingButton(true);
    try {
      const res = await axios.post('http://localhost:3001/admin/update_order', { orderId, status: 'Đã huỷ' });
      if (res.data && res.data.status === true) {
        message.success("Huỷ đơn hàng thành công");
        setLoadingButton(false);
        fetchData();
      } else {
        message.error("Huỷ đơn hàng thất bại");
        setLoadingButton(false);
      }
    } catch (error) {
      message.error("Huỷ đơn hàng thất bại");
      setLoadingButton(false);
    }
  };

  const filteredOrders = selectedStatus === "Tất cả"
    ? datainfo.orderInfo
    : datainfo.orderInfo.filter(order => order.status === selectedStatus);

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/user/order/detail?orderId=${id}`);
  };



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
            {loading ? (
              <Spin
                size="large"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '150px' }}
              />
            ) : (
              <>
                <div style={{ display: "flex", gap: "10px" }}>
                  <ButtonGroup
                    active={selectedStatus === "Tất cả"}
                    onClick={() => setSelectedStatus("Tất cả")}
                  >
                    Tất cả
                  </ButtonGroup>
                  <ButtonGroup
                    active={selectedStatus === "Chờ xác nhận"}
                    onClick={() => setSelectedStatus("Chờ xác nhận")}
                  >
                    Chờ xác nhận
                  </ButtonGroup>
                  <ButtonGroup
                    active={selectedStatus === "Đã xác nhận"}
                    onClick={() => setSelectedStatus("Đã xác nhận")}
                  >
                    Đã xác nhận
                  </ButtonGroup>
                  <ButtonGroup
                    active={selectedStatus === "Đang vận chuyển"}
                    onClick={() => setSelectedStatus("Đang vận chuyển")}
                  >
                    Đang vận chuyển
                  </ButtonGroup>
                  <ButtonGroup
                    active={selectedStatus === "Đã giao hàng"}
                    onClick={() => setSelectedStatus("Đã giao hàng")}
                  >
                    Đã giao hàng
                  </ButtonGroup>
                  <ButtonGroup
                    active={selectedStatus === "Đã huỷ"}
                    onClick={() => setSelectedStatus("Đã huỷ")}
                  >
                    Đã huỷ
                  </ButtonGroup>
                </div>
                {filteredOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', fontSize: '14px', color: '#6f6f6f' }}>
                    <FrownOutlined style={{fontSize: '30px', paddingBottom: '10px'}} />
                    <div>Không có đơn hàng nào!</div>
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <CardOrder key={order.orderId}>
                      <div style={{ margin: '0 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', alignContent: 'center', alignItems: 'center' }}>
                          <div style={{ fontSize: "14px", color: "#444", fontWeight: 'bold' }}>Mã đơn: #{order.orderId}</div>
                          {order.status === "Đã giao hàng" ? (
                            <div style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: '8px 10px',
                              fontSize: "12px",
                              borderRadius: "5px",
                              backgroundColor: "#e3f4e9",
                              color: "#007b55"
                            }}>
                              {order.status}
                            </div>
                          ) : order.status === "Đã xác nhận" ? (
                            <div style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: '8px 10px',
                              fontSize: "12px",
                              borderRadius: "5px",
                              backgroundColor: "#ffe8a1",
                              color: "#ff9f00"
                            }}>
                              {order.status}
                            </div>
                          ) : order.status === "Chờ xác nhận" ? (
                            <div style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: '8px 10px',
                              fontSize: "12px",
                              borderRadius: "5px",
                              backgroundColor: "#f0f0f0",
                              color: "#333"
                            }}>
                              {order.status}
                            </div>
                          ) : order.status === "Đang vận chuyển" ? (
                            <div style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: '8px 10px',
                              fontSize: "12px",
                              borderRadius: "5px",
                              backgroundColor: "#aad2e0",
                              color: "#0688B4"
                            }}>
                              {order.status}
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
                              {order.status}
                            </div>
                          )}
                        </div>
                        <div onClick={() => handleNavigate(order.orderId)} style={{ cursor: 'pointer' }}>
                          {order.items && Object.values(order.items).map(item => (
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
                        </div>
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
                  ))
                )}
              </>
            )}
          </WrapperRight>
        </WrapperBox>
      </WrapperPage>
    </div>
  );
};

export default HistoryOrderPage;
