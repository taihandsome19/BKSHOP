import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal, Button, message, Spin } from 'antd';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import TableComponent from '../../../components/TableComponent/TableComponent';

const AdminUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('http://localhost:3001/admin/manage_user')
      .then(response => {
        const formattedData = response.data.map((item, index) => [
          (index + 1).toString(),
          item.name,
          item.email,
          item.phone
        ]);
        setData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        message.error('Lỗi không lấy được dữ liệu!');
        setLoading(false);
      });
  }, []);

  const showModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRowData(null);
  };

  const columns = [
    {
      name: "id",
      label: "S.No",
      options: {
        sortCompare: (order) => {
          return (a, b) => {
            const numberA = parseInt(a.data, 10);
            const numberB = parseInt(b.data, 10);

            if (numberA < numberB) {
              return order === 'asc' ? -1 : 1;
            }
            if (numberA > numberB) {
              return order === 'asc' ? 1 : -1;
            }
            return 0;
          };
        },
      },
    },
    { name: 'name', label: 'Họ và tên' },
    { name: 'email', label: 'Địa chỉ mail' },
    { name: 'phone', label: 'Số điện thoại' },
    {
      name: 'action',
      label: 'Hành động',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Button
            type="primary"
            onClick={() => showModal(tableMeta.rowData)}
          >
            Xem đơn hàng
          </Button>
        ),
      },
    },
  ];

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      />
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Khách hàng - BKShopMyAdmin</title>
      </Helmet>
      <Container>
        <SlideBarComponent statenow="khachhang" />
        <RightContainer>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FBFCFC', paddingTop: '70px' }}>
            <HeaderComponent />
            <div style={{ flex: '1', padding: '20px 30px' }}>
              <TableComponent columns={columns} data={data} title="Danh sách khách hàng" />
              <Modal
                title="Danh sách đơn hàng"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                  <Button key="close" onClick={handleCancel}>
                    Close
                  </Button>,
                ]}
              >
                {selectedRowData && (
                  <div>
                    <p><strong>Họ và tên:</strong> {selectedRowData[1]}</p>
                    <p><strong>Địa chỉ mail:</strong> {selectedRowData[2]}</p>
                  </div>
                )}
              </Modal>
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

export default AdminUser;
