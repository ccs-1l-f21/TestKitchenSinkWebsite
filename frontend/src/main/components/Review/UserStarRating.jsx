import React from "react";
import { FaStar } from "react-icons/fa";

const UserStarRating = (props) => {

    return (
        <div>
            {[...Array(5)].map((_star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <FaStar 
                            className="star" 
                            color={ratingValue <= props.numStars ? "#ffc107" : "#e4e5e9"}
                            size={20} 
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default UserStarRating;
