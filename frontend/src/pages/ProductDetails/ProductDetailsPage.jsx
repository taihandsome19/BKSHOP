import React, { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { UserCartContext } from '../../components/UserCartContext/UserCartContext';
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
  WrapperSectionText,
  WrapperContent,
  ButtonSoldOut
} from "./style";
import {
  ShoppingCartOutlined,
  CheckCircleFilled
} from '@ant-design/icons';
import { Helmet } from "react-helmet";
import VoteComponent from '../../components/VoteComponent/VoteComponent';
import { message, Spin } from 'antd';
import axios from 'axios';

SwiperCore.use([Navigation, Pagination]);

const ProductDetailsPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const productId = searchParams.get('product_id');
  const { setUserCart } = useContext(UserCartContext);
  const [infoDetail, setInfoDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [listreview, setlistreview] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/product/detail?product_id=${productId}`);
        setInfoDetail(res.data);
        setlistreview(res.data.review)
        setLoading(false);
      } catch (error) {
        message.error('Lỗi khi lấy thông tin sản phẩm');
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    if (infoDetail) {
      const memorysizeList = infoDetail.description.memorysize;
      const colorList = infoDetail.description.color;
      const inventory = infoDetail.inventory;

      let found = false;
      for (let colorIndex = 0; colorIndex < colorList.length && !found; colorIndex++) {
        const color = colorList[colorIndex];
        for (let capacityIndex = 0; capacityIndex < memorysizeList.length && !found; capacityIndex++) {
          const capacity = memorysizeList[capacityIndex];
          if (inventory[color] && inventory[color][capacity] > 0) {
            setSelectedColor(colorIndex);
            setSelectedCapacity(capacityIndex);
            found = true;
          }
        }
      }
    }
  }, [infoDetail]);


  const handleCapacityClick = (index) => {
    const color = infoDetail.description.color[selectedColor];
    const capacity = infoDetail.description.memorysize[index];
    if (infoDetail.inventory[color][capacity] > 0) {
      setSelectedCapacity(index);
    }
  };

  const handleColorClick = (index) => {
    if (swiperInstance) {
      goToSlide(swiperInstance, index);
    }
    const color = colorList[index];
    const isAnyInStock = memorysizeList.some((capacity) => inventory[color] && inventory[color][capacity] > 0);
    if (isAnyInStock) {
      setSelectedColor(index);
    }
  };
  

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      />
    );
  }

  if (!infoDetail) {
      window.location.href = '/404';
      return;
  }

  const memorysizeList = infoDetail?.description.memorysize;
  const colorList = infoDetail?.description.color;
  const description = infoDetail?.description.detail;
  const inventory = infoDetail?.inventory;
  const listImage = infoDetail?.image;

  const isOutOfStock = !inventory[colorList[selectedColor]] || inventory[colorList[selectedColor]][memorysizeList[selectedCapacity]] === 0;

  const handleAddToCart = async () => {
    const payload = {
      color: colorList[selectedColor],
      image: listImage[selectedColor],
      memorysize: memorysizeList[selectedCapacity],
      name: infoDetail.name,
      price: infoDetail.price,
      productId: productId,
      quantity: 1
    };
  
    try {
      const res = await axios.post('http://localhost:3001/user/cart', payload);
      message.success('Sản phẩm đã được thêm vào giỏ hàng');
      setUserCart(res.data.size);
    } catch (error) {
      message.error('Vui lòng đăng nhập để mua hàng');
      setTimeout(() => {
        window.location.href = '/auth/log_in';
      }, 3000);
    }
  };  

  const handleBuyNow = async () => {
    const selectedProducts = [{
      color: colorList[selectedColor],
      image: listImage[selectedColor],
      memorysize: memorysizeList[selectedCapacity],
      name: infoDetail.name,
      price: infoDetail.price,
      productId: productId,
      quantity: 1
    }];
    localStorage.setItem('dataPayment', JSON.stringify(selectedProducts));
    window.location.href = '/cart/payment_info?action=buynow';
  };

  const goToSlide = (swiper, index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };
  

  return (
    <WrapperPage>
      <Helmet>
        <title>{infoDetail.name}</title>
      </Helmet>
      <WrapperBox>
        <div style={{ paddingBottom: '20px' }}>
          <WrapperTitle>
            {infoDetail.name}
          </WrapperTitle>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <SwipperContainer>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiperInstance) => {
                setSwiperInstance(swiperInstance);
              }}
            >
              {listImage.map((image, index) => (
                <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
                  <SwiperImage src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${image}?alt=media`} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwipperContainer>
          <WrapperOder>
            <WrapperText>Chọn dung lượng</WrapperText>
            <WrapperStore>
              {memorysizeList.map((capacity, index) => (
                <WrapSelect
                  key={index}
                  onClick={() => handleCapacityClick(index)}
                  active={selectedCapacity === index}
                  disabled={!inventory[colorList[selectedColor]] || inventory[colorList[selectedColor]][capacity] === 0}
                  style={{
                    opacity: !inventory[colorList[selectedColor]] || inventory[colorList[selectedColor]][capacity] === 0 ? 0.5 : 1,
                    pointerEvents: !inventory[colorList[selectedColor]] || inventory[colorList[selectedColor]][capacity] === 0 ? 'none' : 'auto'
                  }}
                >
                  <WrapperTextSelect style={{ color: "#111" }}>{capacity}</WrapperTextSelect>
                </WrapSelect>
              ))}
            </WrapperStore>

            <WrapperText>Chọn màu sắc</WrapperText>
            <div style={{ minHeight: '120px' }}>
              <WrapperStore>
                {colorList.map((color, index) => {
                  const isColorInStock = inventory[color] && inventory[color][memorysizeList[selectedCapacity]] > 0;
                  return (
                    <WrapSelect
                      key={index}
                      onClick={() => handleColorClick(index)}
                      active={selectedColor === index}
                      disabled={!isColorInStock}
                      style={{
                        opacity: !isColorInStock ? 0.5 : 1,
                        pointerEvents: !isColorInStock ? 'none' : 'auto'
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <img src={`https://firebasestorage.googleapis.com/v0/b/co3103.appspot.com/o/${listImage[parseInt(index)]}?alt=media`} alt="icon" preview={false} height={"30px"}></img>
                        <WrapperTextSelect style={{ color: "#111" }}>{color}</WrapperTextSelect>
                      </div>
                    </WrapSelect>
                  );
                })}
              </WrapperStore>
            </div>
            <WrappePrice>
              <div style={{ background: "#fff", border: "1px solid #0688B4", borderRadius: "5px", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", gap: "8px", height: "72px" }}>
                <WrappePriceText>{parseInt(infoDetail.price).toLocaleString('vi-VN')}đ</WrappePriceText>
                <WrappePriceTextSmall>MUA NGAY GIÁ QUÁ RẺ</WrappePriceTextSmall>
              </div>
            </WrappePrice>

            <WrapperContainerBuy>
              {!isOutOfStock ? (
                <>
                  <ButtonBuyNow onClick={handleBuyNow}>
                    <div style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}>MUA NGAY</div>
                    <div style={{ color: "#fff", fontSize: "13px", fontWeight: "200px" }}>&#40;Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng&#41;</div>
                  </ButtonBuyNow>
                  <ButtonCart onClick={handleAddToCart}>
                    <ShoppingCartOutlined style={{ fontSize: "28px" }} />
                    <div style={{ fontSize: "9px" }}>Thêm vào giỏ</div>
                  </ButtonCart>
                </>
              ) : (
                <ButtonSoldOut disabled={true}>
                  <div style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}>SẢN PHẨM TẠM HẾT HÀNG</div>
                  <div style={{ color: "#fff", fontSize: "13px", fontWeight: "200px" }}>&#40;Liên hệ CSKH để được cập nhật thông tin sản phẩm&#41;</div>
                </ButtonSoldOut>
              )}
            </WrapperContainerBuy>
          </WrapperOder>
        </div>
        <WrapperTitle style={{ fontSize: "17px", fontWeight: "600" }}>
          Thông tin sản phẩm
        </WrapperTitle>
        <div style={{ display: "flex", gap: "20px" }}>
          <CardInfo>
            <div>
              <WrapperSectionText>
                Mô tả sản phẩm
              </WrapperSectionText>
              <WrapperContent>
                <div style={{ padding: '0px 15px 15px', textAlign: 'justify', color: '#6B6B6B' }} dangerouslySetInnerHTML={{ __html: description }} />
              </WrapperContent>
            </div>
          </CardInfo>
          <div style={{ border: "1px solid #d1d5db", borderRadius: "5px", margin: '15px 0', width: "480px", height: "300px" }}>
            <div style={{ background: "#d1d5db", borderRadius: "5px 0 5px" }}>
              <div style={{ backgroundColor: "#d1d5db", fontSize: "14px", padding: "10px", fontWeight: "600" }}>
                ƯU ĐÃI CHO BẠN
              </div>
            </div>
            <div style={{ padding: "15px 10px" }}>
              {[
                'Tháng khuyến mãi: Săn ngay smartphone cao cấp, giảm giá đến 30%',
                'Khuyến mãi đặc biệt: Trả góp 0% lãi suất cho iPhone và Samsung Galaxy',
                'Giảm giá sốc: Mua điện thoại mới với giá chỉ từ 1 triệu đồng!',
                'Mua 1 tặng 1: Điện thoại phổ thông, giá chỉ từ 500 nghìn đồng',
                'Hè rực rỡ: Giảm giá 50% phụ kiện khi mua smartphone bất kỳ',
                'Đổi cũ lấy mới: Khuyến mãi lên đến 2 triệu đồng cho khách hàng đổi máy cũ',
                'Đặt trước ngay: Nhận ngay quà tặng hấp dẫn cho iPhone 16 mới!',
                'Flash sale 1 ngày: Giảm giá cực sốc cho các dòng điện thoại hot nhất'
              ].map((offer, index) => (
                <div key={index} style={{ display: "flex", gap: "5px", marginBottom: "15px" }}>
                  <CheckCircleFilled style={{ color: "#4CAF50", fontSize: "15px" }} />
                  <div style={{ fontSize: "12px", fontWeight: "400" }}>{offer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <VoteComponent listreview={listreview} name={infoDetail.name} />
      </WrapperBox>
    </WrapperPage>
  );
};

export default ProductDetailsPage;
