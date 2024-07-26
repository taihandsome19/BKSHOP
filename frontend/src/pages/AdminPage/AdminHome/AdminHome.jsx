import React, {useEffect, useState} from 'react';
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
import CheckAdmin from '../AdminProtect/AdminProtect';
import { useNavigate } from 'react-router-dom';


const AdminHome = () => {
  const [isAd, setisAd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const checkAdmin = async () => {
          const isAdmin = await CheckAdmin.isAdmin();
          if (isAdmin) {;
              setisAd(true);
          } else {
              navigate('/404');
          }
      };
      checkAdmin();
  }, [navigate]);

  if(!isAd){
    return;
  }


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
                  <div>
                    <div style={{ fontSize: '19px', color: '#2A3546', fontWeight: 'bold' }}>Khách hàng</div>
                    <div style={{ fontSize: '13px', color: '#444', paddingTop: '10px' }}>1234 khách hàng</div>
                  </div>
                </CardInfo>
                <CardInfo>
                  <img src={coin} alt='member' width="80px" />
                  <div>
                    <div style={{ fontSize: '19px', color: '#2A3546', fontWeight: 'bold' }}>Doanh thu</div>
                    <div style={{ fontSize: '13px', color: '#444', paddingTop: '10px' }}>8.000.000đ</div>
                  </div>
                </CardInfo>
                <CardInfo>
                  <img src={order} alt='member' width="80px" />
                  <div>
                    <div style={{ fontSize: '19px', color: '#2A3546', fontWeight: 'bold' }}>Đơn hàng</div>
                    <div style={{ fontSize: '13px', color: '#444', paddingTop: '10px' }}>1000 đơn hàng</div>
                  </div>
                </CardInfo>
                <CardInfo>
                  <img src={delivered} alt='member' width="80px" />
                  <div>
                    <div style={{ fontSize: '19px', color: '#2A3546', fontWeight: 'bold' }}>Đã giao</div>
                    <div style={{ fontSize: '13px', color: '#444', paddingTop: '10px' }}>980 đơn hàng</div>
                  </div>
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
