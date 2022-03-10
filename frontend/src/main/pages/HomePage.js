import React from "react"
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import BoxComponents from "main/components/HomePageBox/BoxComponents";
import { useCommons } from "main/utils/commons";
// import { Route, Router } from "react-router";
// import DiningCommonPage from "./DiningCommonPage";
// import DiningCommons from "main/components/DiningCommons/DiningCommons";


export default function HomePage(props) {
  const { data: diningCommonsListFromBackEnd } = useCommons();
  console.log("typeof(diningCommonsListFromBackEnd) = " + typeof(diningCommonsListFromBackEnd))
  console.log("diningCommonsListFromBackEnd[0] = " + diningCommonsListFromBackEnd[0])
  const diningCommonsList = (diningCommonsListFromBackEnd.length > 0) ? diningCommonsListFromBackEnd : props.diningCommonsList;

  return (
    <>
      <BasicLayout>
        <div className="pt-2">
          {diningCommonsList && diningCommonsList.map((dc)=>(<BoxComponents diningHallName={dc.name} diningHallCode = {dc.code} />)) }
        </div>
      </BasicLayout>
    </>
  )
}