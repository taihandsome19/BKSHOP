<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
=======
import React, { useState, useRef } from 'react';
>>>>>>> nhap
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

const SigninPage = () => { 
<<<<<<< HEAD
  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged === 'true') {
      window.location.href = '/';
    }
  }, []);

=======
>>>>>>> nhap
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async () => {
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
      setLoading(true);

      const response = await axios.post('http://localhost:3001/auth/log_in', { email, password });
<<<<<<< HEAD
      console.log(response.data);

      if (response.status === 200) {
        message.success('Đăng nhập thành công');

        const { Name, Email } = response.data;
        localStorage.setItem("isLogged", true);
        localStorage.setItem("User_name", Name);
        localStorage.setItem("User_email", Email);
        localStorage.setItem("User_cart", 0);
=======
      if (response.data.status === true) {
        message.success('Đăng nhập thành công');

        const { name, email } = response.data;
        localStorage.setItem("isLogged", true);
        localStorage.setItem("User_name", name);
        localStorage.setItem("User_email", email);

        const ress = await axios.get('http://localhost:3001/user/cart');
        localStorage.setItem('User_cart', ress.data.length);
>>>>>>> nhap
        
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
<<<<<<< HEAD
        message.error('Đăng nhập thất bại');
=======
        message.error('Sai tài khoản hoặc mật khẩu');
>>>>>>> nhap
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setLoading(false);
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
          <title>Đăng nhập - BKSHOP</title>
        </Helmet>
        <WrapperContainerLeft>
          <div>
            <WrapperTitle>Đăng nhập vào hệ thống!</WrapperTitle>
            <WrapperTextSmall>Xin mời bạn nhập đầy đủ thông tin đăng nhập.</WrapperTextSmall>
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
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            Đăng nhập
          </Button>
          <div style={{ flexDirection: 'row', display: 'flex', gap: '5px' }}>
            <WrapperTextSmall>Bạn chưa có tài khoản?</WrapperTextSmall>
            <Link to="/auth/sign_up">
              <WrapperTextBlue>Đăng ký ngay!</WrapperTextBlue>
            </Link>
          </div>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <WrapperTitle>Xin chào!</WrapperTitle>
          <WrapperTextSmall style={{ textAlign: 'center', padding: '5px 20px' }}>Chào mừng bạn đến cửa hàng điện thoại chất lượng nhất thị trường.</WrapperTextSmall>
          <Image src={icon} preview={false} alt="image-logo" width="200px" height="200px" />
        </WrapperContainerRight>
      </div>
    </div>
  );
}

export default SigninPage;
