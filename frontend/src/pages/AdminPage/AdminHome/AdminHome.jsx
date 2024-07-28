import React from 'react';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import { CardInfo } from './style';
import member from '../../../assets/images/admin/member.png';
import coin from '../../../assets/images/admin/finance.png';
import order from '../../../assets/images/admin/order.png';
import delivered from '../../../assets/images/admin/delivered.png';
import ApexChart from './ApexChart';
import Number from './Number';

const AdminHome = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Trang chủ - BKShopMyAdmin</title>
      </Helmet>
      <Container>
        <SlideBarComponent statenow="bangdieukhien" />
        <RightContainer>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FBFCFC' }}>
            <HeaderComponent />
            <div style={{ flex: '1', paddingTop: '90px', paddingLeft: '30px', paddingRight: '30px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <CardInfo>
                  <img src={member} alt='member' width="80px" />
                  <Number title="Khách hàng" value={10} duration={1000} />
                </CardInfo>
                <CardInfo>
                  <img src={coin} alt='member' width="80px" />
                  <Number title="Doanh thu" value={90000000} duration={1000}/>
                </CardInfo>
                <CardInfo>
                  <img src={order} alt='member' width="80px" />
                  <Number title="Đơn hàng" value={20} duration={1000} />
                </CardInfo>
                <CardInfo>
                  <img src={delivered} alt='member' width="80px" />
                  <Number title="Đã giao" value={18} duration={1000} />
                </CardInfo>
              </div>
              <div style={{ padding: '20px 0' }}>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '20px', color: '#2A3546', fontWeight: 'bold', paddingLeft: '20px', paddingBottom: '20px' }}>Tổng quan bán hàng</div>
                  <ApexChart />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', backgroundColor: '#FBFCFC' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: "#6f6f6f" }}>© 2024 BkShopMyAdmin V1.0</div>
            </div>
          </div>
        </RightContainer>
      </Container>
    </HelmetProvider>
  )
}

export default AdminHome;
