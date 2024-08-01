import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Image, Input, Button, message, Modal } from 'antd';
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
  const [loading, setLoading] = useState(false);
  const [ismodal, setismodal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [femail, setfemail] = useState('');
  const [loadingf, setLoadingf] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const openModal = () => {
    setismodal(true);
    setfemail('');
  }

  const closeModal = () => {
    setismodal(false);
    setfemail('');
  }

  const forgetmail = async () => {
    if (femail === '') {
      message.error('Vui lòng điền địa chỉ mail!');
      return;
    } else if (!validateEmail(femail)) {
      message.error('Email không hợp lệ!');
      return;
    }
    setLoadingf(true);
    try {
      const res = await axios.post('http://localhost:3001/auth/forgot_password', { email: femail })
      if (res.data.status === true) {
        message.success('Thành công, vui lòng kiểm tra hộp thư')
        setLoadingf(false);
        setismodal(false);
      } else {
        message.error('Đã xảy ra lỗi vui lòng thử lại')
        setLoadingf(false);
      }
    } catch(error){
      message.error('Đã xảy ra lỗi vui lòng thử lại')
      setLoadingf(false);
    }
  }

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
      if (response.data.status === true) {
        message.success('Đăng nhập thành công');

        const { name, email, role } = response.data;
        localStorage.setItem("isLogged", true);
        localStorage.setItem("User_name", name);
        localStorage.setItem("User_email", email);
        localStorage.setItem("User_role", role);

        const ress = await axios.get('http://localhost:3001/user/cart');
        localStorage.setItem('User_cart', ress.data.length);

        const res2 = await axios.get('http://localhost:3001/user/notice');
        localStorage.setItem('User_notice', JSON.stringify(res2.data));

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        if (response.data.message === 'Tài khoản của bạn đã bị cấm!') {
          await axios.post('http://localhost:3001/auth/log_out');
        }
        message.error(response.data.message);
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
        <Modal
          width={450}
          title="Khôi phục mật khẩu"
          visible={ismodal}
          onCancel={closeModal}
          footer={
            <Button onClick={closeModal}>
              Đóng
            </Button>
          }
        >
          <div style={{ padding: '10px 0' }}>
            <WrapperTextSmall>Email</WrapperTextSmall>
            <Input
              value={femail}
              placeholder="Vui lòng nhập email"
              onChange={(e) => setfemail(e.target.value)}
            />
          </div>
          <Button style={{ width: '100%' }} type="primary" loading={loadingf} onClick={forgetmail}>
            Đặt lại mật khẩu
          </Button>
        </Modal>
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
          <div>
            <div style={{ flexDirection: 'row', display: 'flex', gap: '5px' }}>
              <WrapperTextSmall>Quên mật khẩu?</WrapperTextSmall>
              <Link to="">
                <WrapperTextBlue onClick={openModal}>Khôi phục!</WrapperTextBlue>
              </Link>
            </div>
            <div style={{ flexDirection: 'row', display: 'flex', gap: '5px' }}>
              <WrapperTextSmall>Bạn chưa có tài khoản?</WrapperTextSmall>
              <Link to="/auth/sign_up">
                <WrapperTextBlue>Đăng ký ngay!</WrapperTextBlue>
              </Link>
            </div>
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
