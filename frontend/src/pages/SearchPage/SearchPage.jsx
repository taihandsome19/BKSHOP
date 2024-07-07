import React, { useState } from 'react';
import { WrapperPage, WrapperBox, ButtonSort, WrapperProducts } from "./style";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CardComponent from '../../components/CardComponent/CardComponent';

const SearchPage = () => {
    const [activeSort, setActiveSort] = useState(null);

    const handleSortClick = (sortType) => {
        setActiveSort(sortType);
        // Perform sorting or other actions based on sortType
    };

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Tìm kiếm - BKSHOP</title>
                </Helmet>
                <WrapperPage>
                    <WrapperBox>
                        <div>
                            <div style={{ display: "flex", fontSize: "14px", color: '#707070', marginBottom: "10px", justifyContent: "center" }}>Kết quả tìm kiếm cho từ khoá</div>
                            <div style={{ fontSize: "18px", fontWeight: '700', marginBottom: "10px" }}>Sắp xếp theo</div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <ButtonSort
                                    active={activeSort === 'highToLow'}
                                    onClick={() => handleSortClick('highToLow')}
                                >
                                    <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"></path></svg>
                                    <div style={{ fontSize: "12px" }}>Giá Cao - Thấp</div>
                                </ButtonSort>
                                <ButtonSort
                                    active={activeSort === 'lowToHigh'}
                                    onClick={() => handleSortClick('lowToHigh')}
                                >
                                    <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"></path></svg>
                                    <div style={{ fontSize: "12px" }}>Giá Thấp - Cao</div>
                                </ButtonSort>
                            </div>
                            <WrapperProducts>
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                            </WrapperProducts>
                        </div>
                    </WrapperBox>
                </WrapperPage>
            </div>
        </HelmetProvider>
    );
};

export default SearchPage;