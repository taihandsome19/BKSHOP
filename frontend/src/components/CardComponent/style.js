import styled from "styled-components";
import { Card } from 'antd';


export const WrapperCard = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    }
`

export const WrapperName = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgb(56,56,61);
`

export const WrapperInfo = styled.div`
    font-size: 11px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
    gap: 3px;
    margin: 8px 0;
`

export const WrapperPrice = styled.div`
    text-align: left;
    font-size: 16px;
    line-height: 150%;
    font-weight: 600;
    color: rgb(255, 66, 78);
`