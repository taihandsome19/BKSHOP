import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import { WrapContent, WrapperDefault } from "./style";
import { UserCartProvider } from '../UserCartContext/UserCartContext';

const DefaultComponent = ({ children }) => {
  return (
    <UserCartProvider>
      <WrapperDefault>
        <HeaderComponent />
        <WrapContent>
          {children}
        </WrapContent>
        <FooterComponent />
      </WrapperDefault>
    </UserCartProvider>
  );
};

export default DefaultComponent;
