import React from 'react';
// import StarRating from "main/components/WriteReview/StarRating";
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
// import { useItem } from "main/utils/items";
import ReviewBox from 'main/components/Review/ReviewBox';
import './ItemPage.css';
import BasicLayout from 'main/layouts/BasicLayout/BasicLayout';
// import { Link } from 'react-router-dom';
import { useReviews } from 'main/utils/reviews';
import { useCurrentUser } from 'main/utils/currentUser';
// import { useCommons } from 'main/utils/commons';

const ItemPage = () => {
    // console.log("useParams()['food'] = " + useParams()['food'] + useParams()['station']);
    // const { data: commons } = useCommons();
    // let isCommon = false;
    // let urlCommon = useParams()['hall'];
    // const { data: itemList } = useItem(useParams()['hall'], useParams()['food'], useParams()['station']);
    var itemName = useParams()['food'].replace(/_/g, " ");
    itemName = itemName.replaceAll('-', '/');
    // console.log(itemList);
    const { data: reviewList } = useReviews(useParams()['food'], useParams()['hall']);
    const { data : currentUser } = useCurrentUser();
    var rating = 0;
    var count = 0;
    var sum = 0;
    var writeAReview = "/write-review/" + useParams()['hall'] +  "/" + useParams()['food'] + "/" + useParams()['station']

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
                    <Button href={writeAReview}> Write A Review </Button>
                </>
              ) : (
                <Button href="/oauth2/authorization/google"> Write A Review </Button>
              )
            } 
            <br />
            {reviewList && reviewList.map((r)=>(<ReviewBox rating={r.stars} rText={r.review} userName={r.user.fullName}/>)) }
        </BasicLayout>
    );
}

export default ItemPage;