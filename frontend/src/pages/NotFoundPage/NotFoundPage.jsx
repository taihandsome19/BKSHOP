import React from "react";
import {
    WrapperPage,
    WrapperBox,
    TitleHeader,
    Footer
} from './style';
import img1 from '../../assets/images/404.png';
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const NotFoundPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>404 Not Found</title>
            </Helmet>
            <WrapperPage>
                <WrapperBox>
                    <TitleHeader>404 NOT FOUND</TitleHeader>
                    <div style={{ display: 'flex', gap: '30px', padding: "20px 0" }}>
                        <img src={img1} width="700px" alt='404 img' />
                        <div style={{ display: 'flex', gap: '30px', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: "60px", fontSmooth: '"Space Mono", monospace', fontWeight: '600', color: '#444' }}>
                                TÔI CÓ TIN XẤU CHO BẠN
                            </div>
                            <div style={{ fontSize: "20px", fontSmooth: 'monospace', fontWeight: '200', color: '#444' }}>
                                Trang bạn đang tìm kiếm có thể đã bị xóa hoặc tạm thời không khả dụng
                            </div>
                            <Link to={'/'} style={{ textDecoration: "none" }}>
                                <div style={{ padding: '20px', backgroundColor: '#333333', display: 'flex', justifyContent: 'center', color: '#fff', fontSize: '15px', width: '200px' }}>
                                    QUAY VỀ TRANG CHỦ
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div style={{ position: 'fixed', 'bottom': '0' }}>
                        <Footer>© 2024 BKSHOP</Footer>
                    </div>
                </WrapperBox>
            </WrapperPage>
        </HelmetProvider>
    )
}

export default NotFoundPage