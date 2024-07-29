import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal, Button, message, Spin, Select } from 'antd';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import TableComponent from '../../../components/TableComponent/TableComponent';

const { Option } = Select;

const AdminUser = () => {
  const selectdata = ["Cấm tài khoản", "Hoạt động"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [btloading, setbtLoading] = useState(false);

  const fetchData = () => {
    axios.get('http://localhost:3001/admin/manage_user')
      .then(response => {
        const formattedData = response.data.map((item, index) => [
          (index + 1).toString(),
          item.name,
          item.email,
          item.sex,
          item.date_of_birth,
          item.phonenum,
          item.address,
          true
        ]);
        setData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        message.error('Lỗi không lấy được dữ liệu!');
        setLoading(false);
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const showModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalVisible(true);
    setSelectedValue('hihi');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRowData(null);
    setSelectedValue('');
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const showConfirmModal = () => {
    
    setIsConfirmModalVisible(true);
  };

  const handleUpdate = async (orderId) => {
    return;
    setbtLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/admin/update_order', { orderId, status: selectedValue });
      if (res.data && res.data.status === true) {
        fetchData();
        message.success("Cập nhật trạng thái thành công");
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

  const handleConfirmOk = () => {
    handleUpdate(selectedRowData[0]);
    setIsConfirmModalVisible(false);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
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
    { name: 'sex', label: 'Giới tính' },
    { name: 'birthday', label: 'Ngày sinh' },
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
            Chi tiết
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
      <Modal
        centered
        title="Xác nhận cập nhật"
        visible={isConfirmModalVisible}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        width={400}
      >
        <p>
          {`Bạn có muốn cập nhật trạng thái đơn hàng từ `}
          <strong>{selectedRowData ? selectedRowData[5] : 0}</strong>
          {` thành `}
          <strong>{selectedValue}</strong>
          {` không?`}
        </p>

      </Modal>
      <Container>
        <SlideBarComponent statenow="khachhang" />
        <RightContainer>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FBFCFC', paddingTop: '70px' }}>
            <HeaderComponent />
            <div style={{ flex: '1', padding: '20px 30px' }}>
              <TableComponent columns={columns} data={data} title="Danh sách khách hàng" />
              <Modal
                centered
                title="Thông tin khách hàng"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                  <Button loading={btloading} type='primary' key="update" onClick={showConfirmModal}>
                    Cập nhật
                  </Button>,
                  <Button key="close" onClick={handleCancel}>
                    Đóng
                  </Button>,
                ]}
              >
                {selectedRowData && (
                  <div>
                    <p><strong>Họ và tên:</strong> {selectedRowData[1]}</p>
                    <p><strong>Địa chỉ mail:</strong> {selectedRowData[2]}</p>
                    <p><strong>Giới tính:</strong> {selectedRowData[3]}</p>
                    <p><strong>Ngày sinh:</strong> {selectedRowData[4]}</p>
                    <p><strong>Số điện thoại:</strong> {selectedRowData[5]}</p>
                    <p><strong>Địa chỉ:</strong> {selectedRowData[6]}</p>
                    <p>
                      <strong>Trạng thái:</strong>
                      <Select value={selectedValue} style={{ paddingLeft: '10px', width: '180px' }} onChange={handleChange}>
                        {selectdata.map((status, index) => (
                          <Option key={status} value={status}
                            disabled={
                              (index < selectdata.indexOf(selectedRowData[5])) ||
                              (status === "Đã huỷ" && !["Chờ xác nhận", "Đã xác nhận", "Đã huỷ"].includes(selectedRowData[5]))
                            }
                          >
                            {status}
                          </Option>
                        ))}
                      </Select>
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

export default AdminUser;
