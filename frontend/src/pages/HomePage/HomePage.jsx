<<<<<<< HEAD
import React from "react";
import { Helmet } from "react-helmet";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent"
import {
    WrapperProducts,
    WrapperPage,
    HighlightedContainer,
    HighlightedText
} from "./style"
=======
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {
    WrapperProducts,
    WrapperPage,
    ButtonMore,
    HighlightedContainer,
    AnimatedText,
    WrapperProductsSale
} from "./style";
>>>>>>> nhap
import b1 from "../../assets/images/banner1.jpg";
import b2 from "../../assets/images/banner2.jpg";
import b3 from "../../assets/images/banner3.png";
import b4 from "../../assets/images/banner4.jpg";
import b5 from "../../assets/images/banner5.png";
import b6 from "../../assets/images/banner6.jpg";
<<<<<<< HEAD
import ct1 from "../../assets/images/CT1.png";
import ct2 from "../../assets/images/CT2.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import NavbarTypeComponent from "../../components/NavbarTypeComponent/NavbarTypeComponent";

const HomePage = () => {
=======
import NavbarTypeComponent from "../../components/NavbarTypeComponent/NavbarTypeComponent";
import axios from "axios";
import { Spin } from 'antd';
import { FireFilled } from '@ant-design/icons';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/home')
            .then(response => {
                const updatedProducts = response.data.map(product => ({
                    ...product
                }));
                setProducts(updatedProducts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleShowMore = () => {
        setShowAll(true);
    };

    if (loading) {
        return (
            <Spin
                size="large"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
            />
        );
    }

    const getRandomProducts = (products, count) => {
        const productsCopy = [...products];
        const shuffled = [...productsCopy].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    const displayedProducts = showAll ? products : getRandomProducts(products, 5);

>>>>>>> nhap
    return (
        <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
            <NavbarTypeComponent />
            <WrapperPage>
                <div style={{ width: '1200px' }}>
                    <Helmet>
                        <title>Trang chủ - BKSHOP</title>
                    </Helmet>

                    <div id="container">
                        <SliderComponent arrImg={[b1, b2, b3, b4, b5, b6]} />
<<<<<<< HEAD
                        <HighlightedContainer>
                            <HighlightedText>
                                SẢN PHẨM MỚI RA MẮT
                            </HighlightedText>
                        </HighlightedContainer>
                        <div style={{display: 'flex', marginTop: '30px', justifyContent: 'space-between'}}>
                            <img src={ct1} alt='ct1' style={{maxWidth: '49%', height: 'auto'}} />
                            <img src={ct2} alt='ct2' style={{maxWidth: '49%', height: 'auto'}}/>
                        </div>

                        <HighlightedContainer>
                            <HighlightedText>
                                ĐIỆN THOẠI NỔI BẬT
                            </HighlightedText>
                        </HighlightedContainer>
                        <WrapperProducts>
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                        </WrapperProducts>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
                            <ButtonComponent />
                        </div>
=======
                        <div style={{fontSize: '18px', fontWeight: 'bold', color: '#444444', padding: '30px 0 0'}}>CHƯƠNG TRÌNH ĐẶC BIỆT</div>
                        <HighlightedContainer>
                            <div style={{display: 'flex', padding: '20px 30px', gap: '10px'}}>
                                <FireFilled style={{fontSize: '25px', color: '#fff'}} />
                                <div style={{fontSize: '25px', fontWeight: 'bold', color: '#fff'}}>HOT SALE</div>
                                <AnimatedText>CUỐI TUẦN</AnimatedText>
                            </div>
                            <WrapperProductsSale>
                                {displayedProducts.map(product => (
                                    <CardComponent
                                        key={product.productId}
                                        productId={product.productId}
                                        name={product.name}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))}
                            </WrapperProductsSale>
                        </HighlightedContainer>

                        <div style={{fontSize: '18px', fontWeight: 'bold', color: '#444444', padding: '30px 0 0'}}>ĐIỆN THOẠI NỔI BẬT NHẤT</div>
                        <WrapperProducts>
                            {(showAll ? products : products.slice(0, 15)).map(product => (
                                <CardComponent
                                    key={product.productId}
                                    productId={product.productId}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                            ))}
                        </WrapperProducts>
                        {products.length > 15 && !showAll && (
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '30px' }}>
                                <ButtonMore onClick={handleShowMore}>Xem thêm</ButtonMore>
                            </div>
                        )}
>>>>>>> nhap
                    </div>
                </div>
            </WrapperPage>
        </div>
<<<<<<< HEAD
    )
}

export default HomePage
=======
    );
};

export default HomePage;
>>>>>>> nhap
