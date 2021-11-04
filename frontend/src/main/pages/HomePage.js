import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import BoxComponents from "main/components/Nav/BoxComponents";

export default function HomePage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <BoxComponents diningHall='ortega'></BoxComponents>
        <BoxComponents diningHall='portola'></BoxComponents>
        <BoxComponents diningHall='de-la-guerra'></BoxComponents>
        <BoxComponents diningHall='carrillo'></BoxComponents>
      </div>
    </BasicLayout>
  )
}