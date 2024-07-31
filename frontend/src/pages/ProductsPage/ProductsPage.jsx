import React, { useState, useEffect } from 'react';
import { WrapperPage, WrapperBox, ButtonSort, WrapperProducts } from "./style";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarTypeComponent from '../../components/NavbarTypeComponent/NavbarTypeComponent';
import axios from 'axios';
import { message, Spin } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';

const ProductPages = () => {
    const [activeSort, setActiveSort] = useState('all');
    const searchParams = new URLSearchParams(window.location.search);
    const brand = searchParams.get('brand');
    const [infoBrand, setInfoBrand] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noProducts, setNoProducts] = useState(false);
    const [or_infoBrand, setOrInfoBrand] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            try {
                if (brand) {
                    const res = await axios.get(`http://localhost:3001/product/brand?brand=${brand}`);
                    setInfoBrand(res.data);
                    setOrInfoBrand(res.data);
                    setLoading(false);
                    setNoProducts(res.data.length === 0);
                } else {
                    setInfoBrand([]);
                    setLoading(false);
                    setNoProducts(false);
                }
            } catch (error) {
                message.error('Lỗi khi lấy thông tin sản phẩm');
                setLoading(false);
            }
        };

        fetchData();
    }, [brand]);

    useEffect(() => {
        const sortProductsByPrice = (products) => {
            let sortedProducts = [...products];
            if (activeSort === 'highToLow') {
                sortedProducts.sort((b, a) => parseInt(a.price) - parseInt(b.price));
            } else if (activeSort === 'lowToHigh') {
                sortedProducts.sort((b, a) => parseInt(b.price) - parseInt(a.price));
            }else{
                sortedProducts = or_infoBrand;
            }
            setInfoBrand(sortedProducts);
        };

        if (infoBrand.length > 0 && activeSort) {
            sortProductsByPrice(infoBrand);
        }
    }, [activeSort, infoBrand, or_infoBrand]);

    const handleSortClick = (sortType) => {
        setActiveSort(sortType);
    };

    const renderProducts = () => {
        if (loading) {
            return (
                <Spin
                    size="large"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
                />
            );
        } else if (noProducts) {
            return (
                <div style={{ width: '1200px', minHeight: '100vh', display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
                    <div style={{ textAlign: 'center', fontSize: '16px', color: "#444" }}>
                        <ContainerOutlined style={{ fontSize: '50px', color: '#444' }} />
                        <div style={{ paddingTop: '20px' }}>Không có sản phẩm nào!</div>
                    </div>
                </div>
            );
        } else {
            return (
                <>
                    <div style={{ fontSize: "18px", fontWeight: '700', marginBottom: "10px" }}>Sắp xếp theo</div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <ButtonSort
                            active={activeSort === 'all'}
                            onClick={() => handleSortClick('all')}
                        >
                            <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"></path>
                            </svg>
                            <div style={{ fontSize: "12px" }}>Tất cả</div>
                        </ButtonSort>
                        <ButtonSort
                            active={activeSort === 'highToLow'}
                            onClick={() => handleSortClick('highToLow')}
                        >
                            <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"></path></svg>
                            <div style={{ fontSize: "12px" }}>Giá Cao - Thấp</div>
                        </ButtonSort>
                        <ButtonSort
                            active={activeSort === 'lowToHigh'}
                            onClick={() => handleSortClick('lowToHigh')}
                        >
                            <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"></path></svg>
                            <div style={{ fontSize: "12px" }}>Giá Thấp - Cao</div>
                        </ButtonSort>
                    </div>
                    <WrapperProducts>
                        {infoBrand.map(product => (
                            <CardComponent
                                key={product.productId}
                                productId={product.productId}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </WrapperProducts>
                </>

            );
        }
    };

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Danh mục sản phẩm - BKSHOP</title>
                </Helmet>
                <NavbarTypeComponent />
                <WrapperPage>
                    <WrapperBox>
                        <div>
                            {renderProducts()}
                        </div>
                    </WrapperBox>
                </WrapperPage>
            </div>
        </HelmetProvider>
    );
};

export default ProductPages;
