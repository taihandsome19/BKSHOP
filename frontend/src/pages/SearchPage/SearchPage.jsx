import React, { useState, useEffect } from 'react';
import { WrapperPage, WrapperBox, ButtonSort, WrapperProducts } from "./style";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CardComponent from '../../components/CardComponent/CardComponent';
import { message, Spin } from 'antd';
import axios from 'axios';
import { ContainerOutlined } from '@ant-design/icons';

const SearchPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const key = searchParams.get('key');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSort, setActiveSort] = useState(null);
    const [savePR, setsavePR] = useState([]);

    useEffect(() => {
        if (!key) {
            setProducts([]);
            setLoading(false);
            return;
        }

        axios.get('http://localhost:3001/home')
            .then(response => {
                setsavePR(response.data);
                const fetchedProducts = response.data;
                const keywords = key.toLowerCase().split(' ').filter(Boolean);
                const filteredProducts = fetchedProducts.filter(product => {
                    const productName = product.name.toLowerCase();
                    const matchingKeywords = keywords.filter(word => productName.includes(word));
                    return (matchingKeywords.length / keywords.length) >= 0.5;
                });

                setProducts(filteredProducts);
                setLoading(false);
            })
            .catch(error => {
                message.error("Lỗi khi lấy dữ liệu");
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, [key]);

    useEffect(() => {
        const sortProductsByPrice = (pr) => {
            let sortedProducts = [...pr];
            if (activeSort === 'highToLow') {
                sortedProducts.sort((b, a) => parseInt(a.price) - parseInt(b.price));
            } else if (activeSort === 'lowToHigh') {
                sortedProducts.sort((b, a) => parseInt(b.price) - parseInt(a.price));
            }
            setProducts(sortedProducts);
        };

        if (products.length > 0 && activeSort) {
            sortProductsByPrice(products);
        }
    }, [activeSort, products]);

    const handleSortClick = (sortType) => {
        setActiveSort(sortType);
    };

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Tìm kiếm - BKSHOP</title>
                </Helmet>
                <WrapperPage>
                    <WrapperBox>
                        {loading && (
                            <div style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                zIndex: 9999
                            }}>
                                <Spin size="large" />
                            </div>
                        )}
                        <div>
                            <div style={{ display: 'flex', gap: '5px', fontSize: "14px", color: '#707070', marginBottom: "10px", justifyContent: "center", width: '1200px' }}>
                                <div>Kết quả tìm kiếm cho từ khoá</div>
                                <div style={{ fontWeight: 'bold', color: "#444" }}>{key}</div>
                            </div>
                            {products && products.length > 0 ? (
                                <>
                                    <div style={{ fontSize: "18px", fontWeight: '700', marginBottom: "10px" }}>Sắp xếp theo</div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <ButtonSort
                                            active={activeSort === 'highToLow'}
                                            onClick={() => handleSortClick('highToLow')}
                                        >
                                            <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"></path>
                                            </svg>
                                            <div style={{ fontSize: "12px" }}>Giá Cao - Thấp</div>
                                        </ButtonSort>
                                        <ButtonSort
                                            active={activeSort === 'lowToHigh'}
                                            onClick={() => handleSortClick('lowToHigh')}
                                        >
                                            <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"></path>
                                            </svg>
                                            <div style={{ fontSize: "12px" }}>Giá Thấp - Cao</div>
                                        </ButtonSort>
                                    </div>
                                </>
                            ) : (
                                <div style={{ minHeight: '100vh' }}>
                                    <div style={{ width: '1200px', display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
                                        <div style={{ textAlign: 'center', fontSize: '16px', color: "#444" }}>
                                            <ContainerOutlined style={{ fontSize: '50px', color: '#444' }} />
                                            <div style={{ paddingTop: '20px' }}>Không có sản phẩm nào!</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#444444', padding: '30px 0 0' }}>GỢI Ý SẢN PHẨM</div>
                                    <WrapperProducts>
                                        {savePR && savePR.slice(0, 5).map(product => (
                                            <CardComponent
                                                key={product.productId}
                                                productId={product.productId}
                                                name={product.name}
                                                price={product.price}
                                                image={product.image}
                                            />
                                        ))}
                                    </WrapperProducts>
                                </div>
                            )}

                            <WrapperProducts>
                                {products && products.map(product => (
                                    <CardComponent
                                        key={product.productId}
                                        productId={product.productId}
                                        name={product.name}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))}
                            </WrapperProducts>
                        </div>
                    </WrapperBox>
                </WrapperPage>
            </div>
        </HelmetProvider>
    );
};

export default SearchPage;
