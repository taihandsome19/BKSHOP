import React from "react";
import { useNavigate } from "react-router-dom";
import { WrapButton } from './style';

const TypeProduct = ({ name }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/brand?brand=${name}`);
    };

    return (
        <WrapButton onClick={handleClick} style={{ fontWeight: "bold", color: '#444' }}>
            {name}
        </WrapButton>
    );
}

export default TypeProduct;
