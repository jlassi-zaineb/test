import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap'
import { house, clipboard, play } from '../assets/icons'

function Students() {
    const [modalShow, setModalShow] = React.useState(false);

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

                                <th>Prénoms</th>
                                <th>Historique</th>
                                <th>Jouer</th>
                            </tr>
                        </thead>
                        {/* Les noms seront apportés via la base de donnée */}
                        <tbody>
                            {students.map((kid, index) => {
                                return <tr key={index}>
                                    <td>{kid.name}</td>
                                    <td><Link to={`/dashboard/${kid._id}`}> {clipboard}</Link></td>
                                    <td>
                                        <>
                                            <Link variant="primary" onClick={() => setModalShow(true)}>
                                                {play}
                                            </Link>

                                            <ModalChooseLevel
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                            />
                                        </>
                                    </td>
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

//ModalLevel : choose Level Game
function ModalChooseLevel(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Choisir le niveau de jeu
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="text-center">
                    <Col><Button href="#">Niveau 1</Button></Col>
                    <Col><Button href="#">Niveau 2</Button></Col>
                    <Col><Button href="#">Niveau 3</Button></Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Students
