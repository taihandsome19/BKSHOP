import React, { useState, useEffect } from 'react';
import { Container, RightContainer } from '../style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal, Button, Input, Form, Select, Upload, message, Spin } from 'antd';
import { UploadOutlined, EditOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import SlideBarComponent from '../../../components/AdminComponent/SlideBar/SlideBarAdmin';
import HeaderComponent from '../../../components/AdminComponent/Header/Header';
import TableComponent from '../../../components/TableComponent/TableComponent';
import { ButtonComfirm, EditButton, WrapperRow, StyledInput, StyledInputArea, Deletebutton } from './style';
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
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loadingbutton, setLoadingButton] = useState(false);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('http://localhost:3001/admin/manage_product')
      .then(response => {
        const rawData = response.data;
        const formattedData = Object.keys(response.data).map((key) => {
          const item = response.data[key];
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
  }, []);

  const showModal = (rowData) => {
    setSelectedRowData(rowData);
    setRowProductData(fullProductData[rowData[0]]);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRowData(null);
    setRowProductData(null);
    setIsEditing(false);
    setSelectedColor(null);
    setSelectedSize(null);
  };

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

  const handleEditProduct = () => {
    console.log(selectedRowData);
  
    setIsEditing(!isEditing);
    if (isEditing) {
      // Format the inventory data based on selected values
      const updatedProductData = { ...rowProductData };
      const inventory = {};
  
      if (selectedColor && selectedSize) {
        // Assuming you have the logic to get the quantity from input fields.
        const quantity = document.querySelector(`input[name='${selectedColor}-${selectedSize}']`).value;
        
        if (!inventory[selectedColor]) {
          inventory[selectedColor] = {};
        }
        
        inventory[selectedColor][selectedSize] = parseInt(quantity, 10) || 0;
  
        // Update the rowProductData
        updatedProductData.inventory = inventory;
  
        // Update the state or send a request to update the data
        setRowProductData(updatedProductData);
        console.log('Updated Product Data:', updatedProductData);
  
        // Example API call (assuming you have an endpoint to handle product updates)
        axios.put(`http://localhost:3001/admin/product/update/${rowProductData.id}`, updatedProductData)
          .then(response => {
            message.success('Sản phẩm đã được cập nhật thành công!');
            setProductData(prevData => prevData.map(item =>
              item[0] === rowProductData.id ? updatedProductData : item
            ));
          })
          .catch(error => {
            message.error('Cập nhật sản phẩm thất bại!');
          });
  
        setSelectedColor(null);
        setSelectedSize(null);
      } else {
        message.error('Vui lòng chọn màu sắc và dung lượng trước khi lưu.');
      }
    } else {
      console.log('Editing mode...');
    }
  };
  

  const handleAddProduct = async (values) => {
    setLoadingButton(true);
    const commaCount = (values.color.match(/,/g) || []).length + 1;
    if(fileList.length !== commaCount){
      message.error("Vui lòng tải lên số lượng hình ảnh bằng số lượng màu")
      setLoadingButton(false);
      return;
    }
    if((values.name).length > 50){
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
      if(response.data.status === true){
        message.success("Thêm sản phẩm thành công")
      }else{
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
                  <div>
                  <Deletebutton>
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: '5px' }}>
                        <DeleteOutlined /> Xoá
                      </div>
                  </Deletebutton>
                  <EditButton isEditing={isEditing} onClick={handleEditProduct}>
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
                      <StyledInput value={selectedRowData[0]} disabled={true} />
                    </WrapperRow>
                    <WrapperRow>
                      <strong style={{ width: '125px' }}>Tên sản phẩm:</strong>
                      <StyledInput value={selectedRowData[1]} disabled={!isEditing} />
                    </WrapperRow>
                    <WrapperRow>
                      <strong style={{ width: '125px' }}>Hãng điện thoại:</strong>
                      <StyledInput defaultValue={selectedRowData[2]} disabled={!isEditing} />
                    </WrapperRow>
                    <WrapperRow>
                      <strong style={{ width: '125px' }}>Giá sản phẩm:</strong>
                      <StyledInput defaultValue={selectedRowData[3]} disabled={!isEditing} />
                    </WrapperRow>
                    <WrapperRow>
                      <strong style={{ width: '125px' }}>Số lượng:</strong>
                      <div style={{ flex: '1' }}>
                      {Object.values(rowProductData.description.color || {}).map(color => (
                        Object.values(rowProductData.description.memorysize || {}).map(storage => (
                          <div style={{ display: 'flex', flex: '1', gap: '10px', padding: '7px 0' }}>
                            <StyledInput
                              style={{ width: '33.3%' }}
                              value={color}
                              disabled={true}
                            />
                            <StyledInput
                              style={{ width: '33.3%' }}
                              value={storage}
                              disabled={true}
                            />
                            <StyledInput
                              style={{ width: '33.3%' }}
                              defaultValue={rowProductData.inventory[color][storage]}
                              disabled={!isEditing}
                            />
                          </div>
                        ))
                      ))}
                      </div>
                    </WrapperRow>
                    <WrapperRow>
                      <strong style={{ width: '125px' }}>Mô tả:</strong>
                      <StyledInputArea defaultValue={rowProductData.description.detail} disabled={!isEditing} />
                    </WrapperRow>
                    <WrapperRow>
                      <strong style={{ width: '125px' }}>Hình ảnh:</strong>
                      <div style={{display: 'flex', gap: "5px"}}>
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
                                <Input placeholder="Số lượng" style={{ width: '151.8px' }} />
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
