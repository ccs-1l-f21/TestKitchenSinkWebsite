import React from "react";
import Meal from "main/components/Meals/Meal"
import { useMeals } from "main/utils/meals";
import { Card, Container, Row, Col } from "react-bootstrap";
import capitalize from "main/utils/capitalizeFirstLetter";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

const DiningCommons = (props) => {
    const { data: mealsList } = useMeals(props.diningCommonCode);
    return(
        <BasicLayout>
            <Card.Body style={{fontSize:"20px", borderTop:"1px solid lightgrey"}}>
                <Container>
                    <Row>
                        <Col sx={4} data-testid="diningCommons-name">Dining Common: {capitalize(props.diningCommonCode)}</Col>
                        {/* <Col sx={4} data-testid="diningCommons-id">{JSON.stringify(props.diningCommons.meals)}</Col> */}
                    </Row>
                </Container>
            </Card.Body>
            {mealsList && mealsList.map((meal)=>(<Meal key={meal.name} diningCommons={props.diningCommonCode} meal={meal.code} />)) }
        </BasicLayout>
    );
};

export default DiningCommons;