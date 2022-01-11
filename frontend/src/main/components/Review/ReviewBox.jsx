import React from 'react';
import "./ReviewBox.css";
import UserStarRating from './UserStarRating';
import 'bootstrap';

const ReviewBox = (props) => {
    return (
        <div class="text-justify darker mt-4 float-right"> <img id="pfp" src="https://i.imgur.com/CFpa3nK.jpg" alt="" class="rounded-circle" width="40" height="40" />
            <h4>{props.userName}</h4>
            <UserStarRating numStars={props.rating} />
            <br />
            <p>{props.rText}</p>
            <img src="https://i.imgur.com/8CIltOL.jpg" />
            <img src="https://i.imgur.com/8CIltOL.jpg" />
            <img src="https://i.imgur.com/8CIltOL.jpg" />
        </div>
    );
}

export default ReviewBox;