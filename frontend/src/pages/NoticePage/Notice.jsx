import React from 'react'
import {
    WrapperPage,
    WrapperBox,
    WrapperName,
    WrapperText,
    WrapperTextAvt,
    WrapperAvatar,
    WrapperCard,
    FixedWidthDiv,
    FlexibleDiv
} from './style'

const Notice = () => {
    const name = localStorage.getItem("User_name");
    const email = localStorage.getItem("User_email");

    return (
        <div style={{ backgroundColor: "#F6F6F6" }}>
            <WrapperPage>
                <WrapperBox>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <WrapperAvatar src={`https://ui-avatars.com/api/?background=random&name=${name.replace(" ", "+")}`} alt="User Avatar" preview={false} />
                        <WrapperTextAvt >
                            <WrapperName>{name}</WrapperName>
                            <WrapperText>{email}</WrapperText>
                        </WrapperTextAvt>
                    </div>
                    <div style={{ fontSize: '20px', padding: '15px 0', fontWeight: 'bold', color: '#444' }}>
                        THÔNG BÁO HỆ THỐNG
                    </div>
                    <WrapperCard style={{ display: 'flex' }}>
                        <FixedWidthDiv>
                            j
                        </FixedWidthDiv>
                        <FlexibleDiv>
                            k
                        </FlexibleDiv>
                    </WrapperCard>
                </WrapperBox>
            </WrapperPage>
        </div>
    )
}

export default Notice