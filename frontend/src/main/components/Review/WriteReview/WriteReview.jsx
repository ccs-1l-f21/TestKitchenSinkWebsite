import React, { useState } from 'react';
import axios from 'axios'
import StarRating from './StarRating'
import './WriteReview.css'
import { useParams } from 'react-router';
import { useCurrentUser } from 'main/utils/currentUser';
import UploadImage from './UploadImage.jsx'
import FormData from 'form-data'
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
    var [imageList, setImageList] = useState([]);
    var bodyFormData = new FormData();
            

    // console.log('props.base64 = ' + props.pictures)
    if (editVar === true) {
        buttonText = 'Update Review'  
    }

    const submitReview = (e) =>{
        e.preventDefault();  

        if(reviewText === undefined || userRating === undefined){alert("enter yo values"); return;}
        let s = "";
        imageList.map((image) => { s+=image.data_url+'|' });//bodyFormData.append('user_pic[]', image.data_url);})
        bodyFormData.append('user_pic[]', s.substring(0, s.length-2));
        for (var value of bodyFormData.values()) {
            console.log(JSON.stringify(value));
        }
        if(editVar === true) {
            axios.put(`/api/review/editreview?rText=${reviewText}&rating=${userRating}&diningCommonsCode=${itemList[0]}&item=${itemList[1]}&station=${itemList[2]}`, 
                {body : JSON.stringify(bodyFormData.get('user_pic[]'))})
            .then(response => {
                if (response.data != null) {
                    alert("Review Updated Successfully");
                    window.location.reload(false);
                }
            }).catch(console.log("An error has occured"));
            
            return;
        }
        else{
            
            // console.log('boundary = ' + bodyFormData.getBoundary)
            if (reviewText === null || userRating === undefined) {
                alert("Please leave a written review with a rating")
                return
            }
            console.log(JSON.stringify(bodyFormData.get('user_pic[]')));
            axios.post(`/api/review/writtenreview`, {body : JSON.stringify(bodyFormData.get('user_pic[]'))} , { 
                params : {
                    rText : reviewText,
                    rating : userRating,
                    diningCommonsCode : itemList[0],
                    item : itemList[1],
                    station : itemList[2],
                }
            })
            .then(response => {
                if (response.data !== null) {
                    if(response.data === "You have already reviewed this item") {
                        alert("You have already reviewed this item")
                        return;
                    }
                    alert("Review Post Successfully");
                    window.location.reload(false);
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
                    <UploadImage setImageList={setImageList} imageList={imageList}/>
                    {/* {console.log('imageList = ' + imageList)} */}
                </>
              ) : (
                <h1>Please Log In</h1>
              )
            }
        </>
    );
}

export default WriteReview;