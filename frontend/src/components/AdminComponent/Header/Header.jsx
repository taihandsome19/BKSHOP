import React from 'react'
import { FixedHeader, WrapperAvatar } from '../style'
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
  import avt from '../../../assets/images/avt.png';

const Header = () => {
    return (
        <FixedHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <HomeOutlined style={{ fontSize: '20px', fontWeight: 'bold', color: '#111', paddingLeft: '10px'}} />
                </Link>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <LogoutOutlined style={{ fontSize: '20px' }} />
                    <div style={{ width: "35px", padding: '0 10px' }}>
                        <WrapperAvatar src={avt} alt="User Avatar" preview={false} />
                    </div>
                </div>
            </div>
        </FixedHeader>
    )
}

export default Header