import { useQuery } from "react-query";
import { getDiningCommons } from "main/services/UCSBDiningAPI";

export function useCommons() {
  return useQuery("getCommons", async () => {
    try {
      const response = await getDiningCommons();  
      const diningCommonsList = response.data;    
      return diningCommonsList;
    } catch (e) {
      console.error(`Error : getDiningCommons()`,e);
      return [];
    }
  }, {
    initialData: []
  });
}
