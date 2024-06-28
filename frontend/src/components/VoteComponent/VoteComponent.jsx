import React, { useState } from 'react';
import {
    CardInfo,
    WrapperSectionText,
    WrapperCardRate,
    RateLeft,
    RateRight,
    WrapperTitle,
    WrapperText,
    LineRate,
    LineRateColor,
    CommentBox,
    CommentWrapper,
    AvatarImage,
    ButtonMore
} from './style';
import { StarFilled, DownOutlined } from '@ant-design/icons';

const RatingComponent = ({ ratingNumber, percentage, numberOfReviews }) => {
    return (
        <div style={{ display: "flex", gap: "5px", padding: "0 10px", alignItems: "center" }}>
            <h3>{ratingNumber}</h3>
            <StarFilled style={{ color: "#FFBF00", fontSize: "13px" }} />
            <LineRate>
                <LineRateColor style={{ width: `${percentage}%` }} />
            </LineRate>
            <WrapperText>{numberOfReviews} đánh giá</WrapperText>
        </div>
    );
};

const Stars = ({ numberOfStars }) => {
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<StarFilled key={i} />);
    }
    return (
      <div style={{ display: "flex", paddingTop: "8px", color: "#FFBF00", gap: "3px", fontSize: "15px" }}>
        {stars}
      </div>
    );
};

const Comment = ({ name, text, numberOfStars }) => (
    <CommentWrapper>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <AvatarImage src={`https://ui-avatars.com/api/?background=random&name=${name.replace(" ", "+")}`} alt="user" />
        <div>
          <WrapperSectionText style={{ fontSize: "15px", fontWeight: "400px" }}>{name}</WrapperSectionText>
          <Stars numberOfStars={numberOfStars} />
        </div>
      </div>
      <div style={{ padding: "10px 0 10px 60px" }}>
        <WrapperText style={{color: "#8b94a0"}}>{text}</WrapperText>
      </div>
    </CommentWrapper>
);

const VoteComponent = () => {
    const comments = [
        {
            name: "Trần Văn Hội",
            text: "Điện thoại có hiệu năng mượt mà, thích hợp cho cả công việc và giải trí.",
            numberOfStars: 5
        },
        {
            name: "Nguyễn Thị Bích",
            text: "Camera chụp ảnh đẹp, sắc nét và chi tiết tốt, phù hợp cho việc chụp hình hàng ngày.",
            numberOfStars: 5
        },
        {
            name: "Lê Minh Cường",
            text: "Thiết kế tinh tế, sang trọng, cầm nắm thoải mái và dễ sử dụng.",
            numberOfStars: 5
        },
        {
            name: "Phạm Thị Thu Dung",
            text: "Dung lượng pin lớn, dùng cả ngày không lo hết pin.",
            numberOfStars: 5
        },
        {
            name: "Vũ Quang Hà",
            text: "Màn hình sắc nét, hiển thị rõ ràng dưới ánh nắng mặt trời.",
            numberOfStars: 5
        },
        {
            name: "Hoàng Khánh Linh",
            text: "Loa ngoài âm thanh to và rõ, thích hợp để xem phim và nghe nhạc.",
            numberOfStars: 5
        },
        {
            name: "Đỗ Thanh Phúc",
            text: "Nhiều tính năng thông minh, hỗ trợ công việc hiệu quả.",
            numberOfStars: 5
        },
        {
            name: "Bùi Thị Hồng An",
            text: "Bảo mật vân tay và nhận diện khuôn mặt hoạt động nhanh và chính xác.",
            numberOfStars: 5
        },
        {
            name: "Nguyễn Anh Tuấn",
            text: "Hệ điều hành mượt mà, ít bị giật lag trong quá trình sử dụng.",
            numberOfStars: 5
        },
        {
            name: "Trần Thị Bảo Ngọc",
            text: "Giá cả hợp lý, xứng đáng với chất lượng và tính năng.",
            numberOfStars: 4
        }
    ];

    const [visibleComments, setVisibleComments] = useState(3);

    const showMoreComments = () => {
        setVisibleComments(comments.length);
    };

    return (
        <CardInfo>
            <div style={{padding: "15px 15px"}}>
                <WrapperSectionText>
                    Đánh giá & nhận xét iPhone 13 128GB | Chính hãng VN/A
                </WrapperSectionText>
            </div>
            <WrapperCardRate>
                <RateLeft>
                    <WrapperTitle>4.9/5</WrapperTitle>
                    <div style={{display: "flex", gap: "10px", color: "#FFBF00", fontSize: "15px", paddingBottom: "10px"}}>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                    </div>
                    <WrapperText>10 đánh giá</WrapperText>
                </RateLeft>
                <RateRight>
                    <RatingComponent ratingNumber={5} percentage={90} numberOfReviews={9} />
                    <RatingComponent ratingNumber={4} percentage={10} numberOfReviews={1} />
                    <RatingComponent ratingNumber={3} percentage={0} numberOfReviews={0} />
                    <RatingComponent ratingNumber={2} percentage={0} numberOfReviews={0} />
                    <RatingComponent ratingNumber={1} percentage={0} numberOfReviews={0} />
                </RateRight>
            </WrapperCardRate>
            <div style={{padding: "15px 15px"}}>
                <WrapperSectionText>
                    Nhận xét
                </WrapperSectionText>
            </div>
            <CommentBox>
                {comments.slice(0, visibleComments).map((comment, index) => (
                    <Comment
                        key={index}
                        name={comment.name}
                        text={comment.text}
                        numberOfStars={comment.numberOfStars}
                    />
                ))}
                {visibleComments < comments.length && (
                    <ButtonMore onClick={showMoreComments}>Xem thêm <DownOutlined /></ButtonMore>
                )}
            </CommentBox>
        </CardInfo>
    );
}

export default VoteComponent;
