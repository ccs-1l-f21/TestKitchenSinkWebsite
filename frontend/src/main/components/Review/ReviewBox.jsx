import React from 'react';
import "./ReviewBox.css";
import UserStarRating from './UserStarRating';
import 'bootstrap';

const ReviewBox = (props) => {
    return (
        <div class="text-justify darker mt-4 float-right"> <img id="pfp" src="https://i.imgur.com/CFpa3nK.jpg" alt="" class="rounded-circle" width="40" height="40" />
            <h4>Rob Simpson</h4>
            <UserStarRating numStars={props.rating} />
            <br />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
            <img src="https://i.imgur.com/8CIltOL.jpg" />
            <img src="https://i.imgur.com/8CIltOL.jpg" />
            <img src="https://i.imgur.com/8CIltOL.jpg" />
        </div>
    );
}

export default ReviewBox;