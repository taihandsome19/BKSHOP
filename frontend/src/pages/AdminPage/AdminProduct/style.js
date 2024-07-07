import styled from "styled-components";

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