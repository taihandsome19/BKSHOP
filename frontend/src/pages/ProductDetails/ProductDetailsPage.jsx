import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  WrapperPage,
  WrapperBox,
  WrapperTitle,
  SwipperContainer,
  SwiperImage,
  WrapperOder,
  WrapperText,
  WrapSelect,
  WrapperTextSelect,
  WrapperStore,
  WrappePrice,
  WrappePriceText,
  WrappePriceTextSmall,
  WrapperContainerBuy,
  ButtonBuyNow,
  ButtonCart,
  CardInfo,
  WrapperSectionText
} from "./style";
import {
  ShoppingCartOutlined,
  CheckCircleFilled
} from '@ant-design/icons';
import img from "../../assets/images/ip13/ip13.webp";
import img2 from "../../assets/images/ip13/ip13xanh.webp";
import img3 from "../../assets/images/ip13/ip13den.webp";
import img4 from "../../assets/images/ip13/ip13do.webp";
import img5 from "../../assets/images/ip13/ip13hong.webp";
import { Helmet } from "react-helmet";
import VoteComponent from '../../components/VoteComponent/VoteComponent';


SwiperCore.use([Navigation, Pagination]);

const ProductDetailsPage = () => {
  const images = [
    img, img2, img3, img4, img5
  ];

  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleCapacityClick = (index) => {
    setSelectedCapacity(index === selectedCapacity ? null : index);
  };

  const handleColorClick = (index) => {
    setSelectedColor(index === selectedColor ? null : index);
  };

  const colors = [
    { label: "Trắng", value: "white", imga: img },
    { label: "Xanh", value: "blue", imga: img2 },
    { label: "Đen", value: "black", imga: img3 },
    { label: "Đỏ", value: "red", imga: img4 },
    { label: "Hồng", value: "pink", imga: img5 }
  ];

  return (
    <WrapperPage>
      <Helmet>
        <title>iPhone 13 128GB Chính hãng VN/A - BKSHOP</title>
      </Helmet>
      <WrapperBox>
        <div style={{ paddingBottom: '20px' }}>
          <WrapperTitle>
            iPhone 13 128GB | Chính hãng VN/A
          </WrapperTitle>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <SwipperContainer>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log('slide change')}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
                  <SwiperImage src={image} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwipperContainer>
          <WrapperOder>
            <WrapperText>Chọn dung lượng</WrapperText>
            <WrapperStore>
              {[128, 256, 512].map((capacity, index) => (
                <WrapSelect
                  key={index}
                  onClick={() => handleCapacityClick(index)}
                  active={selectedCapacity === index}
                >
                  <WrapperTextSelect style={{ color: "#111" }}>{capacity}GB</WrapperTextSelect>
                </WrapSelect>
              ))}
            </WrapperStore>

            <WrapperText>Chọn màu sắc</WrapperText>
            <WrapperStore>
              {colors.map((color, index) => (
                <WrapSelect
                  key={index}
                  onClick={() => handleColorClick(index)}
                  active={selectedColor === index}
                >
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                      <img src={color.imga} alt="icon" preview={false} height={"30px"}></img>
                      <WrapperTextSelect style={{ color: "#111" }}>{color.label}</WrapperTextSelect>
                    </div>
                </WrapSelect>
              ))}
            </WrapperStore>
            <WrappePrice>
              <div style={{background: "#fff", border: "1px solid #0688B4", borderRadius: "5px", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", gap: "8px", height: "72px"}}>
                <WrappePriceText>13.790.000đ</WrappePriceText>
                <WrappePriceTextSmall>MUA NGAY GIÁ QUÁ RẺ</WrappePriceTextSmall>
              </div>
            </WrappePrice>
            <WrapperContainerBuy>
              <ButtonBuyNow>
                <div style={{color: "#fff", fontSize: "18px", fontWeight: "bold"}}>MUA NGAY</div>
                <div style={{color: "#fff", fontSize: "13px", fontWeight: "200px"}}>&#40;Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng&#41;</div>
              </ButtonBuyNow>
              <ButtonCart>
                <ShoppingCartOutlined style={{fontSize: "28px"}}/>
                <div style={{fontSize: "9px"}}>Thêm vào giỏ</div>
              </ButtonCart>
            </WrapperContainerBuy>
          </WrapperOder>
        </div>
        <WrapperTitle style={{fontSize: "17px", fontWeight: "600"}}>
          Thông tin sản phẩm
        </WrapperTitle>
        <div style={{display: "flex", gap: "20px"}}>
          <CardInfo>
            <div style={{minHeight: "100px"}}>
              <WrapperSectionText>
                Thông số kỹ thuật
              </WrapperSectionText>
            </div>
            <div>
              <WrapperSectionText>
                Mô tả sản phẩm
              </WrapperSectionText>
            </div>
          </CardInfo>
          <div style={{ border: "1px solid #d1d5db", borderRadius: "5px", margin: '15px 0', width: "480px", height: "300px"}}>
                <div style={{background: "#d1d5db", borderRadius: "5px 0 5px"}}>
                  <div style={{backgroundColor: "#d1d5db", fontSize: "14px", padding: "10px", fontWeight: "600"}}>
                    ƯU ĐÃI CHO BẠN
                  </div>
                </div>
                <div style={{padding: "15px 10px"}}>
                  <div style={{display: "flex", gap: "5px", marginBottom: "15px"}}>
                    <CheckCircleFilled style={{color: "#4CAF50", fontSize: "15px"}}/>
                    <div style={{fontSize: "12px", fontWeight: "400"}}>Tháng khuyến mãi: Săn ngay smartphone cao cấp, giảm giá đến 30%</div>
                  </div>
                  <div style={{display: "flex", gap: "5px", marginBottom: "15px"}}>
                    <CheckCircleFilled style={{color: "#4CAF50", fontSize: "15px"}}/>
                    <div style={{fontSize: "12px", fontWeight: "400"}}>Khuyến mãi đặc biệt: Trả góp 0% lãi suất cho iPhone và Samsung Galaxy</div>
                  </div>
                  <div style={{display: "flex", gap: "5px", marginBottom: "15px"}}>
                    <CheckCircleFilled style={{color: "#4CAF50", fontSize: "15px"}}/>
                    <div style={{fontSize: "12px", fontWeight: "400"}}>Giảm giá sốc: Mua điện thoại mới với giá chỉ từ 1 triệu đồng!</div>
                  </div>
                  <div style={{display: "flex", gap: "5px", marginBottom: "15px"}}>
                    <CheckCircleFilled style={{color: "#4CAF50", fontSize: "15px"}}/>
                    <div style={{fontSize: "12px", fontWeight: "400"}}>Mua 1 tặng 1: Điện thoại phổ thông, giá chỉ từ 500 nghìn đồng</div>
                  </div>
                  <div style={{display: "flex", gap: "5px", marginBottom: "15px"}}>
                    <CheckCircleFilled style={{color: "#4CAF50", fontSize: "15px"}}/>
                    <div style={{fontSize: "12px", fontWeight: "400"}}>Hè rực rỡ: Giảm giá 50% phụ kiện khi mua smartphone bất kỳ</div>
                  </div>
                  <div style={{display: "flex", gap: "5px", marginBottom: "15px"}}>
                    <CheckCircleFilled style={{color: "#4CAF50", fontSize: "15px"}}/>
                    <div style={{fontSize: "12px", fontWeight: "400"}}>Đổi cũ lấy mới: Khuyến mãi lên đến 2 triệu đồng cho khách hàng đổi máy cũ</div>
                  </div>
                  <div style={{display: "flex", gap: "5px", marginBottom: "15px"}}>
                    <CheckCircleFilled style={{color: "#4CAF50", fontSize: "15px"}}/>
                    <div style={{fontSize: "12px", fontWeight: "400"}}>Đặt trước ngay: Nhận ngay quà tặng hấp dẫn cho iPhone 16 mới!</div>
                  </div>
                  <div style={{display: "flex", gap: "5px", marginBottom: "15px"}}>
                    <CheckCircleFilled style={{color: "#4CAF50", fontSize: "15px"}}/>
                    <div style={{fontSize: "12px", fontWeight: "400"}}>Flash sale 1 ngày: Giảm giá cực sốc cho các dòng điện thoại hot nhất</div>
                  </div>
                </div>
          </div>
        </div>
        <VoteComponent/>
      </WrapperBox>
    </WrapperPage>
  );
};

export default ProductDetailsPage;