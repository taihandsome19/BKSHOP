import React from 'react'
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  KeyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined
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
  WrapperCardInfo,
  WrapperTitle,
  ButtonComfirm
} from "./style"
import {Input} from "antd";
import avt from "../../../assets/images/avt.png";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import icon from '../../../assets/images/pw.svg'

const ChangePassPage = () => {
  return (
    <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Helmet>
        <title>Thay đổi mật khẩu - BKSHOP</title>
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
            <WrapperBoxTextMain>
              <KeyOutlined style={{ fontSize: "20px", color: "#0688B4" }} />
              <WrapperTextNavMain>Thay đổi mật khẩu</WrapperTextNavMain>
            </WrapperBoxTextMain>
            </Link>
            <Link to={'/user/support'} style={{textDecoration: "none"}}>
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
            <WrapperCardInfo>
                <div style={{padding: "40px 40px"}}>
                    <WrapperTitle>THAY ĐỔI MẬT KHẨU</WrapperTitle>
                    <div style={{display: "flex", justifyContent: "center", padding: "30px 0"}}>
                        <img alt='icon pw' style={{height: "100px"}} src={icon}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <div style={{display: "flex", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                            <div style={{fontSize: "15px", color: "#6f6f6f", width: "220px"}}>Mật khẩu hiện tại</div>
                            <Input.Password
                                placeholder="Mật khẩu hiện tại"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>
                        <div style={{display: "flex", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                            <div style={{fontSize: "15px", color: "#6f6f6f", width: "220px"}}>Mật khẩu mới</div>
                            <Input.Password
                                placeholder="Mật khẩu hiện mới"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>
                        <div style={{display: "flex", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                            <div style={{fontSize: "15px", color: "#6f6f6f", width: "220px"}}>Xác nhận mật khẩu mới</div>
                            <Input.Password
                                placeholder="Xác nhận mật khẩu mới"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "right"}}>
                            <ButtonComfirm>Thay đổi mật khẩu</ButtonComfirm>
                        </div>
                    </div>
                </div>
            </WrapperCardInfo>
            

          </WrapperRight>
        </WrapperBox>
      </WrapperPage>
    </div>
  )
}

export default ChangePassPage