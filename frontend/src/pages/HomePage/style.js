import styled from "styled-components";


export const WrapperPage = styled.div`
    display: flex;
    font-family: Roboto, sans-serif;
    justify-content: center;
`

export const WrapperTypeProduct = styled.div`
    display: flex;
    font-size: 13px;
    align-items: center;
    gap: 20px;
    padding: 10px 0;
    height: 30px;
    font-family: 'Roboto', sans-serif;
`

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 30px;
`
