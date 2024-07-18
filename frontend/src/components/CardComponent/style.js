import styled from "styled-components";
import { Card } from 'antd';

export const WrapperCard = styled(Card)`
    position: relative;
    border-radius: 4px;
    border: none;
    padding: 30px 10px 5px 5px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15);
`

export const Tag = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #0688B4;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 3px;
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
    font-weight: bold;
    color: #0688b4;
`
