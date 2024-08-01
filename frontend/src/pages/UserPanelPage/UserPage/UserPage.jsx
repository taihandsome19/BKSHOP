import React, {useState, useEffect} from 'react'
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  InfoCircleFilled,
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
  WrapperCardHome,
  CardSection,
  CardUpdate,
  CardRecommend,
  WrapperTitle,
  Wrapperswipper,
  WrapperCardItem
} from "./style"
import avt from "../../../assets/images/avt.png";
import bg1 from "../../../assets/images/banner4.jpg";
import bg2 from "../../../assets/images/banner2.jpg";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
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

const UserPage = () => {
  const [total_order, settotal_order] = useState(0);
  const [total_price, settotal_price] = useState(0);

  const fetchDataStatic = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/user/order`);
      if (res.data && res.data.orderInfo) {
        const totalPriceShipped = Math.floor(res.data.orderInfo
            .filter(order => order.status === "Đã giao hàng")
            .reduce((total, order) => total + order.totalPrice, 0)/ 1000000);
        const numberOfOrders = res.data.orderInfo.length;
        settotal_order(numberOfOrders);
        settotal_price(totalPriceShipped);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataStatic();
  }, []);


  return (
    <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Helmet>
        <title>Trang cá nhân - BKSHOP</title>
      </Helmet>
      <WrapperPage>
        <WrapperBox>
          <WrapperNavbar>
            <WrapperBoxTextMain>
              <HomeOutlined style={{ fontSize: "20px", color: "#0688B4" }} />
              <WrapperTextNavMain>Trang chủ</WrapperTextNavMain>
            </WrapperBoxTextMain>
            <Link to={'/user/info'} style={{ textDecoration: "none" }}>
              <WrapperBoxText>
                <UserOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                <WrapperTextNav>Tài khoản của bạn</WrapperTextNav>
              </WrapperBoxText>

            </Link>
            <Link to={'/user/order'} style={{ textDecoration: "none" }}>
              <WrapperBoxText>
                <ShopOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                <WrapperTextNav>Lịch sử mua hàng</WrapperTextNav>
              </WrapperBoxText>
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
            <WrapperBoxText style={{cursor: 'pointer'}} onClick={handleLogout}>
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
            <WrapperCardHome>
              <CardSection>
                <h1>{total_order}</h1>
                <WrapperText>Đơn hàng</WrapperText>
              </CardSection>
              <CardSection>
                <h1>{total_price}M</h1>
                <WrapperText>Tổng tiền mua hàng</WrapperText>
              </CardSection>
              <CardSection>
                <h1>{(localStorage.getItem('User_role') === 'admin') ? ("Quản trị viên"):("Thành viên")}</h1>
                <WrapperText>Cấp bậc</WrapperText>
              </CardSection>
            </WrapperCardHome>
            <CardUpdate>
              <InfoCircleFilled style={{ color: "#1990FF", fontSize: "20px", paddingLeft: "10px", paddingRight: "10px" }} />
              <WrapperText>Cập nhật thông tin cá nhân và địa chỉ để có trải nghiệm đặt hàng nhanh và thuận tiện hơn.</WrapperText>
              <Link to="/user/info">
                <WrapperText style={{ paddingLeft: "2px", color: "#0d7de0" }}>Cập nhật?</WrapperText>
              </Link>
            </CardUpdate>

            <CardRecommend>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                <WrapperTitle>CHƯƠNG TRÌNH NỔI BẬT</WrapperTitle>
              </div>
              <Wrapperswipper>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center" }}>
                  <WrapperCardItem src={bg1} alt="Chương trình 1" preview={false} />
                  <h2>GALAXY S24 SERIES - GIÁ SIÊU ƯU ĐÃI </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center" }}>
                  <WrapperCardItem src={bg2} alt="Chương trình 2" preview={false} />
                  <h2>XIAOMI 14 ULTRA - GIÁ ƯU ĐÃI</h2>
                </div>
              </Wrapperswipper>
            </CardRecommend>



          </WrapperRight>
        </WrapperBox>
      </WrapperPage>
    </div>
  )
}

export default UserPage