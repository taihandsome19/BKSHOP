import React, { useState, useEffect } from 'react';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal, Button, Input, Form, Select, Upload, message, Spin, InputNumber } from 'antd';
import { UploadOutlined, EditOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import TableComponent from '../../../components/TableComponent/TableComponent';
import { ButtonComfirm, EditButton, WrapperRow, Deletebutton } from './style';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const AdminProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [productData, setProductData] = useState([]);
  const brands = ["Apple", "Vivo", "Oppo", "Xiaomi", "Samsung", "OnePlus"]; // hard code
  const [colors, setColors] = useState([]);
  const [storages, setStorages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [fullProductData, setFullProductData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [rowProductData, setRowProductData] = useState({});
  const [loadingbutton, setLoadingButton] = useState(false);
  const [isConfirmUpdateModalVisible, setIsConfirmUpdateModalVisible] = useState(false);
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);


  // Usestate dùng cho update sản phảm
  const [updateValueName, setupdateValueName] = useState('');
  const [updateValueBrand, setupdateValueBrand] = useState('');
  const [updateValuePrice, setupdateValuePrice] = useState('');
  const [updateValueDetail, setupdateValueDetail] = useState('');
  const [updateValueInventory, setupdateValueInventory] = useState({});


  const fetchData = () => {
    axios.get('http://localhost:3001/admin/manage_product')
      .then(response => {

        //const rawData = response.data.reduce((acc, curr) => {
        //  return { ...acc, ...curr };
        //}, {});
        const rawData = response.data;
        const formattedData = Object.keys(rawData).map((key) => {
          const item = rawData[key];
          const priceFormatted = parseInt(item.price).toLocaleString('vi-VN') + 'đ';
          return [
            key,
            item.name,
            item.brand,
            priceFormatted
          ];
        });
        setProductData(formattedData);
        setFullProductData(rawData);
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

  //================= BEGIN EDIT PRODUCTS ===================//
  const showModal = (rowData) => {
    setSelectedRowData(rowData);
    setRowProductData(fullProductData[rowData[0]]);
    setIsModalVisible(true);

    const product = fullProductData[rowData[0]];
    setupdateValueName(product.name);
    setupdateValueBrand(product.brand);
    setupdateValuePrice(product.price);
    setupdateValueDetail(product.description.detail);
    setupdateValueInventory(product.inventory);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRowData(null);
    setRowProductData(null);
    setIsEditing(false);

    setupdateValueName('');
    setupdateValueBrand('');
    setupdateValuePrice('');
    setupdateValueDetail('');
    setupdateValueInventory({});
  };

  function hasNullValues(obj) {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === '') {
        return true;
      }
      if (typeof obj[key] === 'object' && obj[key] !== '') {
        if (hasNullValues(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  function areValuesNonNegative(obj) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'object') {
        if (!areValuesNonNegative(value)) {
          return false;
        }
      } else {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0) {
          return false;
        }
      }
    }
    return true;
  }

  const handleEditProduct = async () => {
    if (isEditing) {
      const newrowProductData = {
        ...rowProductData,
        name: updateValueName,
        brand: updateValueBrand,
        price: updateValuePrice,
        description: {
          ...rowProductData.description,
          detail: updateValueDetail
        },
        inventory: updateValueInventory
      };
      const payload = {
        productId: selectedRowData[0],
        info: newrowProductData
      }
      try {
        const res = await axios.post('http://localhost:3001/admin/update_product', payload);
        if (res.data && res.data.status === true) {
          message.success("Cập nhật sản phẩm thành công!");
          setRowProductData(newrowProductData)
          fetchData();
        } else {
          message.error("Cập nhật sản phẩm thất bại!");
          return;
        }
      } catch (error) {
        message.error("Cập nhật sản phẩm thất bại!");
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  const showConfirmUpdateModal = () => {
    if (isEditing) {
      if (updateValueName === rowProductData.name && updateValueBrand === rowProductData.brand &&
        updateValuePrice === rowProductData.price && updateValueDetail === rowProductData.description.detail &&
        updateValueInventory === rowProductData.inventory
      ) {
        message.error("Bạn chưa chỉnh sửa thông tin nào!")
        return;
      } else if (updateValueName === "" || updateValueBrand === "" || updateValueDetail === ""
        || updateValuePrice === "" || hasNullValues(updateValueInventory)
      ) {
        message.error("Vui lòng điền đầy đủ thông tin!")
        return;
      } else if (updateValueName.length > 50) {
        message.error("Tên sản phẩm không dược dài quá 50 ký tự!")
        return;
      } else if (parseInt(updateValuePrice) < 0) {
        message.error("Giá sản phẩm phải lớn hơn hoặc bằng 0!")
        return;
      } else if (!areValuesNonNegative(updateValueInventory)) {
        message.error("Số lượng mỗi loại phải lớn hơn hoặc bằng 0!")
        return;
      }
      setIsConfirmUpdateModalVisible(true);
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleConfirmUpdateOk = () => {
    handleEditProduct();
    setIsConfirmUpdateModalVisible(false);
  };

  const handleConfirmUpdateCancel = () => {
    setIsConfirmUpdateModalVisible(false);
  };


  const handleDelete = async () => {
    try {
      const res = await axios.post('http://localhost:3001/admin/remove_product', { productId: selectedRowData[0] });
      if (res.data && res.data.status === true) {
        message.success("Xoá sản phẩm thành công!");
        fetchData();
        handleCancel();
      } else {
        message.error("Xoá sản phẩm thất bại!")
      }

    } catch (error) {
      message.error("Xoá sản phẩm thất bại!")
    }
  }


  const showConfirmDeleteModal = () => {
    setIsConfirmDeleteModalVisible(true);
  };

  const handleConfirmDeleteOk = () => {
    setIsConfirmDeleteModalVisible(false);
    handleDelete();
  };

  const handleConfirmDeleteCancel = () => {
    setIsConfirmDeleteModalVisible(false);
  };

  //================= END EDIT PRODUCTS ===================//

  //================= BEGIN ADD PRODUCTS ===================//

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
    setFileList([]);
    setColors([]);
    setStorages([]);
  };

  const handleAddProduct = async (values) => {
    setLoadingButton(true);
    const commaCount = (values.color.match(/,/g) || []).length + 1;
    if (fileList.length !== commaCount) {
      message.error("Vui lòng tải lên số lượng hình ảnh bằng số lượng màu")
      setLoadingButton(false);
      return;
    }
    if ((values.name).length > 50) {
      message.error("Tên sản phẩm không được dài quá 50 ký tự")
      setLoadingButton(false);
      return;
    }
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('images', file.originFileObj);
    });

    try {
      const uploadResponse = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrls = uploadResponse.data.images;

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
        description: {
          colors: colors,
          memorysize: storages,
          detail: values.decription
        },
        images: imageUrls,
        inventory: quantities,
        name: values.name,
        brand: values.brand,
        price: values.price,
      };

      const response = await axios.post('http://localhost:3001/admin/create_product', newProduct);
      if (response.data.status === true) {
        message.success("Thêm sản phẩm thành công")
        fetchData();
      } else {
        message.error("Thêm sản phẩm thất bại")
        setLoadingButton(false);
        return;
      }
      setProductData([...productData, newProduct]);
      form.resetFields();
      setFileList([]);
      setColors([]);
      setStorages([]);
    } catch (error) {
      message.error("Thêm sản phẩm thất bại")
      console.error('Error:', error);
    }
    setLoadingButton(false);
  };


  const handleColorChange = (value) => {
    setColors(value.split(',').map(item => item.trim()));
  };

  const handleStorageChange = (value) => {
    setStorages(value.split(',').map(item => item.trim()));
  };

  //================= END ADD PRODUCTS ===================//

  const columns = [
    {
      name: 'id',
      label: 'Mã sản phẩm',
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
    { name: 'brand', label: 'Hãng' },
    { name: 'price', label: 'Giá' },
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
            {loading ? (
              <Spin
                size="large"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
              />
            ) : (
              <div>
                <div style={{ flex: '1', padding: '20px 30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'end', paddingBottom: '20px' }}>
                    <ButtonComfirm onClick={showAddModal}>Thêm sản phẩm</ButtonComfirm>
                  </div>
                  <TableComponent columns={columns} data={productData} title="Danh sách sản phẩm" />
                  <Modal
                    centered
                    title="Xác nhận cập nhật"
                    visible={isConfirmUpdateModalVisible}
                    onCancel={handleConfirmUpdateCancel}
                    onOk={handleConfirmUpdateOk}
                    okText="Xác nhận"
                    cancelText="Hủy bỏ"
                    width={400}
                  >
                    <p>
                      {`Bạn có muốn cập nhật thông tin sản phẩm không? `}
                    </p>

                  </Modal>
                  <Modal
                    centered
                    title="Xác nhận xoá"
                    visible={isConfirmDeleteModalVisible}
                    onCancel={handleConfirmDeleteCancel}
                    onOk={handleConfirmDeleteOk}
                    okText="Xác nhận"
                    cancelText="Hủy bỏ"
                    width={400}
                  >
                    <p>
                      {`Bạn có muốn xoá sản phẩm không? `}
                    </p>

                  </Modal>
                  <Modal
                    centered
                    title="Thông tin chi tiết"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={[
                      <div>
                        <Deletebutton onClick={showConfirmDeleteModal}>
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: '5px' }}>
                            <DeleteOutlined /> Xoá
                          </div>
                        </Deletebutton>
                        <EditButton isEditing={isEditing} onClick={showConfirmUpdateModal}>
                          {isEditing ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: '5px' }}>
                              <SaveOutlined /> Lưu
                            </div> :
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: '5px' }}>
                              <EditOutlined /> Chỉnh sửa
                            </div>
                          }
                        </EditButton>
                      </div>
                    ]}
                  >
                    {selectedRowData && (
                      <div>
                        <WrapperRow>
                          <strong style={{ width: '125px' }}>Mã sản phẩm:</strong>
                          <Input style={{ flex: '1' }} value={selectedRowData[0]} disabled={true} />
                        </WrapperRow>
                        <WrapperRow>
                          <strong style={{ width: '125px' }}>Tên sản phẩm:</strong>
                          <Input style={{ flex: '1' }} value={updateValueName} disabled={!isEditing} onChange={(e) => setupdateValueName(e.target.value)} />
                        </WrapperRow>
                        <WrapperRow>
                          <strong style={{ width: '125px' }}>Hãng điện thoại:</strong>
                          <Select value={updateValueBrand} style={{ flex: '1' }} onChange={(value) => setupdateValueBrand(value)} disabled={!isEditing}>
                            {brands.map((status, index) => (
                              <Option key={status} value={status}
                              >
                                {status}
                              </Option>
                            ))}
                          </Select>
                        </WrapperRow>
                        <WrapperRow>
                          <strong style={{ width: '125px' }}>Giá sản phẩm:</strong>
                          <Input style={{ flex: '1' }} value={updateValuePrice} disabled={!isEditing} onChange={(e) => setupdateValuePrice(e.target.value)} />
                        </WrapperRow>
                        <WrapperRow>
                          <strong style={{ width: '125px' }}>Số lượng:</strong>
                          <div style={{ flex: '1' }}>
                            {Object.values(rowProductData.description.color || {}).map(color => (
                              Object.values(rowProductData.description.memorysize || {}).map(storage => (
                                <div style={{ display: 'flex', flex: '1', gap: '10px', padding: '7px 0' }}>
                                  <Input
                                    style={{ width: '33.3%' }}
                                    value={color}
                                    disabled={true}
                                  />
                                  <Input
                                    style={{ width: '33.3%' }}
                                    value={storage}
                                    disabled={true}
                                  />
                                  <InputNumber
                                    min={0}
                                    style={{ width: '33.3%', textAlign: 'center' }}
                                    value={updateValueInventory[color][storage]}
                                    disabled={!isEditing}
                                    onChange={(newValue) => {
                                      setupdateValueInventory((prevInventory) => ({
                                        ...prevInventory,
                                        [color]: {
                                          ...prevInventory[color],
                                          [storage]: newValue,
                                        },
                                      }));
                                    }}
                                  />
                                </div>
                              ))
                            ))}
                          </div>
                        </WrapperRow>
                        <WrapperRow>
                          <strong style={{ width: '125px' }}>Mô tả:</strong>
                          <TextArea style={{ flex: '1' }} value={updateValueDetail} disabled={!isEditing} onChange={(e) => setupdateValueDetail(e.target.value)} />
                        </WrapperRow>
                        <WrapperRow>
                          <strong style={{ width: '125px' }}>Hình ảnh:</strong>
                          <div style={{ display: 'flex', gap: "5px" }}>
                            {Object.values(rowProductData.image || {}).map(img => (
                              <div style={{
                                width: '50px',
                                height: '50px',
                                border: '1px solid #d9d9d9',
                                borderRadius: '8px',
                                overflow: 'hidden'
                              }}>
                                <img
                                  src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${img}?alt=media`}
                                  alt="icon"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                            ))}
                          </div>
                        </WrapperRow>
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
                        rules={[
                          { required: true, message: 'Vui lòng nhập giá sản phẩm' },
                          {
                            validator: (_, value) =>
                              value >= 0 ? Promise.resolve() : Promise.reject(new Error('Giá sản phẩm phải lớn hơn hoặc bằng 0')),
                          },
                        ]}
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
                        rules={[{ required: true, message: 'Chọn hình ảnh' }]}
                      >
                        <Upload
                          multiple
                          listType="picture"
                          fileList={fileList}
                          onChange={({ fileList }) => setFileList(fileList)}
                          beforeUpload={() => false}
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
                                    rules={[
                                      { required: true, message: 'Nhập số lượng' },
                                      {
                                        validator: (_, value) =>
                                          value >= 0 ? Promise.resolve() : Promise.reject(new Error('Không hợp lệ')),
                                      },
                                    ]}
                                    style={{ flex: 1, marginRight: 8 }}
                                  >
                                    <InputNumber min={0} placeholder="Số lượng" style={{ width: '151.8px' }} />
                                  </Form.Item>
                                </div>
                              ))
                            ))}
                          </>
                        )}
                      </Form.List>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <Button type="primary" loading={loadingbutton} htmlType="submit" block>
                          Thêm
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              </div>
            )}
            < div style={{ display: 'flex', justifyContent: 'center', padding: '10px', backgroundColor: '#FBFCFC' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#6f6f6f' }}>© 2024 BkShopMyAdmin V1.0</div>
          </div>
        </div>
      </RightContainer>
    </Container>
    </HelmetProvider >
  );
};

export default AdminProduct;
