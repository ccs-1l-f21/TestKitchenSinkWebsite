import React from 'react';
import "./ReviewBox.css";
import UserStarRating from './UserStarRating';
import 'bootstrap';
import { useCurrentUser } from 'main/utils/currentUser';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import WriteReview from './WriteReview/WriteReview';
import axios from 'axios';


const ReviewBox = (props) => {

    // props.pictures.map((p) =>(console.log("p = " + p.base64)))

    // const picURL = props.pictures[0].base64 + props.pictures[1].base64
    // console.log('props.pictures = ' + picURL)
    const { data: currentUser } = useCurrentUser();
    // var editPath = `/write-review/` + useParams()['hall'] +  "/" + useParams()['food'] + "/" + useParams()['station'] + `/edit`;
    const [showReviewBox, setShowReviewBox] = useState(false)
    const onClick = () => {if (showReviewBox === false ) {setShowReviewBox(true)} else{setShowReviewBox(false)}}
    function deleteReview() {
        if (window.confirm("Are you sure you want to delete this review?") === true) {
            axios.delete(`/api/review/deletereview?id=${props.id}`).then(response => {
                if (response.data != null) {
                    alert("Review has been successfully deleted")
                    window.location.reload(false);
                }
                else {
                    alert("Review has failed to delete")
                }
            }
            )} 
        else {
            alert("You have canceled deleting this review")
        }
    }
    return (
        <div class="text-justify darker mt-4 float-right"> <img id="pfp" src={props.pictureURL} alt="" class="rounded-circle" width="40" height="40" />
            <br />
            {
                currentUser && currentUser.loggedIn ? (
                    <>
                        <Button onClick={onClick}> Edit </Button> 
                        <Button onClick={deleteReview}> Delete </Button> 
                        <br />
                        { 
                            showReviewBox ? <WriteReview rText={props.rText} stars={props.rating} edit={true} pictures={props.pictures}/> 
                        : 
                            <>
                                <h4>{props.userName}</h4>
                                <p><UserStarRating numStars={props.rating} />{props.rText}</p>
                                {props.pictures.map((p) =>(<img src={p.base64} />))} 
                                
                            </>
                        }
                    </>
                ) : (
                    <>
                        <h4>{props.userName}</h4>
                        <p><UserStarRating numStars={props.rating} />{props.rText}</p>
                        {props.pictures.map((p) =>(<img src={p.base64} />))}   
                    </>
                )
            }
        </div>
    );
}

export default ReviewBox;