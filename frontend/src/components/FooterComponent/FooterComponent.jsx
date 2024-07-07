import React from 'react';
import {
    WrapContent,
    RightContent,
    FooterItem,
    WrapperPage,
    WrapperBox
} from './style';

const FooterComponent = () => {
    return (
        <WrapperPage>
            <WrapperBox>
                <WrapContent>
                    <div>
                        <div>Địa chỉ: Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương</div>
                        <br />
                        <div>© 2024 Nhóm 3 - Đồ án tổng hợp hướng công nghệ phần mềm</div>
                    </div>
                    <RightContent>
                        <FooterItem>GIỚI THIỆU</FooterItem>
                        <FooterItem>VỀ CHÚNG TÔI</FooterItem>
                    </RightContent>
                </WrapContent>
            </WrapperBox>
        </WrapperPage>
    );
}

export default FooterComponent;
