import React from 'react'
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

const UserPage = () => {
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