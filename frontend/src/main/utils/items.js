import { useQuery } from "react-query";
import { getItems } from "main/services/UCSBDiningAPI";
import { getDiningHallItem } from "main/services/ReviewItemsService";

export function useItems(diningCommons, meal) {
  return useQuery(`getItems-${diningCommons}-${meal}`, async () => {
    try {
      const response = await getItems(diningCommons, meal);  
      const itemsList = response.data;
      console.log("itemsList.length = " + itemsList.length);
      for (let i = 0; i < itemsList.length; i++) {
        if (itemsList[i].station === 'Condiments' || itemsList[i].station === 'Beverages' || itemsList[i].station === 'Bright Meal' || itemsList[i].station === 'Deli') {
          itemsList.splice(i, 1);
          i--;
        }
      }    
      return itemsList;
    } catch (e) {
      console.error(`Error : getItems("${diningCommons}", "${meal}")`,e);
      return [];
    }
  }, {
    initialData: []
  });
}

export function useItem(diningCommons, item, station) {
  return useQuery(`getItem-${diningCommons}-${item}-${station}`, async () => {
    try {
      const response = await getDiningHallItem(diningCommons, item, station);  
      const items = response.data;
      console.log("items = " + items);    
      return items;
    } catch (e) {
      console.error(`Error : getItems("${diningCommons}", "${item}", "${station}")`,e);
      return [];
    }
  }, {
    initialData: []
  });
}

