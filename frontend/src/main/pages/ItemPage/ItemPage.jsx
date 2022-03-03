import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
import ReviewBox from 'main/components/Review/ReviewBox';
import './ItemPage.css';
import BasicLayout from 'main/layouts/BasicLayout/BasicLayout';
import { useReviews } from 'main/utils/reviews';
import { useCurrentUser } from 'main/utils/currentUser';
import WriteReview from 'main/components/Review/WriteReview/WriteReview.jsx';

const ItemPage = () => {
    var itemName = useParams()['food'].replace(/_/g, " ");
    itemName = itemName.replaceAll('-', '/');
    const { data: reviewList } = useReviews(useParams()['food'], useParams()['hall'], useParams()['station']);
    const { data : currentUser } = useCurrentUser();
    var rating = '-';
    var count = 0;
    var sum = 0;
    // var writeAReview = "/write-review/" + useParams()['hall'] +  "/" + useParams()['food'] + "/" + useParams()['station']
    const [showReviewBox, setShowReviewBox] = useState(false)
    const onClick = () => {if (showReviewBox === false ) {setShowReviewBox(true)} else{setShowReviewBox(false)}}

    for (const review of reviewList) {
        sum += review.stars;
        count++;
    }

    if (count != 0) {
        rating = sum/count;
    }

    return (
        <BasicLayout>
            <img 
                src="https://www.dining.ucsb.edu/sites/default/files/styles/slid/public/images/dining-commons/dlg1.jpg?itok=DZsAKBd_"
                width="200px"
                height="200px" 
            />
            <h1 className='food-item'>{itemName}</h1>
            <h2>Average Rating: {rating}/5</h2>
            <br />
            {
              currentUser && currentUser.loggedIn ? (
                <>
                    <Button onClick={onClick}> Write A Review </Button>
                    { showReviewBox ? <WriteReview edit={false}/> : null }
                </>
              ) : (
                <Button href="/oauth2/authorization/google"> Write A Review </Button>
              )
            } 
            <br />
            {reviewList && reviewList.map((r)=>(<ReviewBox id={r.id} rating={r.stars} rText={r.review} userName={r.user.fullName} pictureURL={r.user.pictureUrl} pictures={r.pictureString}/>)) }
        </BasicLayout>
    );
}

export default ItemPage;