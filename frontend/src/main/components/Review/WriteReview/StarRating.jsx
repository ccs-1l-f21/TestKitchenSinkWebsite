import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import './StarRating.css';


const StarRating = (props) => {
    const [ onHover, setHover ] = useState(null);
    console.log('userRating = ' + props.userRating);
    return (
        <div>
            {[...Array(5)].map((_star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => props.setRating(ratingValue)}
                        />
                        <FaStar 
                            className="star" 
                            color={ratingValue <= (onHover || props.userRating) ? "#ffc107" : "#e4e5e9"}
                            size={50}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)} 
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default StarRating;
