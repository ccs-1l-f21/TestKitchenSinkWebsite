import React from "react";
import { Link } from "react-router-dom";
import { /*Card, Container,*/ Row, Col } from "react-bootstrap";

const Item = (props) => {
    var urlItemName = props.item.name.replace(/ /g,"_");
    return(
        //<Card.Body style={{fontSize:"20px", borderTop:"1px solid lightgrey"}}>
        //   <Container>
                <Row>
                    <Col sx={4} data-testid="item-name">
                        <Link to={`/dining/${props.dining_hall}/${urlItemName}`}>{props.item.name}</Link>
                    </Col>
                    <Col sx={4} data-testid="item-station">{props.item.station}</Col>
                </Row>
        //     </Container>
        // </Card.Body>
    );
};

export default Item;