import styled from 'styled-components';

export const CardInfo = styled.div`
    background: #fff;
    border-radius: 10px;
    margin: 15px 0;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15);
    width: 700px;
    min-height: 300px;
`;

export const WrapperSectionText = styled.div`
    width: 100%;
    font-size: 16px;
    font-weight: 600;
`;

export const WrapperCardRate = styled.div`
    display: flex;
    background: #fff;
    width: 100%;
    padding: 20px 0px;
    align-items: center;
    text-align: center;
    gap: 20px;
`;

export const RateLeft = styled.div`
    width: 40%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    border-right: 1px solid #ccc;
    padding-right: 3px;
`;

export const RateRight = styled.div`
    width: 60%;
`;

export const WrapperTitle = styled.div`
    width: 100%;
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
`;

export const WrapperText = styled.div`
    font-size: 13px;
    font-weight: 500;
`;

export const LineRate = styled.div`
    border-radius: 5px;
    height: 8px;
    width: 70%;
    background-color: #EDEDED;
`;

export const LineRateColor = styled.div`
    border-radius: 5px;
    height: 8px;
    background-color: #0688B4;
`;

export const CommentBox = styled.div`
    padding: 15px 15px;
`;

export const CommentWrapper = styled.div`
    padding: 15px 15px;
    &:not(:last-child) {
        border-bottom: 1px solid #EDEDED;
    }
`;

export const AvatarImage = styled.img`
    border-radius: 50%;
    width: 45px;
    border: 1px solid #EDEDED;
`;

export const ButtonMore = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    padding: 10px 80px;
    background-color: #0688B4;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background-color: #056a8d;
    }
    gap: 5px;
`
