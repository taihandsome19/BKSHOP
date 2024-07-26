import React from 'react'
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
  WrapperCard
} from "./style"
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import img1 from '../../../assets/images/headphone.png';
import img2 from '../../../assets/images/time.png';
import img3 from '../../../assets/images/baohanh.png';
import img4 from '../../../assets/images/email.png';
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

const SupportPage = () => {
  return (
    <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Helmet>
        <title>Hỗ trợ - BKSHOP</title>
      </Helmet>
      <WrapperPage>
        <WrapperBox>
          <WrapperNavbar>
            <Link to={'/user/'} style={{textDecoration: "none"}}>
            <WrapperBoxText>
              <HomeOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Trang chủ</WrapperTextNav>
            </WrapperBoxText>
            </Link>
            <Link to={'/user/info'} style={{textDecoration: "none"}}>
              <WrapperBoxText>
                <UserOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                <WrapperTextNav>Tài khoản của bạn</WrapperTextNav>
              </WrapperBoxText>
            </Link>
            <Link to={'/user/order'} style={{textDecoration: "none"}}>
            <WrapperBoxText>
              <ShopOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Lịch sử mua hàng</WrapperTextNav>
            </WrapperBoxText>
            </Link>
            <Link to={'/user/change_pass'} style={{textDecoration: "none"}}>
            <WrapperBoxText>
              <KeyOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Thay đổi mật khẩu</WrapperTextNav>
            </WrapperBoxText>
            </Link>
            <WrapperBoxTextMain>
              <QuestionCircleOutlined style={{ fontSize: "20px", color: "#0688B4" }} />
              <WrapperTextNavMain>Hỗ trợ</WrapperTextNavMain>
            </WrapperBoxTextMain>
            <WrapperBoxText style={{cursor: 'pointer'}} onClick={handleLogout}>
              <LogoutOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Thoát tài khoản</WrapperTextNav>
            </WrapperBoxText>
          </WrapperNavbar>
          <WrapperRight>
            <div style={{display: "flex", gap: "50px"}}>
                <WrapperCard>
                    <img src={img1} alt="head-phone" />
                    <div style={{fontSize: "16px"}}>
                        <div style={{color: "#4A4A4A"}}>Tư vấn mua hàng (8h00 - 22h00)</div>
                        <div style={{color: "#0688B4", paddingTop: "8px"}}>1800.0007</div>
                    </div>
                </WrapperCard>
                <WrapperCard>
                    <img src={img2} alt="time" />
                    <div style={{fontSize: "16px"}}>
                        <div style={{color: "#4A4A4A"}}>Bảo hành (8h00 - 22h00)</div>
                        <div style={{color: "#0688B4", paddingTop: "8px"}}>1800.0008</div>
                    </div>
                </WrapperCard>
            </div>
            <div style={{display: "flex", gap: "50px"}}>
                <WrapperCard>
                    <img src={img3} alt="khieu nai" />
                    <div style={{fontSize: "16px"}}>
                        <div style={{color: "#4A4A4A"}}>Khiếu nại (8h00 - 21h30)</div>
                        <div style={{color: "#0688B4", paddingTop: "8px"}}>1800.0009</div>
                    </div>
                </WrapperCard>
                <WrapperCard>
                    <img src={img4} alt="email" />
                    <div style={{fontSize: "16px"}}>
                        <div style={{color: "#4A4A4A"}}>Email</div>
                        <div style={{color: "#0688B4", paddingTop: "8px"}}>contact@bkshop.com.vn</div>
                    </div>
                </WrapperCard>
            </div>
          </WrapperRight>
        </WrapperBox>
      </WrapperPage>
    </div>
  )
}

export default SupportPage