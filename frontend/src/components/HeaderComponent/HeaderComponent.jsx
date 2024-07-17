import React from "react";
import { Badge, Col, Dropdown, Menu } from 'antd';
import { Input } from 'antd';
import axios from 'axios';
import {
    WrapperTextHeader,
    WrapperAccountHeader,
    WrapperTextHeaderSmall,
    WrapperPage,
    WrapperBox
} from "./style";

import {
    ShoppingCartOutlined,
    UserOutlined,
    CaretDownOutlined,
    BellOutlined,
    LogoutOutlined,
    ShopOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;

const isLogged = localStorage.getItem("isLogged");
const User_name = localStorage.getItem("User_name");
const User_email = localStorage.getItem("User_email");
const User_cart = localStorage.getItem("User_cart");

const handleLogout = async () => {
    try {
        await axios.post('http://localhost:3001/auth/log_out');
        
       localStorage.clear();

        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

const menu = (
    <Menu style={{ width: '250px', maxHeight: '300px'}}>
        <div style={{ marginLeft: '15px', padding: '10px 0'}}>
            <div style={{fontSize: '18px', fontWeight: 'bold'}}>
                {User_name}
            </div>
            <div style={{fontSize: '11px', color: '#444'}}>{User_email}</div>
        </div>
       
        <Menu.Item key="0">
        <Link  to="/user" style={{ color: '#444' }} >
            <div style={{ display: 'flex', gap: '10px' }}>
                <UserOutlined />
                <div style={{fontSize: '14px'}}>Trang cá nhân</div>
            </div>
        </Link>
        </Menu.Item>
        <Menu.Item key="1">
        <Link to="/user/order" style={{ color: '#444' }} >
            <div style={{ display: 'flex', gap: '10px' }}>
                <ShopOutlined />
                <div style={{fontSize: '14px'}}>Lịch sử mua hàng</div>
            </div>
        </Link>
        </Menu.Item>
        <div style={{width: '250px', borderBottom: '1.5px solid #F5F5F5', margin: '5px 0'}}/>
        <Menu.Item key="2" onClick={handleLogout}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <LogoutOutlined />
                <Link to="/user" style={{ color: '#444' }}>Đăng xuất</Link>
            </div>
        </Menu.Item>
    </Menu>
);

const notice = (
    <Menu style={{ width: '300px', maxHeight: '300px', overflow: 'auto'}}>
        <h3 style={{ marginLeft: '15px' }}>
            Thông báo
        </h3>
        <Menu.Item key="0">
            <div style={{ display: 'flex', gap: '10px', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    backgroundColor: '#00D67F',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <ShoppingOutlined style={{ fontSize: '20px', color: '#fff' }} />
                </div>
                <Link to="/user" style={{ color: '#444', textAlign: 'left' }}>
                    Đơn hàng #10002837 đang được vận chuyển
                </Link>
            </div>
        </Menu.Item>
    </Menu>
);

const HeaderComponent = () => {
    return (
        <div>
            <WrapperPage>
                <WrapperBox>
                    <Col span={6}>
                        <Link to={'/'}>
                            <WrapperTextHeader>BKSHOP</WrapperTextHeader>
                        </Link>
                    </Col>
                    <Col span={12}>
                        <Search
                            placeholder="Tìm kiếm..."
                            //onSearch={onSearch} 
                            //enterButton
                            allowClear
                        />
                    </Col>
                    <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                        <Link to="/cart">
                            <div style={{ paddingLeft: '10px' }}>
                                <Badge count={User_cart || 0} showZero>
                                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                </Badge>
                                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                            </div>
                        </Link>
                        {isLogged === 'true' ? (
                            <WrapperAccountHeader>
                                <Dropdown overlay={notice} trigger={['click']}>
                                    <Badge count={18} style={{backgroundColor: '#00D67F'}} showZero>
                                        <BellOutlined style={{ fontSize: '22px', color: '#fff' }} />
                                    </Badge>
                                </Dropdown>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <img src={`https://ui-avatars.com/api/?background=random&name=${User_name.replace(" ", "+")}`} alt="avt" style={{ width: '30px', height: '30px', borderRadius: '50%', marginLeft: '20px' }} />
                                </Dropdown>
                            </WrapperAccountHeader>
                        ) : (
                            <Link to="/auth/log_in">
                                <WrapperAccountHeader>
                                    <UserOutlined style={{ fontSize: '30px' }} />
                                    <div>
                                        <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                        <div>
                                            <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                            <CaretDownOutlined />
                                        </div>
                                    </div>
                                </WrapperAccountHeader>
                            </Link>
                        )}
                    </Col>
                </WrapperBox>
            </WrapperPage>
        </div>
    )
}

export default HeaderComponent