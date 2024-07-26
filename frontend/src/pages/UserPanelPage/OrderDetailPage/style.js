import styled from "styled-components";
import { Image } from 'antd';

export const WrapperPage = styled.div`
    display: flex;
    font-family: Roboto, sans-serif;
    justify-content: center;
`

export const WrapperBox = styled.div`
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    gap: 20px;
`

export const WrapperNavbar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #f6fbfc;
    border-radius: 15px;
    width: 200px;
    padding: 10px 20px;
`

export const WrapperBoxTextMain = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 10px;
    background-color: #BCD9E6;
    border: .5px solid #0688B4;
    border-radius: 10px;
    align-items: center;
`

export const WrapperTextNavMain = styled.div`
    color: #0688B4;
    font-size: 14px;
    line-height: 1.2;
`

export const WrapperBoxText = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 10px;
`

export const WrapperTextNav = styled.div`
    color: #6f6f6f;
    font-size: 14px;
    line-height: 1.2;
`

export const WrapperAvatar = styled(Image)`
    border-radius: 50%;
    border: 3px solid #0688B4;
    object-fit: cover;
`

export const WrapperName = styled.div`
    color: #0688B4;
    font-size: 19px;
    font-weight: 700;
    line-height: 10px;
    text-transform: uppercase;
    padding-top: 8px;
`

export const WrapperText = styled.p`
    color: #6f6f6f;
    font-size: 13px;
`

export const WrapperTextAvt = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    line-height: 18px;
    padding: 3px 10px;
`

export const WrapperCardHome = styled.div`
    display: flex;
    background: #fff;
    border-radius: 10px;
    height: 100px;
    width: 100%;
    padding: 20px 0px;
    align-items: center;
    text-align: center;
`

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
`

export const WrapperRight = styled.div`
    flex: 1;
    flex-direction: column;
    display: flex;
    gap: 20px;
`

export const ButtonGroup = styled.div`
    font-size: 14px;
    padding: 10px;
    border: 1px solid #0688B4;
    border-radius: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 5px;
    background-color: ${props => props.active ? "#0688B4" : "#fff"};
    color: ${props => props.active ? "#fff" : "#0688B4"};
    cursor: pointer;
`;

export const CardOrder = styled.div`
    background-color: #fff;
    border-radius: 8px;
`

export const WrapperImg = styled.img`
    height: 100px;
    padding: 20px;
`

export const ButtonClose = styled.button`
    border: 1.5px solid #6f6f6f;
    color: #6f6f6f;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: white;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.1s, background-color 0.1s;

    &:active {
        transform: scale(0.95);
    }
`;