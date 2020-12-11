import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Buttons from './Buttons';
import { HtmlToReactParser } from '../../helpers/HtmlToReact';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const CardItem = (props) => {
    console.log('Card Item');
    const { items } = props;
    
    return (
        <Container>
            <Row>
                {
                    (items.length === 0) ? (
                        <p>Data is Empty</p>
                    ) : (
                        items.map((d, i) => (
                            <Col md={4} key={i}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`http://localhost:8000/${d.blog_image}`} />
                                    <Card.Body>
                                        <Card.Title>{d.title}</Card.Title>
                                        <Card.Body>
                                            <HtmlToReactParser content={entities.decode(d.content)} />
                                        </Card.Body>
                                        <Buttons variant="primary" value="Read More.." />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )
                }
            </Row>
        </Container>
    );
}

export default CardItem;