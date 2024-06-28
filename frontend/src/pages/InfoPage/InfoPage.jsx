import React, { useState } from 'react';
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
  WrapperButtonEdit,
  WrapperButtonSave,
  WrapperTitleRow
} from "./style";
import avt from "../../assets/images/avt.png";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Input } from 'antd';

const UserPage = () => {
  const [editable, setEditable] = useState(false);

  const toggleEdit = () => {
    setEditable(!editable);
  };

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

            <WrapperBoxText>
              <ShopOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Lịch sử mua hàng</WrapperTextNav>
            </WrapperBoxText>
            <WrapperBoxText>
              <KeyOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Thay đổi mật khẩu</WrapperTextNav>
            </WrapperBoxText>
            <WrapperBoxText>
              <QuestionCircleOutlined style={{ fontSize: "20px", color: "#6f6f6f" }} />
              <WrapperTextNav>Hỗ trợ</WrapperTextNav>
            </WrapperBoxText>
            <WrapperBoxText>
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
            <WrapperCardInfo>
              <WrapperTitleRow>
                <WrapperTitle>
                  THÔNG TIN CÁ NHÂN
                </WrapperTitle>
                <div>
                  <WrapperButtonEdit type="primary" icon={<EditOutlined />} size={10} onClick={toggleEdit}>
                    Chỉnh sửa
                  </WrapperButtonEdit>
                  <WrapperButtonSave type="primary" icon={<SaveOutlined />} size={10}>
                    Lưu
                  </WrapperButtonSave>
                </div>
              </WrapperTitleRow>
              <WrapperInfoBox>
                <WrapperContainer>
                  <WrapperTextInfo>Họ và tên</WrapperTextInfo>
                  <Input placeholder="Trần Thành Tài" disabled={!editable} />
                  <WrapperTextInfo>Giới tính</WrapperTextInfo>
                  <Input placeholder="Nam" disabled={!editable} />
                  <WrapperTextInfo>Ngày sinh</WrapperTextInfo>
                  <Input placeholder="Ngày sinh" disabled={!editable} />
                </WrapperContainer>
                <WrapperContainer>
                  <WrapperTextInfo>Địa chỉ mail</WrapperTextInfo>
                  <Input placeholder="tai.tranthanh@hcmut.edu.vn" disabled={!editable} />
                  <WrapperTextInfo>Địa chỉ nhận hàng</WrapperTextInfo>
                  <Input placeholder="Địa chỉ nhận hàng" disabled={!editable} />
                  <WrapperTextInfo>Số điện thoại</WrapperTextInfo>
                  <Input placeholder="Số điện thoại" disabled={!editable} />
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
