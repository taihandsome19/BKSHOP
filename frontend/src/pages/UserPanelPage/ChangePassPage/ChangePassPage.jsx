import React, { useState } from 'react'
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
  WrapperTitle
} from "./style"
import {Button, Input, message} from "antd";
import avt from "../../../assets/images/avt.png";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import icon from '../../../assets/images/pw.svg';
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

const ChangePassPage = () => {
  const [currentpass, setcurrentpass] = useState('');
  const [newpass, setnewpass] = useState('');
  const [confirmpass, setconfirmpass] = useState('');
  const [btloading, setbtLoading] = useState(false);

  const handleSubmit = async () => {
    if(newpass === '' || currentpass === '' || confirmpass === ''){
      message.error('Vui lòng điền đầy đủ thông tin');
      return;
    } else if(newpass !== confirmpass){
      message.error("Mật khẩu xác nhận không khớp với mật khẩu mới");
      return;
    }
    setbtLoading(true);
    try{
      const res = await axios.post('http://localhost:3001/auth/change_password', {currentPassword: currentpass, newPassword: newpass});
      if(res.data && res.data.status === true){
        message.success("Đổi mật khẩu thành công");
      }else{
        message.error("Đổi mật khẩu thất bại");
      }
    }catch (error) {
      message.error("Sai mật khẩu hiện tại");
    }
    setbtLoading(false);
  } 

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
                                onBlur={(e) => setcurrentpass(e.target.value)}
                                placeholder="Mật khẩu hiện tại"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>
                        <div style={{display: "flex", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                            <div style={{fontSize: "15px", color: "#6f6f6f", width: "220px"}}>Mật khẩu mới</div>
                            <Input.Password
                              onBlur={(e) => setnewpass(e.target.value)}
                                placeholder="Mật khẩu mới"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>
                        <div style={{display: "flex", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                            <div style={{fontSize: "15px", color: "#6f6f6f", width: "220px"}}>Xác nhận mật khẩu mới</div>
                            <Input.Password
                              onBlur={(e) => setconfirmpass(e.target.value)}
                                placeholder="Xác nhận mật khẩu mới"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "right"}} onClick={handleSubmit}>
                            <Button loading={btloading} style={{height: '40px', backgroundColor: '#0688B4',  padding: "10px 20px", fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>Thay đổi mật khẩu</Button>
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