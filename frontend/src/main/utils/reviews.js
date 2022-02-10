import { useQuery } from "react-query";
import { getReviews } from "main/services/ReviewsAPI";

export function useReviews(menuitem, diningCommonsCode) {
  return useQuery(`getReviews`, async () => {
    try {
      const response = await getReviews(menuitem, diningCommonsCode);  
      const reviews = response.data;    
      return reviews;
    } catch (e) {
      console.error(`Error : getReviews)`,e);
      return [];
    }
  }, {
    initialData: []
  });
}

export function useUserReview(menuitem, diningCommonsCode) {
  return useQuery(`getReviews`, async () => {
    try {
      const response = await getReviews(menuitem, diningCommonsCode);  
      const reviews = response.data;    
      return reviews;
    } catch (e) {
      console.error(`Error : getReviews)`,e);
      return [];
    }
  }, {
    initialData: []
  });
}