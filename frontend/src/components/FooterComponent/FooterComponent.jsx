import React from 'react'
import {
    WrapperFooter,
    WrapContent,
    RightContent,
    FooterItem
} from './style'

const FooterComponent = () => {
  return (
    <WrapperFooter>
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
    </WrapperFooter>
  )
}

export default FooterComponent
