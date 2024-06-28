import React from "react";
import { Badge, Col } from 'antd';
import { Input } from 'antd';
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
    CaretDownOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;

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
                                <Badge count={4}>
                                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                </Badge>
                                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                            </div>
                        </Link>
                        <Link to="/login">
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
                    </Col>
                </WrapperBox>
            </WrapperPage>
        </div>
    )
}

export default HeaderComponent