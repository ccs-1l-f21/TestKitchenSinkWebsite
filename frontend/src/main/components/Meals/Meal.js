import React from "react";
import Item from "main/components/Items/Item"
import { Card, Container, Row, Col } from "react-bootstrap";

const Meal = (props) => {
    return(
        <Card.Body style={{fontSize:"20px", borderTop:"1px solid lightgrey"}}>
            <Container>
                <Row>
                    <Col sx={4} data-testid="meal-name">Meal: {props.meal.name}</Col>
                </Row>
                {props.meal.items && props.meal.items.map((item)=>(<Item key={item.name} item={item} />)) }
            </Container>
        </Card.Body>
    );
};

export default Meal;