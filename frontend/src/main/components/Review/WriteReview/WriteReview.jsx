import React, { useState } from 'react';
import axios from 'axios'
import StarRating from './StarRating'
import './WriteReview.css'
import { useParams } from 'react-router';
import { useCurrentUser } from 'main/utils/currentUser';
// import BasicLayout from 'main/layouts/BasicLayout/BasicLayout';
// import { useUserReview } from 'main/utils/reviews';
//import { submitReview }from 'main/utils/submitReview'


const WriteReview = (props) => {
    // const { data: userReview } = useUserReview(useParams()['food'], useParams()['hall']);
    // var stars = (userReview[0].stars) ? userReview[0].stars : 0;
    // var rText = userReview[0].review;
    // var rating = parseInt(stars.toString())
    // var review = rText.toString()

    const [ userRating, setRating ] = useState(props.stars);
    const [reviewText, setReviewText ] = useState(props.rText);
    const { data : currentUser } = useCurrentUser();
    const itemList = [useParams()['hall'], useParams()['food'], useParams()['station']];
    const editVar = props.edit;
    var buttonText = 'Submit Review'
    
    if (editVar === true) {
        buttonText = 'Update Review'  
    }
    console.log(props.rText)
    // setReviewText(props.rText)

    // if (props.stars) {
    //     setRating(props.stars)
    // }

    const submitReview = (e) =>{
        e.preventDefault();  
        if(reviewText === null || userRating === null){alert("enter yo values"); return;}
        if(editVar === true) {
            console.log("In edit conditional")
            console.log('reviewText = ' + reviewText);
            axios.put(`/writtenreview/edit?rText=${reviewText}&rating=${userRating}&diningCommonsCode=${itemList[0]}&item=${itemList[1]}&station=${itemList[2]}`).then(response => {
                if (response.data != null) {
                    alert("Review Updated Successfully");
                }
            }).catch(console.log("An error has occured"));
            
            return;
        }
        else{
            axios.post(`/api/dining/writtenreview?rText=${reviewText}&rating=${userRating}&diningCommonsCode=${itemList[0]}&item=${itemList[1]}&station=${itemList[2]}`).then(response => {
                
                if (response.data != null) {
                    alert("Review Post Successfully");
                }
            }).catch();
        }
    }

    return (
        <>
            {
              currentUser && currentUser.loggedIn ? (
                <>
                    <StarRating setRating={setRating} userRating={userRating}/>
                    <form onSubmit={submitReview}>
                        <textarea
                            value={reviewText}
                            onChange={(event) => setReviewText(event.target.value)}
                        />
                        <br />
                        <button>{buttonText}</button>
                    </form>
                </>
              ) : (
                <h1>Please Log In</h1>
              )
            }
        </>
    );
}

export default WriteReview;