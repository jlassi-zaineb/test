import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { house } from '../assets/icons'

function Students() {

    // Ici un fetch vers Db pour recupérer les prenoms et faire un map en bas
    
    return (
        <Container>
            <Row>
                <Link to="/" > {house}</Link>

                <Col md={{ span: 6, offset: 3 }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Prénoms</th>
                            </tr>
                        </thead>
                        {/* Les noms seront apportés via la base de donnée */}
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Pierre</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Julie</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )
}

export default Students
