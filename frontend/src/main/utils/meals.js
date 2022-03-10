import { useQuery } from "react-query";
import { getMeals } from "main/services/UCSBDiningAPI";

export function useMeals(diningCommons) {
  return useQuery(`getMeals-${diningCommons}`, async () => {
    try {
      const response = await getMeals(diningCommons);  
      const mealsList = response.data;    
      return mealsList;
    } catch (e) {
      console.error(`Error : getMeals("${diningCommons}")`,e);
      return [];
    }
  }, {
    initialData: []
  });
}
