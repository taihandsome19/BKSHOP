import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal, Button, message, Spin, Select } from 'antd';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import TableComponent from '../../../components/TableComponent/TableComponent';

const { Option } = Select;

const AdminOrder = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectdata = ["Chờ xác nhận", "Đã xác nhận", "Đang vận chuyển", "Đã giao hàng", "Đã huỷ"];
  const [selectedValue, setSelectedValue] = useState('');
  const [btloading, setbtLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('http://localhost:3001/admin/manage_order')
      .then(response => {

        const formattedData = response.data.map((item) => [
          item.orderId,
          item.name,
          item.email,
          item.productList.reduce((total, product) => total + product.quantity, 0),
          parseInt(item.totalPrice).toLocaleString('vi-VN') + 'đ',
          item.status,
          item.productList
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

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleUpdate = async(orderId) => {
    setbtLoading(true);
    if(selectedValue === ""){
      setTimeout(() => {
        setbtLoading(false);
      }, 500);
    }else{
      try {
        const res = await axios.post('http://localhost:3001/admin/update_order', { orderId, status: selectedValue });
        if (res.data && res.data.status === true) {
          message.success("Cập nhật trạng thái thành công")
          setbtLoading(false);
        } else {
          message.error("Cập nhật trạng thái thất bại")
          setbtLoading(false);
        }
      } catch (error) {
        message.error("Cập nhật trạng thái thất bại")
        setbtLoading(false);
      }
    }
  }

  const columns = [
    {
      name: "id",
      label: "Mã đơn hàng",
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
    { name: 'name', label: 'Tên người mua' },
    { name: 'email', label: 'Địa chỉ mail ' },
    { name: 'count', label: 'Tổng số lượng' },
    { name: 'price', label: 'Tổng tiền' },
    { name: 'state', label: 'Trạng thái' },
    {
      name: 'action',
      label: 'Hành động',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Button
            type="primary"
            onClick={() => showModal(tableMeta.rowData)}
          >
            Cập nhật
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
        <title>Đơn hàng - BKShopMyAdmin</title>
      </Helmet>
      <Container>
        <SlideBarComponent statenow="donhang" />
        <RightContainer>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FBFCFC', paddingTop: '70px' }}>
            <HeaderComponent />
            <div style={{ flex: '1', padding: '20px 30px' }}>
              <TableComponent columns={columns} data={data} title="Danh sách đơn hàng" />
              <Modal
                title="Thông tin chi tiết"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                  <Button loading={btloading} type='primary' key="update" onClick={() => handleUpdate(selectedRowData[0])}>
                    Cập nhật
                  </Button>,
                  <Button key="close" onClick={handleCancel}>
                    Close
                  </Button>,
                ]}
              >
                {selectedRowData && (
                  <div>
                    <p><strong>Mã đơn hàng</strong> {selectedRowData[0]}</p>
                    <p><strong>Tên người mua:</strong> {selectedRowData[1]}</p>
                    <p><strong>Địa chỉ mail:</strong> {selectedRowData[2]}</p>
                    <p><strong>Tổng số lượng:</strong> {selectedRowData[3]}</p>
                    <p><strong>Tổng tiền:</strong> {selectedRowData[4]}</p>
                    <p>
                      <strong>Trạng thái:</strong>
                      <Select defaultValue={selectedRowData[5]} style={{ paddingLeft: '10px', width: '180px' }} onChange={handleChange}>
                        {selectdata.map(status => (
                          <Option key={status} value={status}>
                            {status}
                          </Option>
                        ))}
                      </Select>
                    </p>
                    <p>
                      <strong>Danh sách sản phẩm:</strong>
                    </p>
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

export default AdminOrder;
