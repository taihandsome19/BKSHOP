import styled from "styled-components";
import { Image, Button } from 'antd';

export const WrapperPage = styled.div`
    display: flex;
    font-family: Roboto, sans-serif;
    justify-content: center;
`;

export const WrapperBox = styled.div`
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    gap: 20px;
`;

export const WrapperNavbar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #f6fbfc;
    border-radius: 15px;
    width: 200px;
    padding: 10px 20px;
`;

export const WrapperBoxTextMain = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 10px;
    background-color: #BCD9E6;
    border: .5px solid #0688B4;
    border-radius: 10px;
    align-items: center;
`;

export const WrapperTextNavMain = styled.div`
    color: #0688B4;
    font-size: 14px;
    line-height: 1.2;
`;

export const WrapperBoxText = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 10px;
`;

export const WrapperTextNav = styled.div`
    color: #6f6f6f;
    font-size: 14px;
    line-height: 1.2;
`;

export const WrapperAvatar = styled(Image)`
    border-radius: 50%;
    border: 3px solid #0688B4;
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

export const WrapperCardHome = styled.div`
    display: flex;
    background: #fff;
    border-radius: 10px;
    height: 100px;
    width: 100%;
    padding: 20px 0px;
    align-items: center;
    text-align: center;
`;

export const CardSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #111;

    &:last-child {
        border-right: none;
    }
`;

export const WrapperCardInfo = styled.div`
    background: #fff;
    border-radius: 10px;
    height: 350px;
    width: 100%;
    padding: 20px 0px;
`;

export const WrapperTitle = styled.div`
    color: #04297A;
    font-size: 19px;
    font-weight: 700;
    line-height: 10px;
    text-transform: uppercase;
`;

export const WrapperTitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
`;

export const WrapperTextInfo = styled.div`
    color: #6f6f6f;
    font-size: 14px;
`;

export const WrapperInfoBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    gap: 50px;
    padding: 10px 30px;
`;

export const WrapperContainer = styled.div`
    flex: 1;
    padding: 20px 0px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
`;

export const WrapperButtonEdit = styled(Button)`
    background-color: #ff4f4f;
    &:hover {
        background-color: #45d94a;
    }
`;

export const WrapperButtonSave = styled(Button)`
    background-color: #3ee046;
    margin-left: 10px;
`;

export const WrapperRight = styled.div`
    flex: 1;
    flex-direction: column;
    display: flex;
    gap: 20px;
`;
