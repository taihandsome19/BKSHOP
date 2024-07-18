import React from 'react'
import {WrapperPage, WrapperTypeProduct} from './style'
import TypeProduct from "../../components/TypeProduct/TypeProduct";

const arr = ["Apple", "Vivo", "Oppo", "Xiaomi", "Samsung", "OnePlus"]

const NavbarTypeComponent = () => {
    return (
        <div style={{ background: '#fff' }}>
            <WrapperPage>
                <div style={{ width: '1200px' }}>
                    <WrapperTypeProduct>
                        {arr.map((item) => {
                            return (
                                <TypeProduct name={item} key={item} />
                            )
                        })}
                    </WrapperTypeProduct>
                </div>
            </WrapperPage>
        </div>
    )
}

export default NavbarTypeComponent