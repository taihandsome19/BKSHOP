import React, { useState } from 'react';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal, Button, Input, Form, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import TableComponent from '../../../components/TableComponent/TableComponent';
import { ButtonComfirm } from './style';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const AdminProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [brands, setBrands] = useState(['Apple', 'Samsung', 'Xiaomi']); // Example brands
  const [newBrand, setNewBrand] = useState('');
  const [colors, setColors] = useState([]);
  const [storages, setStorages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const showModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRowData(null);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddProduct = async (values) => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('imgs', file.originFileObj);
    });

    try {
      const uploadResponse = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrls = uploadResponse.data.fileUrls;

      const variants = values.variants || [];
  
      const quantities = {};
      colors.forEach(color => {
        quantities[color] = {};
        storages.forEach(storage => {
          quantities[color][storage] = 0;
        });
      });

      Object.keys(variants).forEach(key => {
        const variant = variants[key];
        const { color, storage, quantity } = variant;
        if (colors.includes(color) && storages.includes(storage)) {
          quantities[color][storage] = quantity;
        }
      });

      const newProduct = {
        id: Date.now(),
        name: values.name,
        brand: values.brand,
        description: values.description,
        price: values.price,
        colors,
        storages,
        images: imageUrls,
        quantities,
      };

      const response = await axios.post('/api/admin/product/add', newProduct);
      console.log('Response:', response.data);
      setProductData([...productData, newProduct]);
      setIsAddModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleAddBrand = () => {
    if (newBrand && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand]);
      form.setFieldsValue({ brand: newBrand });
      setNewBrand('');
    }
  };

  const handleColorChange = (value) => {
    setColors(value.split(',').map(item => item.trim()));
  };

  const handleStorageChange = (value) => {
    setStorages(value.split(',').map(item => item.trim()));
  };

  const columns = [
    {
      name: 'id',
      label: 'S.No',
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
    { name: 'name', label: 'Tên sản phẩm' },
    { name: 'count', label: 'Số lượng' },
    {
      name: 'action',
      label: 'Hành động',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Button type="primary" onClick={() => showModal(tableMeta.rowData)}>
            Chỉnh sửa
          </Button>
        ),
      },
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Sản phẩm - BKShopMyAdmin</title>
      </Helmet>
      <Container>
        <SlideBarComponent statenow="sanpham" />
        <RightContainer>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FBFCFC', paddingTop: '70px' }}>
            <HeaderComponent />
            <div style={{ flex: '1', padding: '20px 30px' }}>
              <div style={{ display: 'flex', justifyContent: 'end', paddingBottom: '20px' }}>
                <ButtonComfirm onClick={showAddModal}>Thêm sản phẩm</ButtonComfirm>
              </div>
              <TableComponent columns={columns} data={productData} title="Danh sách sản phẩm" />
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
              <Modal
                title="Thêm sản phẩm"
                visible={isAddModalVisible}
                onCancel={handleAddCancel}
                footer={null}
              >
                <Form
                  form={form}
                  onFinish={handleAddProduct}
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 18 }}
                  style={{ margin: '0 auto', maxWidth: '600px' }}
                >
                  <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                    labelAlign="left"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="brand"
                    label="Hãng điện thoại"
                    rules={[{ required: true, message: 'Vui lòng chọn hoặc thêm hãng điện thoại' }]}
                    labelAlign="left"
                  >
                    <Select
                      placeholder="Chọn hãng điện thoại"
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Input
                              style={{ flex: 'auto' }}
                              value={newBrand}
                              placeholder='Thêm hãng mới'
                              onChange={(e) => setNewBrand(e.target.value)}
                            />
                            <Button type="link" onClick={handleAddBrand}>
                              Thêm
                            </Button>
                          </div>
                        </>
                      )}
                    >
                      {brands.map((brand) => (
                        <Option key={brand} value={brand}>
                          {brand}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="decription"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    labelAlign="left"
                  >
                    <TextArea minRows="3" maxRows="5" />
                  </Form.Item>
                  <Form.Item
                    name="price"
                    label="Giá tiền"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
                    labelAlign="left"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="color"
                    label="Màu sắc"
                    rules={[{ required: true, message: 'Vui lòng thêm màu sắc' }]}
                    labelAlign="left"
                  >
                    <Input
                      placeholder="Nhập mỗi loại cách nhau dấu phẩy"
                      autoSize={{ minRows: 1, maxRows: 2 }}
                      onBlur={(e) => handleColorChange(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="storage"
                    label="Dung lượng"
                    rules={[{ required: true, message: 'Vui lòng thêm dung lượng' }]}
                    labelAlign="left"
                  >
                    <Input
                      placeholder="Nhập mỗi loại cách nhau dấu phẩy"
                      autoSize={{ minRows: 1, maxRows: 2 }}
                      onBlur={(e) => handleStorageChange(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="images"
                    label="Hình ảnh"
                    labelAlign="left"
                  >
                    <Upload
                      multiple
                      listType="picture"
                      fileList={fileList}
                      onChange={({ fileList }) => setFileList(fileList)}
                      beforeUpload={() => false}  // Prevent automatic upload
                    >
                      <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                    </Upload>
                  </Form.Item>
                  <Form.List name="variants">
                    {(fields, { add, remove }) => (
                      <>
                        {colors.map(color => (
                          storages.map(storage => (
                            <div key={`${color}-${storage}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Form.Item
                                name={[`${color}-${storage}`, 'color']}
                                initialValue={color}
                                style={{ flex: 1, marginRight: 8 }}
                              >
                                <Input value={color} disabled style={{ width: '151.8px' }} />
                              </Form.Item>
                              <Form.Item
                                name={[`${color}-${storage}`, 'storage']}
                                initialValue={storage}
                                style={{ flex: 1, marginRight: 8 }}
                              >
                                <Input value={storage} disabled style={{ width: '151.8px' }} />
                              </Form.Item>
                              <Form.Item
                                name={[`${color}-${storage}`, 'quantity']}
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                style={{ flex: 1, marginRight: 8 }}
                              >
                                <Input placeholder="Số lượng" style={{ width: '151.8px' }} />
                              </Form.Item>
                            </div>
                          ))
                        ))}
                      </>
                    )}
                  </Form.List>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" block>
                      Thêm
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', backgroundColor: '#FBFCFC' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#6f6f6f' }}>© 2024 BkShopMyAdmin V1.0</div>
            </div>
          </div>
        </RightContainer>
      </Container>
    </HelmetProvider>
  );
};

export default AdminProduct;
