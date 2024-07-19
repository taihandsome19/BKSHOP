import styled from "styled-components";

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
    min-height: 100vh;
`;

export const ButtonSort = styled.div`
    padding: 10px;
    border: 1px solid #0688B4;
    border-radius: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 5px;
    background-color: ${props => props.active ? "#d5eaf2" : "transparent"};
    color: ${props => props.active ? "#0688B4" : "#444"};
    cursor: pointer;
`;

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 30px;
`