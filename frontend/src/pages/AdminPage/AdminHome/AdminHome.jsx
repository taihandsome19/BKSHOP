import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { message, Spin } from 'antd';

const AdminHome = () => {
  const [datastatistical, setdatastatistical] = useState({});
  const [dataorder, setdataorder] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);

    // Check quyền admin
    try {
      const res = await axios.get('http://localhost:3001/user/info')
      if(res.data && res.data.role !== 'admin'){
        window.location.href = '/404';
      }
    }catch(error){
      window.location.href = '/404';
    }

    Promise.all([
      axios.get('http://localhost:3001/admin/report'),
      axios.get('http://localhost:3001/admin/report_order')
    ])
      .then(([reportResponse, orderResponse]) => {
        if (reportResponse.data && reportResponse.data.status === true) {
          setdatastatistical(reportResponse.data);
        } else {
          message.error('Lỗi không lấy được dữ liệu báo cáo!');
        }
        if (orderResponse.data && orderResponse.data.status === true) {
          setdataorder(orderResponse.data);
          setLoading(false);
        } else {
          message.error('Lỗi không lấy được dữ liệu đơn hàng!');
        }
      })
      .catch(error => {
        message.error('Lỗi không lấy được dữ liệu!');
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllData();
  }, []);



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
              {loading ? (
                <Spin
                  size="large"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
                />
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <CardInfo>
                      <img src={member} alt='member' width="80px" />
                      <Number title="Khách hàng" value={datastatistical.result?.total_of_user} duration={1000} />
                    </CardInfo>
                    <CardInfo>
                      <img src={coin} alt='member' width="80px" />
                      <Number title="Doanh thu" value={datastatistical.result?.total_of_revenue} duration={1000} />
                    </CardInfo>
                    <CardInfo>
                      <img src={order} alt='member' width="80px" />
                      <Number title="Đơn hàng" value={datastatistical.result?.total_of_order} duration={1000} />
                    </CardInfo>
                    <CardInfo>
                      <img src={delivered} alt='member' width="80px" />
                      <Number title="Đã giao" value={datastatistical.result?.total_of_delivery} duration={1000} />
                    </CardInfo>
                  </div>
                  <div style={{ padding: '20px 0' }}>
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '20px', color: '#2A3546', fontWeight: 'bold', paddingLeft: '20px', paddingBottom: '20px' }}>Tổng quan bán hàng</div>
                      <ApexChart
                        order={dataorder.status === true ? dataorder.reportOrder.order : []}
                        revenue={dataorder.status === true ? dataorder.reportOrder.revenue : []}
                        date={dataorder.status === true ? dataorder.reportOrder.date : []}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', backgroundColor: '#FBFCFC' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: "#6f6f6f" }}>© 2024 BkShopMyAdmin V1.0</div>
            </div>
          </div>
        </RightContainer>
      </Container>
    </HelmetProvider>
  );
};

export default AdminHome;
