<<<<<<< HEAD
import styled from "styled-components";
=======
import styled, {keyframes} from "styled-components";
>>>>>>> nhap

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 20px;
<<<<<<< HEAD
=======
    padding-bottom: 30px;
`
export const WrapperProductsSale = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(200px, 1fr));
    gap: 10px;
    padding: 20px;
>>>>>>> nhap
`

export const WrapperPage = styled.div`
    display: flex;
    font-family: Roboto, sans-serif;
    justify-content: center;
`

export const HighlightedContainer = styled.div`
<<<<<<< HEAD
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
=======
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(125deg, #0087b5, #7bd8f7);
  background-size: 200% 200%;
  animation: gradientAnimation 5s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    20% {
      background-position: 25% 50%;
    }
    40% {
      background-position: 50% 50%;
    }
    60% {
      background-position: 75% 50%;
    }
    80% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;


export const ButtonMore = styled.button`
    border: 1.5px solid #0688B4;
    border-radius: 10px;
    width: 180px;
    background-color: white;
    color: #0688B4;
    font-size: 13px;
    cursor: pointer;
    transition: transform 0.1s, background-color 0.1s;
    padding: 5px;

    &:active {
        background-color: rgba(78, 174, 206, 0.2);
        transform: scale(0.95);
    }
`;

const textAnimation = keyframes`
  0%, 100% {
    color: #fff;
    -webkit-text-stroke: 0px transparent;
  }
  50% {
    color: transparent;
    -webkit-text-stroke: 1px #fff;
  }
`;

export const AnimatedText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #fff;
  animation: ${textAnimation} 1s infinite;
>>>>>>> nhap
`;