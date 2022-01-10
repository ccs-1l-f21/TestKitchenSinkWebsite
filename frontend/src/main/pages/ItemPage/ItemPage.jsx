import React from 'react';
// import StarRating from "main/components/WriteReview/StarRating";
import { useParams } from 'react-router';
import { useItem } from "main/utils/items";
import ReviewBox from 'main/components/Review/ReviewBox';
import './ItemPage.css';
import BasicLayout from 'main/layouts/BasicLayout/BasicLayout';
import { Link } from 'react-router-dom';
import { useReviews } from 'main/utils/reviews';
// import { useCommons } from 'main/utils/commons';

const ItemPage = () => {
    console.log("useParams()['food'] = " + useParams()['food'] + useParams()['station']);
    // const { data: commons } = useCommons();
    // let isCommon = false;
    // let urlCommon = useParams()['hall'];
    const { data: itemList } = useItem(useParams()['hall'], useParams()['food'], useParams()['station']);
    const { data: reviewList } = useReviews();
    var itemName = useParams()['food'].replace(/_/g, " ");
    itemName = itemName.replaceAll('-', '/');
    console.log(itemList);
    var rating = 3.5;



    return (
        <BasicLayout>
            <img 
                src="https://www.dining.ucsb.edu/sites/default/files/styles/slid/public/images/dining-commons/dlg1.jpg?itok=DZsAKBd_"
                width="200px"
                height="200px" 
            />
            <h1 className='food-item'>{itemName}</h1>
            <h2>Rating: {rating}/5</h2>
            <br />
            <Link to={"/write-review/" + useParams()['hall'] +  "/" + useParams()['food'] + "/" + useParams()['station']}>
                <button id="write-review-button"> Write A Review </ button>
            </ Link> 
            <br />
            {reviewList && reviewList.map((r)=>(<ReviewBox rating={r.stars} rText={r.review}/>)) }
        </BasicLayout>
    );
}

export default ItemPage;