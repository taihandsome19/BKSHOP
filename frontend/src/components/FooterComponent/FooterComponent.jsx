import React from 'react';
import {
    WrapContent,
    RightContent,
    FooterItem,
    WrapperPage,
    WrapperBox
} from './style';
import bank from '../../assets/images/bank-transfer.png';
import cod from '../../assets/images/49410.jpg';

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
                        <div>
                            <FooterItem>CHẤP NHẬN THANH TOÁN</FooterItem>
                            <div style={{display: 'flex', justifyContent: 'end', alignContent: 'center', alignItems: 'center', gap: '5px', paddingTop: '5px'}}>
                                <img src={bank} alt='bank' height='30px' width='auto'/>
                                <img src={cod} alt='cod' height='20px' width='auto'/>
                            </div>
                        </div>
                    </RightContent>
                </WrapContent>
            </WrapperBox>
        </WrapperPage>
    );
}

export default FooterComponent;
