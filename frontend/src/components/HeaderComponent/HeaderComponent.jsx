/*
import React, { useContext } from "react";
import { Badge, Col, Dropdown, Menu } from 'antd';
import { Input } from 'antd';
import axios from 'axios';
import {
    WrapperTextHeader,
    WrapperAccountHeader,
    WrapperTextHeaderSmall,
    WrapperPage,
    WrapperBox,
    RingingBadge
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
import { UserCartContext } from '../UserCartContext/UserCartContext';
const { Search } = Input;

const isLogged = localStorage.getItem("isLogged");
const User_name = localStorage.getItem("User_name");
const User_email = localStorage.getItem("User_email");

const handleLogout = async () => {
    try {
        await axios.post('http://localhost:3001/auth/log_out');

        localStorage.clear();

        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

const handleSearch = (value) => {
    if (value) {
        window.location.href = `/search?key=${value}`;
    }
};

const menu = (
    <Menu style={{ width: '250px', maxHeight: '300px' }}>
        <div style={{ marginLeft: '15px', padding: '10px 0' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {User_name}
            </div>
            <div style={{ fontSize: '11px', color: '#444' }}>{User_email}</div>
        </div>

        <Menu.Item key="0">
            <Link to="/user" style={{ color: '#444' }} >
                <div style={{ display: 'flex', gap: '10px' }}>
                    <UserOutlined />
                    <div style={{ fontSize: '14px' }}>Trang cá nhân</div>
                </div>
            </Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to="/user/order" style={{ color: '#444' }} >
                <div style={{ display: 'flex', gap: '10px' }}>
                    <ShopOutlined />
                    <div style={{ fontSize: '14px' }}>Lịch sử mua hàng</div>
                </div>
            </Link>
        </Menu.Item>
        <div style={{ width: '250px', borderBottom: '1.5px solid #F5F5F5', margin: '5px 0' }} />
        <Menu.Item key="2" onClick={handleLogout}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <LogoutOutlined />
                <Link to="/user" style={{ color: '#444' }}>Đăng xuất</Link>
            </div>
        </Menu.Item>
    </Menu>
);

const notice = (
    <Menu style={{ width: '350px', maxHeight: '300px', overflow: 'auto' }}>
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
                <Link to="/user" style={{ color: '#444', textAlign: 'left', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                    Đơn hàng #10002837 đang được vận chuyển hehe
                </Link>
            </div>
        </Menu.Item>
    </Menu>
);

const HeaderComponent = () => {
    const { User_cart } = useContext(UserCartContext);
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
                            onSearch={handleSearch}
                            //enterButton
                            allowClear
                        />
                    </Col>
                    <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', cursor: 'pointer' }}>
                        <Link to="/cart">
                            <div style={{ paddingLeft: '10px' }} >
                                <Badge count={User_cart || 0} showZero>
                                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                </Badge>
                                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                            </div>
                        </Link>
                        {isLogged === 'true' ? (
                            <WrapperAccountHeader>
                                <Dropdown overlay={notice} trigger={['click']}>
                                    <RingingBadge dot>
                                        <BellOutlined style={{ fontSize: '22px', color: '#fff' }} />
                                    </RingingBadge>
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
*/

import React, { useContext, useEffect, useState } from "react";
import { Badge, Col, Dropdown, Menu } from 'antd';
import { Input } from 'antd';
import axios from 'axios';
import {
    WrapperTextHeader,
    WrapperAccountHeader,
    WrapperTextHeaderSmall,
    WrapperPage,
    WrapperBox,
} from "./style";
import {
    ShoppingCartOutlined,
    UserOutlined,
    CaretDownOutlined,
    BellOutlined,
    LogoutOutlined,
    ShopOutlined,
    ShoppingOutlined,
    SafetyCertificateOutlined,
    InboxOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { UserCartContext } from '../UserCartContext/UserCartContext';
const { Search } = Input;

const isLogged = localStorage.getItem("isLogged");
const User_name = localStorage.getItem("User_name");
const User_email = localStorage.getItem("User_email");

const handleLogout = async () => {
    try {
        await axios.post('http://localhost:3001/auth/log_out');
        localStorage.clear();
        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

const handleSearch = (value) => {
    if (value) {
        window.location.href = `/search?key=${value}`;
    }
};

const HeaderComponent = () => {
    const { User_cart } = useContext(UserCartContext);
    const [notifications, setNotifications] = useState([]);
    const [notificationStatus, setNotificationStatus] = useState(true);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:3001/user/notice');
            setNotifications(response.data.notificationList);
            setNotificationStatus(response.data.status);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const read = async (noticeid, crr_status, notice) => {
        const regex = /#(\S+)/;
        const orderId = notice.match(regex);
        if (!crr_status) {
            try {
                await axios.post('http://localhost:3001/user/notice', { notificationId: noticeid, status: 'true' });
                fetchNotifications()
            } catch (error) {
                console.error('Error updating notification status:', error);
            }
        }
        if (orderId !== null && orderId[1]) {
            window.location.href = `http://localhost:3000/user/order/detail?orderId=${orderId[1]}`;
        }
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const notice = (
        <Menu style={{ width: '350px', maxHeight: '300px', overflow: 'auto', position: 'relative', padding: 0, margin: 0 }}>
            <div style={{
                position: 'sticky',
                top: 0,
                background: '#fff',
                zIndex: 1,
                padding: '10px 15px',
            }}>
                <h3 style={{ margin: 0 }}>Thông báo</h3>
            </div>
            {notificationStatus === false ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                    <InboxOutlined style={{ fontSize: '25px', color: '#6f6f6f' }} />
                    <div style={{ color: '#6f6f6f', paddingTop: '10px' }}>Bạn chưa có thông báo nào!</div>
                </div>
            ) : (
                Object.entries(notifications).map(([key, item]) => (
                    <Menu.Item key={key} style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '10px 15px' }}>
                        {item.status === false && (
                            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0688B4' }} />
                        )}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexGrow: 1 }} onClick={() => read(key, item.status, item.notice)}>
                            <div style={{
                                backgroundColor: '#00d67f',
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
                            <div 
                                style={{ color: '#444', textAlign: 'left', wordWrap: 'break-word', whiteSpace: 'normal' }}
                            >
                                {truncateText(item.notice, 73)}
                            </div>
                        </div>
                    </Menu.Item>
                ))
            )}
        </Menu>
    );

    const menu = (
        <Menu style={{ width: '250px', maxHeight: '300px' }}>
            <div style={{ marginLeft: '15px', padding: '10px 0' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {User_name}
                </div>
                <div style={{ fontSize: '11px', color: '#444' }}>{User_email}</div>
            </div>

            <Menu.Item key="0">
                <Link to="/user" style={{ color: '#444' }} >
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <UserOutlined />
                        <div style={{ fontSize: '14px' }}>Trang cá nhân</div>
                    </div>
                </Link>
            </Menu.Item>
            {localStorage.getItem("User_role") === "admin" ? (
                <Menu.Item key="2">
                    <Link to="/admin" style={{ color: '#444' }} >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <SafetyCertificateOutlined />
                            <div style={{ fontSize: '14px' }}>BKShopAdmin</div>
                        </div>
                    </Link>
                </Menu.Item>
            ) : (
                <Menu.Item key="1">
                    <Link to="/user/order" style={{ color: '#444' }} >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <ShopOutlined />
                            <div style={{ fontSize: '14px' }}>Lịch sử mua hàng</div>
                        </div>
                    </Link>
                </Menu.Item>
            )}
            <div style={{ width: '250px', borderBottom: '1.5px solid #F5F5F5', margin: '5px 0' }} />
            <Menu.Item key="3" onClick={handleLogout}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <LogoutOutlined />
                    <Link to="/user" style={{ color: '#444' }}>Đăng xuất</Link>
                </div>
            </Menu.Item>
        </Menu>
    );

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
                            onSearch={handleSearch}
                            allowClear
                        />
                    </Col>
                    <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', cursor: 'pointer' }}>
                        <Link to="/cart">
                            <div style={{ paddingLeft: '10px' }} >
                                <Badge count={User_cart || 0} showZero>
                                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                </Badge>
                                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                            </div>
                        </Link>
                        {isLogged === 'true' ? (
                            <WrapperAccountHeader>
                                <Dropdown overlay={notice} trigger={['click']}>
                                {notificationStatus === false ? (
                                    <BellOutlined style={{ fontSize: '22px', color: '#fff' }} />
                                ):(
                                    <Badge count={notificationStatus === false ? 0 : Object.values(notifications).filter(item => item.status === false).length || 0} showZero>
                                        <BellOutlined style={{ fontSize: '22px', color: '#fff' }} />
                                    </Badge>
                                )}
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

export default HeaderComponent;
