import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  KeyOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  SaveOutlined
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
  WrapperCardInfo,
  WrapperTitle,
  WrapperTextInfo,
  WrapperInfoBox,
  WrapperContainer,
  EditButton,
  WrapperTitleRow
} from "./style";
import avt from "../../../assets/images/avt.png";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Input, message, Spin } from 'antd';
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
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [datainfo, setDataInfo] = useState({});
  const [name, setname] = useState('');
  const [address, setaddress] = useState('');
  const [date_of_birth, setdate_of_birth] = useState('');
  const [email, setemail] = useState('');
  const [phonenum, setphonenum] = useState('');
  const [sex, setsex] = useState('');


  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/user/info`);
        if (res.data && res.data.infor) {
          setDataInfo(res.data);
          setname(res.data.infor.name);
          setemail(res.data.infor.email);
          setphonenum(res.data.infor.phonenum);
          setsex(res.data.infor.sex);
          setdate_of_birth(res.data.infor.date_of_birth);
          setaddress(res.data.infor.address);
          setLoading(false);
        } else {
          message.error('Lỗi khi lấy thông tin sản phẩm');
        }
      } catch (error) {
        message.error('Lỗi khi lấy thông tin khách hàng');
      }
    };
    fetchData();
  }, []);

  const toggleEdit = async () => {
    if (!editable) {
      // Chỉnh sửa
      setEditable(true);
    } else {
      if (name === '' || email === '' || phonenum === ''
        || address === '' || date_of_birth === '' || sex === ''
      ) {
        message.error("Vui lòng điền đầy đủ thông tin");
        return;
      } else if (name.length > 21) {
        message.error("Tên không được dài quá 21 ký tự");
        return;
      } else if (phonenum.length < 10) {
        message.error("Số điện thoại không hợp lệ");
        return;
      }
      localStorage.setItem('User_name', name);

      try {
        const data = {
          name,
          email: 'tai2@hcmut.edu.vn',
          sex,
          address,
          date_of_birth,
          phonenum
        }
        const res = await axios.post('http://localhost:3001/user/updateInfo', data);
        if (res.data && res.data.status === true) {
          message.success("Thay đổi thông tin thành công");
        } else {
          message.error("Thay đổi thông tin thất bại");
        }
      } catch (error) {
        message.error("Thay đổi thông tin thất bại");
      }

      setEditable(false);
    }

  };


  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      />
    );
  }

  return (
    <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Helmet>
        <title>Tài khoản của bạn - BKSHOP</title>
      </Helmet>
      <WrapperPage>
        <WrapperBox>
          <WrapperNavbar>
            <Link to={'/user'} style={{ textDecoration: "none" }}>
              <WrapperBoxText>
                <HomeOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
                <WrapperTextNav>Trang chủ</WrapperTextNav>
              </WrapperBoxText>
            </Link>

            <WrapperBoxTextMain>
              <UserOutlined style={{ fontSize: "20px", color: "#0688B4" }} />
              <WrapperTextNavMain>Tài khoản của bạn</WrapperTextNavMain>
            </WrapperBoxTextMain>
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
            <WrapperBoxText style={{ cursor: 'pointer' }} onClick={handleLogout}>
              <LogoutOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Thoát tài khoản</WrapperTextNav>
            </WrapperBoxText>
          </WrapperNavbar>
          <WrapperRight>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <div style={{ width: "100px" }}>
                <WrapperAvatar src={avt} alt="User Avatar" preview={false} />
              </div>
              <WrapperTextAvt >
                <WrapperName>{datainfo.infor.name}</WrapperName>
                <WrapperText>{datainfo.infor.email}</WrapperText>
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
            <WrapperCardInfo>
              <WrapperTitleRow>
                <WrapperTitle>
                  THÔNG TIN CÁ NHÂN
                </WrapperTitle>
                <EditButton isEditing={editable} onClick={toggleEdit}>
                  {editable ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <SaveOutlined /> Lưu
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <EditOutlined /> Chỉnh sửa
                    </div>
                  )}
                </EditButton>
              </WrapperTitleRow>
              <WrapperInfoBox>
                <WrapperContainer>
                  <WrapperTextInfo>Họ và tên</WrapperTextInfo>
                  <Input defaultValue={name} disabled={!editable} onBlur={(e) => setname(e.target.value)} />
                  <WrapperTextInfo>Giới tính</WrapperTextInfo>
                  <Input defaultValue={sex} placeholder={sex ? sex : "Chưa có giới tính"} disabled={!editable} onBlur={(e) => setsex(e.target.value)} />
                  <WrapperTextInfo>Ngày sinh</WrapperTextInfo>
                  <Input defaultValue={date_of_birth} placeholder={date_of_birth ? date_of_birth : "Chưa có ngày sinh"} disabled={!editable} onBlur={(e) => setdate_of_birth(e.target.value)} />
                </WrapperContainer>
                <WrapperContainer>
                  <WrapperTextInfo>Địa chỉ mail</WrapperTextInfo>
                  <Input defaultValue={email} disabled={true} />
                  <WrapperTextInfo>Địa chỉ nhận hàng</WrapperTextInfo>
                  <Input defaultValue={address} placeholder={address ? address : "Chưa có địa chỉ nhận hàng"} disabled={!editable} onBlur={(e) => setaddress(e.target.value)} />
                  <WrapperTextInfo>Số điện thoại</WrapperTextInfo>
                  <Input defaultValue={phonenum} placeholder={phonenum ? phonenum : "Chưa có số điện thoại"} disabled={!editable} onBlur={(e) => setphonenum(e.target.value)} />
                </WrapperContainer>
              </WrapperInfoBox>
            </WrapperCardInfo>
          </WrapperRight>
        </WrapperBox>
      </WrapperPage>
    </div>
  );
};

export default UserPage;
