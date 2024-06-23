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
            style={{ width: 200}}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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