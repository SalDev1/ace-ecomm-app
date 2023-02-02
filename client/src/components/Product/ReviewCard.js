import React from "react";
import { Rating } from "@material-ui/lab";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    size: "medium",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  console.log(review);

  return (
    <div className='reviewCard'>
      <img src={profilePng} alt='User' />
      <p>{review.name}</p>

      <div>
        <Rating {...options} />
        <span className='reviewCardComment'>{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
