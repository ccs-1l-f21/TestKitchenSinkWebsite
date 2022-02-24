import { useQuery } from "react-query";
import { getReviews } from "main/services/ReviewsAPI";

export function useReviews(menuitem, diningCommonsCode, station) {
  return useQuery(`getReviews`, async () => {
    try {
      const response = await getReviews(menuitem, diningCommonsCode, station);  
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
