import { useQuery } from "react-query";
import { getItems } from "main/services/UCSBDiningAPI";
import { getDiningHallItem } from "main/services/ReviewItemsService";

export function useItems(diningCommons, meal) {
  return useQuery(`getItems-${diningCommons}-${meal}`, async () => {
    try {
      const response = await getItems(diningCommons, meal);  
      const itemsList = response.data;    
      return itemsList;
    } catch (e) {
      console.error(`Error : getItems("${diningCommons}", "${meal}")`,e);
      return [];
    }
  }, {
    initialData: []
  });
}

export function useItem(diningCommons, item) {
  return useQuery(`getItem-${diningCommons}-${item}`, async () => {
    try {
      const response = await getDiningHallItem(diningCommons, item);  
      const items = response.data;
      console.log("items = " + items);    
      return items;
    } catch (e) {
      console.error(`Error : getItems("${diningCommons}", "${item}")`,e);
      return [];
    }
  }, {
    initialData: []
  });
}

