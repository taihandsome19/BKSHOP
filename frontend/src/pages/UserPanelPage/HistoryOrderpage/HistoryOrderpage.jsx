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
} from "./style"
import avt from "../../../assets/images/avt.png";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import ip13 from '../../../assets/images/ip13/ip13.webp'

const HistoryOrderPage = () => {
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
            <WrapperBoxText>
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
                <WrapperName>Trần Thành Tài</WrapperName>
                <WrapperText>tai.tranthanh@hcmut.edu.vn</WrapperText>
              </WrapperTextAvt>
            </div>
            <WrapperCardHome>
              <CardSection>
                <h1>1</h1>
                <WrapperText>Đơn hàng</WrapperText>
              </CardSection>
              <CardSection>
                <h1>1M</h1>
                <WrapperText>Tổng tiền mua hàng</WrapperText>
              </CardSection>
              <CardSection>
                <h1>Thành viên</h1>
                <WrapperText>Cấp bậc</WrapperText>
              </CardSection>
            </WrapperCardHome>
            <div style={{ display: "flex", gap: "10px" }}>
              <ButtonGroup>Tất cả</ButtonGroup>
              <ButtonGroup>Chờ xác nhận</ButtonGroup>
              <ButtonGroup>Đang vận chuyển</ButtonGroup>
              <ButtonGroup>Đã giao hàng</ButtonGroup>
              <ButtonGroup>Đã huỷ</ButtonGroup>
            </div>
            <CardOrder>
              <div>
                <div style={{ display: "flex" }}>
                  <WrapperImg src={ip13} />
                  <div style={{ padding: "20px", width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: "16px", fontWeight: "600" }}>iPhone 13 128GB | Chính hãng VN/A</div>
                      <div style={{ fontSize: "14px", color: "#6f6f6f" }}>Mã đơn hàng: #1008894363</div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", color: "6f6f6f", fontSize: "13px", paddingTop: "10px" }}>
                      <div>Số lượng: 1</div>
                      <div>Màu sắc: Trắng</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", width: "80px", padding: "8px", marginTop: "10px", fontSize: "12px", borderRadius: "5px", backgroundColor: "#EFF8F2", color: "#007b55" }}>Đã giao hàng</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ marginTop: "15px", fontSize: "15px", fontWeight: "bold", color: "#0688B4" }}>13.750.000đ</div>
                      <ButtonClose>Xác nhận huỷ</ButtonClose>
                    </div>
                  </div>
                </div>
              </div>
            </CardOrder>


          </WrapperRight>
        </WrapperBox>
      </WrapperPage>
    </div>
  )
}

export default HistoryOrderPage