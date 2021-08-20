import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { logout, setting, student } from '../assets/icons'


function Home() {
    return (
        <Container className="text-center">

            <Row>

                <Col>
                    <Link to="/">{logout}</Link>
                    <h3>Classe</h3>
                </Col>

                <Col>
                    <Link to="/students">{student}</Link>
                    <h3>Elèves</h3>
                </Col>

                <Col>
                    <Link to="/settings">{setting}</Link>
                    <h3>Paramètres</h3>
                </Col>

            </Row>

        </Container>
    )
}

export default Home
