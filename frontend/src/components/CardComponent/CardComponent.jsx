import React from "react";
import {
    WrapperName,
    WrapperInfo,
    WrapperPrice,
    WrapperCard,
    Tag
} from './style';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';

const CardComponent = ({ productId, name, price, image }) => { // Use destructuring to access props
    return (
        <Link to={`/product/detail?product_id=${productId}`} style={{textDecoration: "none"}} >
            <WrapperCard
                hoverable
                cover={<img alt="example" src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${image}?alt=media`} height="220px" width="auto" />}
            >
                <Tag>Trả góp 0%</Tag>
                <WrapperName>{name}</WrapperName>
                <WrapperInfo>
                    <span>4.96</span>
                    <StarFilled style={{ color: "#FFC403" }} />
                    <span>| Đã bán 1000+</span>
                </WrapperInfo>
                <WrapperPrice>
                    {parseInt(price).toLocaleString('vi-VN')}đ
                </WrapperPrice>
            </WrapperCard>
        </Link>
    );
};

export default CardComponent;
