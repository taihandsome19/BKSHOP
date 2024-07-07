import React, { useState } from 'react';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal, Button, Input, Form, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import TableComponent from '../../../components/TableComponent/TableComponent';
import { ButtonComfirm } from './style';

const { Option } = Select;

const AdminProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [brands, setBrands] = useState(['Apple', 'Samsung', 'Xiaomi']); // Example brands
  const [newBrand, setNewBrand] = useState('');
  const [colorsAdded, setColorsAdded] = useState(false);
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

  const handleAddProduct = (values) => {
    const newProduct = {
      id: productData.length + 1,
      name: values.name,
      brand: values.brand,
      colors: values.colors.map((colorObj) => ({
        color: colorObj.color,
        image: colorObj.image.file,
        details: colorObj.details.map(detail => ({
          storage: detail.storage,
          quantity: detail.quantity
        }))
      }))
    };
    setProductData([...productData, newProduct]);
    setIsAddModalVisible(false);
    form.resetFields();
    setColorsAdded(false);
  };

  const handleAddBrand = () => {
    if (newBrand && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand]);
      form.setFieldsValue({ brand: newBrand });
      setNewBrand('');
    }
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
                    name="color"
                    label="Màu sắc"
                    rules={[{ required: true, message: 'Vui lòng thêm màu sắc' }]}
                    labelAlign="left"
                  >
                    <Input
                      placeholder="Nhập mỗi loại cách nhau dấu phẩy"
                      autoSize={{ minRows: 1, maxRows: 2 }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="storge"
                    label="Dung lượng"
                    rules={[{ required: true, message: 'Vui lòng thêm dung lượng' }]}
                    labelAlign="left"
                  >
                    <Input
                      placeholder="Nhập mỗi loại cách nhau dấu phẩy"
                      autoSize={{ minRows: 1, maxRows: 2 }}
                    />
                  </Form.Item>

                  <Form.List name="colors">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <div
                            key={field.key}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, 'color']}
                              fieldKey={[field.fieldKey, 'color']}
                              rules={[{ required: true, message: 'Vui lòng nhập màu sắc' }]}
                              style={{ flex: 1, marginRight: 8 }}
                              labelAlign="left"
                            >
                              <Input placeholder="Màu sắc" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, 'image']}
                              fieldKey={[field.fieldKey, 'image']}
                              rules={[{ required: true, message: 'Vui lòng upload hình ảnh' }]}
                              valuePropName="file"
                              getValueFromEvent={(e) => {
                                if (Array.isArray(e)) {
                                  return e;
                                }
                                return e && e.fileList[0];
                              }}
                              style={{ flex: 1, textAlign: 'center' }}
                              labelAlign="left"
                            >
                              <Upload
                                name="image"
                                listType="picture-card"
                                beforeUpload={() => false}
                                maxCount={1}
                                onChange={(info) => {
                                  const newFileList = info.fileList.slice(-1);
                                  const newColors = form.getFieldValue('colors');
                                  newColors[index].image = newFileList[0];
                                  form.setFieldsValue({ colors: newColors });
                                  setColorsAdded(newColors.length > 0);
                                }}
                                style={{ width: 100, height: 100 }}
                              >
                                {form.getFieldValue(['colors', index, 'image']) ? null : (
                                  <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                  </div>
                                )}
                              </Upload>
                            </Form.Item>
                            <Button
                              type="link"
                              onClick={() => {
                                remove(field.name);
                                const newColors = form.getFieldValue('colors');
                                setColorsAdded(newColors.length > 0);
                              }}
                              style={{ flex: 'none' }}
                            >
                              Xóa màu sắc
                            </Button>
                          </div>
                        ))}
                        <Form.Item wrapperCol={{ span: 24 }}>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm màu sắc
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  {colorsAdded && (
                    <Form.List name="details">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field) => (
                            <div
                              key={field.key}
                              style={{ display: 'flex', marginBottom: 8, alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Form.Item
                                {...field}
                                name={[field.name, 'color']}
                                fieldKey={[field.fieldKey, 'color']}
                                rules={[{ required: true, message: 'Vui lòng chọn màu sắc' }]}
                                style={{ flex: 1, marginRight: 8 }}
                                labelAlign="left"
                              >
                                <Select placeholder="Chọn màu sắc">
                                  {form.getFieldValue('colors') && form.getFieldValue('colors').map((color, index) => (
                                    <Option key={index} value={color.color}>
                                      {color.color}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, 'storage']}
                                fieldKey={[field.fieldKey, 'storage']}
                                rules={[{ required: true, message: 'Vui lòng nhập dung lượng' }]}
                                style={{ flex: 1, marginRight: 8 }}
                                labelAlign="left"
                              >
                                <Input placeholder="Dung lượng" />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, 'quantity']}
                                fieldKey={[field.fieldKey, 'quantity']}
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                style={{ flex: 1, marginRight: 8 }}
                                labelAlign="left"
                              >
                                <Input placeholder="Số lượng" />
                              </Form.Item>
                              <Button
                                type="link"
                                onClick={() => remove(field.name)}
                                style={{ flex: 'none' }}
                              >
                                Xóa
                              </Button>
                            </div>
                          ))}
                          <Form.Item wrapperCol={{ span: 24 }}>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Thêm dung lượng và số lượng
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  )}

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
