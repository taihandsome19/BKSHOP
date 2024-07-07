import styled from "styled-components";
import { Image } from "antd";

export const SlideBarContainer = styled.div`
  width: 270px;
  background-color: #fff;
  position: fixed;
  transition: 0.2s ease-in;
  height: 100%;
  z-index: 11;
  border-right: 1px solid rgb(229, 234, 239);
`;

export const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 270px;
  right: 0px;
  background-color: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`;

export const WrapperAvatar = styled(Image)`
  border-radius: 50%;
  border: 1px solid #0688B4;
  object-fit: cover;
`;

export const WrapperButton = styled.div`
    font-size: 13px;
    color: #2A3546;
`