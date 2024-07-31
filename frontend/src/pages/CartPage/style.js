import styled from "styled-components";
import { InputNumber } from "antd";

export const WrapperPage = styled.div`
    display: flex;
    font-family: Roboto, sans-serif;
    justify-content: center;
`;

export const WrapperBox = styled.div`
    width: 600px;
    padding-top: 20px;
    padding-bottom: 20px;

    & > * {
        margin-bottom: 15px;
    }

    & > *:last-child {
        margin-bottom: 0;
    }
`;

export const HeaderAreaCart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #323232;
    font-weight: bold;
    padding: 10px;
    border-bottom: 2px solid #F5F5F5;
    position: relative; /* Add this line */
`;

export const IconWrapper = styled.div`
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 10px;
`;

export const SelectAll = styled.div`
    justify-content: space-between;
`;

export const DeleteDiv = styled.div`
  font-size: 14px;
  color: #9F9D9D;

  &:hover {
    text-decoration: underline;
  }
`;

export const CardBuy = styled.div`
    position: fixed;
    bottom: 0;
    width: 600px;
    border-radius: 10px 10px 0 0;
    border: 1px solid rgba(145, 158, 171, .239);
    box-shadow: 0 -4px 20px -1px rgba(40, 124, 234, .15);
    background-color: #fff;
`;

export const BuyButton = styled.button`
    background-color: #0688B4;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

    &:hover {
        background-color: #056b91;
    }
`;

export const WrappCard = styled.div`
    background-color: #fff;
    border: 1px solid rgba(145, 158, 171, .239);
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 10px;
    padding-top: 15px;
    position: relative;
`;

export const WrapperProduct = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
`;

export const ButtonProduct = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    background-color: ${({ increment }) => (increment ? '#F3F3F3' : '#F3F3F3')};
    color: "#444";
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
`;

export const StyledInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
  border: 1px solid #ccc; /* Default border */
  outline: none;
  text-align: center;
  border-radius: 5px;
  height: 28px;
  padding: 0;
`;

export const CenteredInputNumber = styled(InputNumber)`
  display: flex;
  align-items: center;
  text-align: center;
  width: 50px;
  height: 30px;
  padding: 0;
  color: #444;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  box-shadow: none;
  
  .ant-input-number-input {
    text-align: center;
  }

  &.ant-input-number-disabled {
    background-color: #fff;
    border-color: #f5f5f5; 
  }

  &.ant-input-number-disabled:hover {
    background-color: #fff;
  }
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8); /* Semi-transparent white */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #d0d2d5;
    font-weight: bold;
    border-radius: 8px;
    pointer-events: none; /* Prevent overlay from blocking mouse events */
`;
