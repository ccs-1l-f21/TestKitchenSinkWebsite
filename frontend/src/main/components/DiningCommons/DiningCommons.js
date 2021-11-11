import React from "react";
import Meal from "main/components/Meals/Meal"
import { Card, Container, Row, Col } from "react-bootstrap";

const DiningCommons = (props) => {
    return(
        <>
            <Card.Body style={{fontSize:"20px", borderTop:"1px solid lightgrey"}}>
                <Container>
                    <Row>
                        <Col sx={4} data-testid="diningCommons-id">{props.diningCommons.name}</Col>
                        {/* <Col sx={4} data-testid="diningCommons-id">{JSON.stringify(props.diningCommons.meals)}</Col> */}
                    </Row>
                </Container>
            </Card.Body>
            {props.diningCommons.meals && props.diningCommons.meals.map((meal)=>(<Meal key={meal.name} meal={meal} />)) }
        </>
    );
};

export default DiningCommons;