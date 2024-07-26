import { Row } from "antd";
import styled from "styled-components";

export const WrapperPage = styled(Row)`
    background-color: #495057;
    color: #fff;
    display: flex;
    font-family: Roboto, sans-serif;
    justify-content: center;
    align-items: center;
`

export const WrapperBox = styled.div`
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 20px;
`

export const WrapContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%%;
    font-size: 13px;
`;

export const RightContent = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 20px;
`;

export const FooterItem = styled.div`
    margin-left: 20px;
    font-weight: bold;
`;
