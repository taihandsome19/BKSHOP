import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import { WrapContent, WrapperDefault } from "./style";

const DefaultComponent = ({children}) => {
    return(
        <WrapperDefault>
            <HeaderComponent />
            <WrapContent>
                {children}
            </WrapContent>
            <FooterComponent />
        </WrapperDefault>
    )
}

export default DefaultComponent;
