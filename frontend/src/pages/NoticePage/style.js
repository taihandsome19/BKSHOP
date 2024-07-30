import styled from "styled-components";
import { Image } from "antd";

export const WrapperPage = styled.div`
    display: flex;
    font-family: Roboto, sans-serif;
    justify-content: center;
`;

export const WrapperBox = styled.div`
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 20px;
`

export const WrapperAvatar = styled(Image)`
    border-radius: 50%;
    border: 2px solid #6f6f6f;
    object-fit: cover;
`;

export const WrapperName = styled.div`
    color: #0688B4;
    font-size: 19px;
    font-weight: 700;
    line-height: 10px;
    text-transform: uppercase;
    padding-top: 8px;
`;

export const WrapperText = styled.p`
    color: #6f6f6f;
    font-size: 13px;
`;

export const WrapperTextAvt = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    line-height: 18px;
    padding: 3px 10px;
`;

export const WrapperCard = styled.div`
    background: #fff;
    border-radius: 10px;
    height: 500px;
`;

export const FixedWidthDiv = styled.div`
    width: 350px;
    border-right: 1px solid #6f6f6f;
    overflow-y: auto; 
    overflow-x: hidden;
    padding: 10px;
`;

export const FlexibleDiv = styled.div`
    flex: 1;
    display: flex;
`;