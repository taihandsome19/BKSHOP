import styled from "styled-components";
import { Card } from 'antd';

export const WrapperCard = styled(Card)`
    height: 390px;
    position: relative;
    border-radius: 10px;
    border: none;
    padding: 30px 5px 5px 5px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15);
`

export const Tag = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: #fff;
    border: 1px solid #0c53b7;
    color: #0c53b7;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 8px;
`

export const WrapperName = styled.div`
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: rgb(56,56,61);
    height: 32px;
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
    font-weight: bold;
    color: #0688b4;
`
