import React from "react";
import { Link } from "react-router-dom";
import {WrapButton} from './style';

const TypeProduct = ({name}) => {
    return(
        <Link to={'/product?type='+name} style={{textDecoration: "none"}}>
            <WrapButton style={{fontWeight: "bold", color: '#444'}}>{name}</WrapButton>
        </Link>
    )
}

export default TypeProduct