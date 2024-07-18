import styled from "styled-components";

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 20px;
`

export const WrapperPage = styled.div`
    display: flex;
    font-family: Roboto, sans-serif;
    justify-content: center;
`

export const HighlightedContainer = styled.div`
  background-color: #0688B4;
  padding: 10px;
  width: 200px;
  margin-top: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Thêm đổ bóng */
  background: linear-gradient(135deg, #0688B4, #0A9BDA); /* Thêm gradient */
`;

export const HighlightedText = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  text-align: center; /* Căn giữa văn bản */
`;