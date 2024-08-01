import styled from "styled-components";
import { Image } from "antd";

export const ButtonComfirm= styled.button`
    border: 1.5px solid #4caf50;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    background-color: #4caf50;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.1s, background-color 0.1s;

    &:active {
        transform: scale(0.95);
    }
`;

export const EditButton = styled.button`
  background-color: ${props => (props.isEditing ? '#4CAF50' : '#1777ff')};
  color: white;
  border: none;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px; /* Bo góc */
  transition: background-color 0.3s, transform 0.2s; /* Hiệu ứng khi click */

  &:active {
    transform: scale(0.95); /* Hiệu ứng khi click */
  }
`;

export const WrapperRow = styled.p`
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  flex: 1;
  height: 25px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  padding: 2px 10px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #40a9ff; 
    outline: none; 
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`

export const StyledInputArea = styled.textarea`
  flex: 1;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  padding: 2px 10px;
  transition: border-color 0.3s;
  resize: vertical;
  min-height: 60px;

  &:focus {
    border-color: #40a9ff; 
    outline: none; 
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`

export const Deletebutton = styled.button`
  background-color: #ff4f4e;
  color: white;
  border: none;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px; /* Bo góc */
  transition: background-color 0.3s, transform 0.2s; /* Hiệu ứng khi click */

  &:active {
    transform: scale(0.95); /* Hiệu ứng khi click */
  }
`;

export const WrapperAvatar = styled(Image)`
    border-radius: 50%;
    object-fit: cover;
`;