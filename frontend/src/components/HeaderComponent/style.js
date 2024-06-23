import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 20px 120px;
    background-color: #0688B4;
`

export const WrapperTextHeader = styled.span`
    font-size: 25px;
    color: #fff;
    font-weight: bold;
    text-align: left;
`

export const WrapperAccountHeader = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
`

export const WrapperTypeProduct = styled.div`
    display: flex;
    font-size: 13px;
    gap: 16px;
    justify-content: flex-start;
    padding-top: 10px;
    color: #fff;
`

export const WrapperAccountDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const WrapperAccountText = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
