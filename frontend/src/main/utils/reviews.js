import { useQuery } from "react-query";
import { getReviews } from "main/services/ReviewsAPI";

export function useReviews() {
  return useQuery(`getReviews`, async () => {
    try {
      const response = await getReviews();  
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