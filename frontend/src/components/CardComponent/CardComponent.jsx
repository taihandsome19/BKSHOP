import React from "react";
import {
    WrapperName,
    WrapperInfo,
    WrapperPrice,
    WrapperCard,
} from './style'

import { StarFilled } from '@ant-design/icons'

const CardComponent = () => {
    return(
        <WrapperCard
            hoverable
            cover={<img alt="example" src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-pink-2-600x600.jpg" />}
        >
            <WrapperName>Điện thoại Apple Iphone 13</WrapperName>
            <WrapperInfo>
                <span>4.96</span>
                <StarFilled style={{color: "#FFC403"}} />
                <span>| Đã bán 1000+</span>
            </WrapperInfo>
            <WrapperPrice>
                18.000.000
                đ
            </WrapperPrice>

        </WrapperCard>
    )
}

export default CardComponent