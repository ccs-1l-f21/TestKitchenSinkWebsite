import React from "react";
import Item from "main/components/Items/Item"
import { useItems } from "main/utils/items";
import { Card, Container, Accordion } from "react-bootstrap";
import capitalize from "main/utils/capitalizeFirstLetter";

const Meal = (props) => {
    const { data: itemsList } = useItems(props.diningCommons, props.meal);
    
    return(
        <div>
            <Card.Body style={{fontSize:"20px", borderTop:"1px solid lightgrey"}}>
                <Container>
                    <Accordion>
                        {/* <Col sx={4} data-testid="meal-name">Meal: {props.meal}</Col> */}
                        <Accordion.Header>{capitalize(props.meal)}</ Accordion.Header>
                            <Accordion.Body>
                                {itemsList && itemsList.map((item)=>(<Item key={`${item.name}-${props.meal.name}-${props.diningCommons.name}`} dining_hall={props.diningCommons} item={item} />)) }
                            </ Accordion.Body>
                    </ Accordion>
                </Container>
            </Card.Body>
        </div>
    );
};

export default Meal;