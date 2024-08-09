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
import { StarFilled, DownOutlined, InboxOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

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
            <WrapperText style={{ color: "#8b94a0" }}>{text}</WrapperText>
        </div>
    </CommentWrapper>
);

const VoteComponent = ({ listreview, name }) => {
    const comments = listreview ? Object.values(listreview).map(item => ({
        name: item.name,
        email: item.email,
        text: item.content,
        numberOfStars: item.star
    })) : [];

    const totalStars = comments.reduce((acc, comment) => acc + comment.numberOfStars, 0);
    const averageStars = (comments.length ? (totalStars / comments.length) : 0).toFixed(1);

    const ratingStats = [5, 4, 3, 2, 1].map(ratingNumber => {
        const numberOfReviews = comments.filter(comment => comment.numberOfStars === ratingNumber).length;
        const totalStars = numberOfReviews * ratingNumber;
        return {
            ratingNumber,
            numberOfReviews,
            totalStars
        };
    });
    const totalReviews = ratingStats.reduce((acc, { numberOfReviews }) => acc + numberOfReviews, 0);
    const ratingComponents = ratingStats.map(({ ratingNumber, numberOfReviews }) => ({
        ratingNumber,
        percentage: totalReviews ? ((numberOfReviews / totalReviews) * 100).toFixed(0) : 0,
        numberOfReviews
    }));

    const [visibleComments, setVisibleComments] = useState(3);
    const showMoreComments = () => {
        setVisibleComments(comments.length);
    };

    return (
        <CardInfo>
            <div style={{ padding: "15px 15px" }}>
                <WrapperSectionText>
                    Đánh giá & nhận xét {name}
                </WrapperSectionText>
            </div>
            <WrapperCardRate>
                <RateLeft>
                    <WrapperTitle>{comments.length > 0 ? averageStars : '0.0'}/5</WrapperTitle>
                    <Rate disabled allowHalf defaultValue={averageStars} />
                    <WrapperText>{comments.length} đánh giá</WrapperText>
                </RateLeft>
                <RateRight>
                    {ratingComponents.map(({ ratingNumber, percentage, numberOfReviews }) => (
                        <RatingComponent
                            key={ratingNumber}
                            ratingNumber={ratingNumber}
                            percentage={percentage}
                            numberOfReviews={numberOfReviews}
                        />
                    ))}
                </RateRight>
            </WrapperCardRate>
            <div style={{ padding: "15px 15px" }}>
                <WrapperSectionText>
                    Đánh giá
                </WrapperSectionText>
            </div>
            <CommentBox>
                {comments.length > 0 ? (
                    <>
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
                    </>
                ) : (
                    <div style={{color: '#6f6f6f', display: 'flex', flexDirection: 'column', gap: '10px', alignContent: 'center', alignItems: 'center'}}>
                        <InboxOutlined style={{fontSize: '30px'}} />
                        <WrapperText>Chưa có đánh giá nào cho sản phẩm này!</WrapperText>
                    </div>
                )}
            </CommentBox>
        </CardInfo>
    );
}

export default VoteComponent;
