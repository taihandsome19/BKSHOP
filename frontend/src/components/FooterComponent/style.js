import { Row } from "antd";
import styled from "styled-components";

export const WrapperFooter = styled(Row)`
    padding: 20px 120px;
    background-color: #495057;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const WrapContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 13px;
`;

export const RightContent = styled.div`
    display: flex;
    margin-left: auto;
`;

export const FooterItem = styled.div`
    margin-left: 20px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
