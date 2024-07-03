import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Image, Input, Button, message } from 'antd';
import bg from "../../assets/images/bglogin.jpg";
import icon from "../../assets/images/iconlogin.png";
import { 
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTitle,
  WrapperTextSmall,
  WrapperTextBlue
} from './style';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const validateName = (name) => {
    return name.length <= 21;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    if (name.trim() === '') {
      message.error('Họ và tên không được để trống');
      nameRef.current.focus();
      return;
    }

    if (!validateName(name)) {
      message.error('Họ và tên không được quá dài');
      nameRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      message.error('Email không hợp lệ');
      emailRef.current.focus();
      return;
    }

    if (!validatePassword(password)) {
      message.error('Mật khẩu phải có ít nhất 6 ký tự');
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await axios.post('/api/register', { name, email, password });
      if (response.status === 200) {
        message.success('Đăng ký thành công');
      } else {
        message.error('Đăng ký thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi đăng ký');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}>
      <div style={{
        width: '800px',
        height: '450px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Roboto, sans-serif',
        display: 'flex',
      }}>
        <Helmet>
          <title>Đăng ký - BKSHOP</title>
        </Helmet>
        <WrapperContainerLeft>
          <div>
            <WrapperTitle>Đăng ký tài khoản mới!</WrapperTitle>
            <WrapperTextSmall>Xin mời bạn nhập đầy đủ thông tin đăng ký mới.</WrapperTextSmall>
          </div>
          <div>
            <WrapperTextSmall>Họ và tên</WrapperTextSmall>
            <Input 
              placeholder="Vui lòng nhập họ và tên" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={nameRef}
            />
          </div>
          <div>
            <WrapperTextSmall>Email</WrapperTextSmall>
            <Input 
              placeholder="Vui lòng nhập email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
          </div>
          <div>
            <WrapperTextSmall>Mật khẩu</WrapperTextSmall>
            <Input.Password
              placeholder="Vui lòng nhập mật khẩu"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
            />
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Đăng ký
          </Button>
          <div style={{flexDirection: 'row', display: 'flex', gap: '5px'}}>
            <WrapperTextSmall>Bạn đã có tài khoản?</WrapperTextSmall>
            <Link to="/login">
              <WrapperTextBlue>Đăng nhập ngay!</WrapperTextBlue>
            </Link>
          </div>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <WrapperTitle>Xin chào!</WrapperTitle>
          <WrapperTextSmall style={{textAlign: 'center', padding: '5px 20px'}}>Chào mừng bạn đến cửa hàng điện thoại chất lượng nhất thị trường.</WrapperTextSmall>
          <Image src={icon} preview={false} alt="image-logo" width="200px" height="200px"/>
        </WrapperContainerRight>
      </div>
    </div>
  );
}

export default SignupPage;
