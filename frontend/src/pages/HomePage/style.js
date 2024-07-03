import styled from "styled-components";

export const WrapperTypeProduct = styled.div`
    display: flex;
    font-size: 13px;
    align-items: center;
    gap: 16px;
    justify-content: flex;
    padding: 10px;
    height: 30px;
`

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 30px;
`
