import React from "react";
import { Col } from 'antd';
import { Input } from 'antd';
import { 
    WrapperHeader, 
    WrapperTextHeader,
    WrapperAccountHeader,
    WrapperTextHeaderSmall,
 } from "./style";

import {
    ShoppingCartOutlined,
    UserOutlined,
    CaretDownOutlined
} from '@ant-design/icons';

const { Search } = Input;

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>BKSHOP</WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <Search
                        placeholder="Tìm kiếm..."
                        //onSearch={onSearch} 
                        //enterButton
                        allowClear
                    />
                </Col>
                <Col span={6} style={{display: 'flex', gap: '30px'}}>
                    <div>
                        <ShoppingCartOutlined style={{fontSize: '30px', color: '#fff'}} />
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                    </div>
                    <WrapperAccountHeader>
                        <UserOutlined style={{fontSize: '30px'}} />
                        <div>
                            <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperAccountHeader>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent