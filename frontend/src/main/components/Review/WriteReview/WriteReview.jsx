import React, { useState } from 'react';
import axios from 'axios'
import StarRating from './StarRating'
import './WriteReview.css'
import { useParams } from 'react-router';
import { useCurrentUser} from "main/utils/currentUser";
import BasicLayout from 'main/layouts/BasicLayout/BasicLayout';

//import { submitReview }from 'main/utils/submitReview'


const WriteReview = () => {
    const [ userRating, setRating ] = useState(null);
    const [reviewText, setReviewText ] = useState(null);
    const itemList = [useParams()['hall'], useParams()['food']];
    const { data: currentUser } = useCurrentUser();

    const submitReview = (e) =>{
        e.preventDefault();  
        if(reviewText === null || userRating === null){alert("enter yo damn values"); return;}
        console.log('reviewText')
        console.log(reviewText)
        console.log(itemList)
        axios.post(`/writtenreview?rText=${reviewText}&rating=${userRating}&hall=${itemList[0]}&item=${itemList[1]}&userEmail=${currentUser.root.user.email}`).then(response => {
            if (response.data != null) {
                alert("Review Post Successfully");
            }
        }).catch();
    }

    return (
        <BasicLayout>
            <StarRating setRating={setRating} userRating={userRating}/>
            <form onSubmit={submitReview}>
                <textarea
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                />
                <br />
                <button>Submit Review</button>
            </form>
        </BasicLayout>
    );
}

export default WriteReview;