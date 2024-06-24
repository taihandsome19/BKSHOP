import React from "react";
import { Helmet } from "react-helmet";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent"
import {
    WrapperTypeProduct,
    WrapperProducts
} from "./style"
import b1 from "../../assets/images/banner1.jpeg";
import b2 from "../../assets/images/banner2.jpeg";
import b3 from "../../assets/images/banner3.jpeg";
import b4 from "../../assets/images/banner4.png";
import b5 from "../../assets/images/banner5.jpeg";
import b6 from "../../assets/images/banner6.jpeg";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const HomePage = () => {
    const arr = ["Tủ lạnh", "Máy giặt", "Máy lạnh", "TV"]
    return(
        <>
            <Helmet>
                <title>Trang chủ - BKSHOP</title>
            </Helmet>
            <div style={{padding: '0 120px'}}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return(
                            <TypeProduct name={item} key={item}/>
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div id="container" style={{background: '#F5F5F5', padding: '0 120px'}}>
                <SliderComponent arrImg={[b1,b2,b3,b4,b5,b6]} />
                <WrapperProducts>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </WrapperProducts>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px', paddingBottom: '20px'}}>
                    <ButtonComponent />
                </div>
            </div>
            
        </>
    )
}

export default HomePage