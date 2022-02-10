import React from 'react';
import "./ReviewBox.css";
import UserStarRating from './UserStarRating';
import 'bootstrap';
import { useCurrentUser } from 'main/utils/currentUser';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import WriteReview from './WriteReview/WriteReview';


const ReviewBox = (props) => {
    
    const { data: currentUser } = useCurrentUser();
    var editPath = `/write-review/` + useParams()['hall'] +  "/" + useParams()['food'] + "/" + useParams()['station'] + `/edit`;
    const [showReviewBox, setShowReviewBox] = useState(false)
    const onClick = () => {if (showReviewBox === false ) {setShowReviewBox(true)} else{setShowReviewBox(false)}}
    console.log(editPath)
    return (
        <div class="text-justify darker mt-4 float-right"> <img id="pfp" src={props.pictureURL} alt="" class="rounded-circle" width="40" height="40" />
            <br />
            {
                currentUser && currentUser.loggedIn ? (
                    <>
                        <Button onClick={onClick}> Edit </Button> 
                        <br />
                        { 
                            showReviewBox ? <WriteReview rText={props.rText} stars={props.rating} edit={true}/> 
                        : 
                            <>
                                <h4>{props.userName}</h4>
                                <p><UserStarRating numStars={props.rating} />{props.rText}</p>
                                <img src="https://i.imgur.com/8CIltOL.jpg" />
                                <img src="https://i.imgur.com/8CIltOL.jpg" />
                                <img src="https://i.imgur.com/8CIltOL.jpg" />  
                            </>
                        }
                    </>
                ) : (
                    <>
                        <h4>{props.userName}</h4>
                        <p><UserStarRating numStars={props.rating} />{props.rText}</p>
                        <img src="https://i.imgur.com/8CIltOL.jpg" />
                        <img src="https://i.imgur.com/8CIltOL.jpg" />
                        <img src="https://i.imgur.com/8CIltOL.jpg" />  
                    </>
                )
            }
        </div>
    );
}

export default ReviewBox;