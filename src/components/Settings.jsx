import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { house } from '../assets/icons'

export default function Settings() {
    return (
        <Container>

            <Row>
                <Link to="/" > {house}</Link>
                <Col md={{ span: 4, offset: 4 }} className="mt-5 border bg-light rounded" >
                    <Row className="py-4">
                        <Col>
                            Son
                        </Col>
                        <Col>
                            <Form>
                                <Form.Check

                                    type="switch"
                                    id="custom-switch"
                                    label="désactivé"
                                />
                            </Form>
                        </Col>
                    </Row>
                    <Row className="py-4">
                        <Col>
                            Thème
                        </Col>
                        <Col>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="désactivé"
                                />
                            </Form>
                        </Col>
                    </Row>
                    <Row className="py-4">
                        <Col>
                            Autres
                        </Col>
                        <Col>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="désactivé"
                                />
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}
