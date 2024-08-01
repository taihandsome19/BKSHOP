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
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [rowdata, setrowdata] = useState({});
  const [fulldata, setfulldata] = useState({});


  const fetchData = () => {
    axios.get('http://localhost:3001/admin/manage_order')
      .then(response => {
        const formattedData = response.data.result.map((item) => [
          item.orderId,
          item.user_name,
          item.email,
          item.orderDate,
          item.productList.reduce((total, product) => total + product.quantity, 0),
          parseInt(item.totalPrice).toLocaleString('vi-VN') + 'đ',
          item.order_status,
          item.productList
        ]);
        setData(formattedData);
        const full = response.data.result.reduce((acc, item) => {
          acc[item.orderId] = item;
          return acc;
        }, {});
        setfulldata(full);
        setLoading(false);
      })
      .catch(error => {
        console.log(error)
        message.error('Lỗi không lấy được dữ liệu!');
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const showModal = (rowData) => {
    setSelectedRowData(rowData);
    setSelectedValue(rowData[5]);
    setIsModalVisible(true);
    setrowdata(fulldata[rowData[0]])
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRowData(null);
    setSelectedValue('');
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleUpdate = async (orderId) => {
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

  const updatepay = async (orderId) => {
    try {
      await axios.post('http://localhost:3001/admin/update_payment', { orderId, status: true });
    } catch (error) {
    }
  }

  const addnotice = async (uid, mess) => {
    try {
      await axios.post('http://localhost:3001/admin/add_notice', { userId: uid, notice: mess });
    } catch (error) {
    }
  }

  const showConfirmModal = () => {
    if (selectdata.indexOf(selectedValue) === selectdata.indexOf(selectedRowData[6])) {
      message.error("Bạn chưa thay đổi trạng thái khác!");
      return;
    }
    setIsConfirmModalVisible(true);
  };

  const handleConfirmOk = () => {
    handleUpdate(selectedRowData[0]);
    selectedRowData[6] = selectedValue;
    const mess = `Đơn hàng #${selectedRowData[0]} của bạn đã chuyển sang trạng thái ${selectedValue.toLowerCase()}`;
    addnotice(rowdata.userId, mess);
    if (selectedValue === "Đã giao hàng") {
      updatepay(selectedRowData[0]);
      rowdata.payment_status = true;
    }
    setIsConfirmModalVisible(false);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

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
    { name: 'email', label: 'Địa chỉ mail' },
    { name: 'date', label: 'Ngày đặt' },
    { name: 'count', label: 'Số lượng' },
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

  return (
    <HelmetProvider>
      <Helmet>
        <title>Đơn hàng - BKShopMyAdmin</title>
      </Helmet>
      <Container>
        <SlideBarComponent statenow="donhang" />

        {loading ? (
          <RightContainer>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FBFCFC', paddingTop: '70px' }}>
              <HeaderComponent />
              <Spin
                size="large"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
              />
            </div>
          </RightContainer>
        ) : (
          <RightContainer>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FBFCFC', paddingTop: '70px' }}>
              <HeaderComponent />
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
                  <strong>{selectedRowData ? selectedRowData[6] : 0}</strong>
                  {` thành `}
                  <strong>{selectedValue}</strong>
                  {` không?`}
                </p>

              </Modal>
              <div style={{ flex: '1', padding: '20px 30px' }}>
                <TableComponent columns={columns} data={data} title="Danh sách đơn hàng" />
                <Modal
                  centered
                  title="Thông tin chi tiết"
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
                      <p><strong>Mã đơn hàng</strong> {selectedRowData[0]}</p>
                      <p><strong>Ngày đặt hàng:</strong> {selectedRowData[2]}</p>
                      <p><strong>Tên người mua:</strong> {selectedRowData[1]}</p>
                      <p><strong>Địa chỉ mail:</strong>{rowdata.email}</p>
                      <p><strong>Tổng số lượng:</strong> {selectedRowData[4]}</p>
                      <p><strong>Tổng tiền:</strong> {selectedRowData[5]}</p>
                      <p style={{ display: 'flex', gap: '5px' }}>
                        <strong>Đã Thanh toán:</strong>
                        {rowdata.payment_status ? (
                          <div style={{ color: '#54D62B' }}>
                            {selectedRowData[5]}
                          </div>
                        ) : (
                          <div style={{ color: '#ff4f4e' }}>
                            0đ
                          </div>
                        )}
                        <div> ({rowdata.payment_method})</div>
                      </p>
                      <p>
                        <strong>Trạng thái:</strong>
                        <Select value={selectedValue} style={{ paddingLeft: '10px', width: '180px' }} onChange={handleChange}>
                          {selectdata.map((status, index) => (
                            <Option key={status} value={status}
                              disabled={
                                (index < selectdata.indexOf(selectedRowData[6])) ||
                                (status === "Đã huỷ" && !["Chờ xác nhận", "Đã xác nhận", "Đã huỷ"].includes(selectedRowData[6]))
                              }
                            >
                              {status}
                            </Option>
                          ))}
                        </Select>
                      </p>
                      <p>
                        <strong>Danh sách sản phẩm:</strong>
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {selectedRowData[7].map(item => {
                          return (
                            <div style={{ height: '80px', border: '1px solid #d9d9d9', borderRadius: '8px', margin: '10px', display: 'flex', alignContent: 'center', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                  src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${item.image}?alt=media`}
                                  alt="icon"
                                  style={{ width: '80%', height: '80%', objectFit: 'cover' }}
                                />
                              </div>
                              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#444' }}>
                                  {item.name_product}
                                </div>
                                <div style={{ fontSize: '10px' }}>
                                  Màu sắc: {item.color}, Dung lượng: {item.memorySize}
                                </div>
                                <div style={{ fontSize: '10px' }}>
                                  Số lượng: {item.quantity}
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0688B4' }}>
                                  {parseInt(item.price).toLocaleString('vi-VN')}đ
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </Modal>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', backgroundColor: '#FBFCFC' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: "#6f6f6f" }}>© 2024 BkShopMyAdmin V1.0</div>
              </div>
            </div>
          </RightContainer>
        )}
      </Container>
    </HelmetProvider>
  );
};

export default AdminOrder;
