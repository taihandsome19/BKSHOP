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
`;

export const WrapperTitle = styled.div`
    width: 100%;
    padding-bottom: 15px;
    font-size: 18px;
    font-weight: 700;
    border-bottom: 2px solid #F5F5F5;
`;

export const SwipperContainer = styled.div`
    width: 700px;
    height: 400px;
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #0688B4;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const SwiperImage = styled.img`
    height: 400px;
    border-radius: 10px;
`;

export const WrapperOder = styled.div`
    flex: 1;
`;

export const WrapperText = styled.div`
    color: #444;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
    line-height: 1.2;
`;

export const WrapperTextSelect = styled.div`
    color: #444;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
    margin-top: 8px;
    line-height: 1.2;
`;

export const WrapperStore = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px;
`;

export const WrapSelect = styled.button`
    padding: 5px 0;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    background: #fff;
    border: 1px solid ${(props) => (props.active ? "#0688B4" : "#D1D5DB")};
    border-radius: 8px;
    color: ${(props) => (props.active ? "#0688B4" : "#444")};
    margin-bottom: 10px;
    transition: background-color 0.3s ease;
    position: relative;

    ::after {
        border-radius: 6px 0 10px 0;
        color: #fff;
        content: "✓";
        font-size: 10px;
        height: 13px;
        left: 0;
        align-items: center;
        position: absolute;
        top: 0;
        width: 18px;
        background-color: ${(props) => (props.active ? "#0688B4" : "transparent")};
        display: ${(props) => (props.active ? "block" : "none")};
    }
`;

export const WrappePrice = styled.div`
    background: #eeeeef;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
    min-height: 65px;
`;

export const WrappePriceText = styled.div`
    color: #0688B4;
    font-size: 17px;
    font-weight: 700;
`;

export const WrappePriceTextSmall = styled.div`
    color: #6f6f6f;
    font-size: 13px;
    font-weight: 500;
`;

export const WrapperContainerBuy = styled.div`
    display: flex;
    gap: 10px;
    height: 79px;
`;

export const ButtonBuyNow = styled.button`
    background-color: #0688B4;
    width: calc(100% - 84px);
    border-radius: 5px;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: transform 0.1s, background-color 0.1s;

    &:active {
        background-color: rgba(78, 174, 206, 0.8);
        transform: scale(0.95);
    }
`;

export const ButtonSoldOut = styled.button`
    background-color: #92a8af;
    width: 100%;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: transform 0.1s, background-color 0.1s;
`;

export const ButtonCart = styled.button`
    border: 1.5px solid #0688B4;
    border-radius: 5px;
    width: 79px;
    background-color: white;
    color: #0688B4;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.1s, background-color 0.1s;

    &:active {
        background-color: rgba(78, 174, 206, 0.2);
        transform: scale(0.95);
    }
`;

export const CardInfo = styled.div`
    background: #fff;
    border-radius: 10px;
    margin: 15px 0;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15);
    width: 700px;
    min-height: 30px;
`

export const WrapperSectionText = styled.div`
    width: 100%;
    padding: 15px 15px 15px 15px;
    font-size: 16px;
    font-weight: 600;
`;
export const WrapperContent = styled.div`
    width: 100%;
    font-size: 14px;
`;