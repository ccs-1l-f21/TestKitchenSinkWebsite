import React from "react";
import { /*Card, Container,*/ Row, Col } from "react-bootstrap";

const Item = (props) => {
    return(
        //<Card.Body style={{fontSize:"20px", borderTop:"1px solid lightgrey"}}>
        //   <Container>
                <Row>
                    <Col sx={4} data-testid="item-name">{props.item.name}</Col>
                    <Col sx={4} data-testid="item-station">{props.item.station}</Col>
                </Row>
        //     </Container>
        // </Card.Body>
    );
};

export default Item;