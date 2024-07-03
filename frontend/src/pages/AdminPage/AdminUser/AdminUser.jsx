import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal, Button } from 'antd';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import TableComponent from '../../../components/TableComponent/TableComponent';

const AdminUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://gist.githubusercontent.com/diondree/92e4518ca7529e1f4d1300993e5cc287/raw/5e689bb33a11a2e55cb11e6f413ddea14c4be804/mock-data-10000.json')
      .then(response => {
        // Map the data to fit your table format
        const formattedData = response.data.slice(0, 2000).map((item, index) => [
          (index + 1).toString(),
          item.first_name,
          item.last_name,
          item.email,
          item._id,
        ]);
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
    { name: 'sex', label: 'Giới tính' },
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
            Đơn hàng
          </Button>
        ),
      },
    },
  ];

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
                title="Thông tin chi tiết"
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
                    <p><strong>S.No:</strong> {selectedRowData[0]}</p>
                    <p><strong>Họ và tên:</strong> {selectedRowData[1]}</p>
                    <p><strong>Giới tính:</strong> {selectedRowData[2]}</p>
                    <p><strong>Địa chỉ mail:</strong> {selectedRowData[3]}</p>
                    <p><strong>Số điện thoại:</strong> {selectedRowData[4]}</p>
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
