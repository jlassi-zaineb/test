import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { house, clipboard } from '../assets/icons'

function Students() {
    const [students, setStudents] = useState([])


    const refreshData = () => {
        const url = '/api/students'
        fetch(url)
            .then(res => res.json())
            .then(data => setStudents(data))
    }

    useEffect(() => {
        refreshData()
    }, [])


    return (
        <Container>
            <Link to="/" > {house} </Link>

            <Row className="mt-5">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Prénoms</th>
                            </tr>
                        </thead>
                        {/* Les noms seront apportés via la base de donnée */}
                        <tbody>
                            {students.map((kid, index) => {
                                return <tr key={index}>
                                    <td>
                                        <Link to={`/dashbord/${kid._id}`}> {clipboard}</Link></td>
                                    <td>{kid.name}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Col>

                <Col>
                    <AddStudent />
                </Col>

            </Row>

        </Container>
    )
}

export default Students
