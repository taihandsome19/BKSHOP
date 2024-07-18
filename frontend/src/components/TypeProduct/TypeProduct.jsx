import React from "react";
import {WrapButton} from './style';

const handleClick = (name) => {
    window.location.href = `/product/brand?brand=${name}`;
};

const TypeProduct = ({name}) => {
    return(
        <WrapButton onClick={() => handleClick(name)} style={{fontWeight: "bold", color: '#444'}}>{name}</WrapButton>
    )
}

export default TypeProduct