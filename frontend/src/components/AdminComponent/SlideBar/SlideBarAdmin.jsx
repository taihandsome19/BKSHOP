import React from 'react';
import { SlideBarContainer } from '../style';
import { WrapperButton } from './style';
import { AppstoreOutlined, TeamOutlined, ShoppingOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SlideBarAdmin = ({ statenow }) => {
  return (
    <SlideBarContainer>
      <div style={{ display: 'flex', justifyContent: 'center', height: '70px', alignItems: 'center' }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: '#12142D' }}>
          BKShopMyAdmin
        </div>
      </div>
      <div style={{ padding: '0 20px', height: '100vh' }}>
        <div style={{ paddingTop: '30px', fontSize: '15px', fontWeight: 'bold', color: '#2A3546', paddingLeft: '10px', paddingBottom: '5px' }}>
          TRANG CHỦ
        </div>
        <Link to="/admin" style={{textDecoration: "none" }}>
        <WrapperButton isSelected={statenow === 'bangdieukhien'}>
          <AppstoreOutlined style={{ fontSize: '17px' }} />
          <div>Bảng điều khiển</div>
        </WrapperButton>
        </Link>
        <div style={{ paddingTop: '20px', fontSize: '15px', fontWeight: 'bold', color: '#2A3546', paddingLeft: '10px', paddingBottom: '10px' }}>
          QUẢN LÝ HỆ THỐNG
        </div>
        <Link to="/admin/member" style={{textDecoration: "none" }}>
        <WrapperButton isSelected={statenow === 'khachhang'}>
          <TeamOutlined style={{ fontSize: '17px' }} />
          <div>Khách hàng</div>
        </WrapperButton>
        </Link>
        <Link to="/admin/product" style={{textDecoration: "none" }}>
        <WrapperButton isSelected={statenow === 'sanpham'}>
          <CreditCardOutlined style={{ fontSize: '17px' }} />
          <div>Sản phẩm</div>
        </WrapperButton>
        </Link>
        <Link to="/admin/order" style={{textDecoration: "none" }}>
        <WrapperButton isSelected={statenow === 'donhang'}>
          <ShoppingOutlined style={{ fontSize: '17px' }} />
          <div>Đơn hàng</div>
        </WrapperButton>
        </Link>
      </div>
    </SlideBarContainer>
  );
}

export default SlideBarAdmin;