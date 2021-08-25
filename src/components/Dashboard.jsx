import React, { useCallback, useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { house, returnArrow, trash } from '../assets/icons'


function Dashboard() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const confirm = () => {
        setShow(false);
        deleteStudent()
    }
    const cancel = () => setShow(false);

    const history = useHistory()
    const params = useParams()
    const [historyData, setHistoryData] = useState([])

    const getHistory = () => {
        const url = (`/api/history?student=${params.id}`)
        fetch(url)
            .then(res => res.json())
            .then(data => setHistoryData(data.payload))
    }

    useEffect(() => { //récupération de l'historique et l'afficher en bas
        getHistory()
    }, [])

    const deleteStudent = useCallback( // fonction suppression de l'élève sélectionné
        () => {
            const url = `/api/students/${params.id}`
            console.log(params.id)
            fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    alert(`${params.id} is deleted !`)
                })
                .catch(err => console.log(err))
            history.push('/students')
        }, [history, params]
    )

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Link to="/students" > {returnArrow} </Link>
                </Col>
                <Col>
                    <Link to="/" > {house} </Link>
                </Col>
                <Col>
                    <DeleteModal show={show} handleClose={handleClose} onConfirm={confirm} onCancel={cancel} />
                    <Button variant="outline-danger" onClick={handleShow}>{trash} </Button>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col> <h5>Tableau de bord</h5> </Col>
            </Row>

            <Row>
                <Col>
                    {
                        historyData.map((data, index) => {
                            return (
                                <ul key={index} >
                                    <li>
                                    {data._id}
                                    </li>
                                    <li>
                                        {data.duration}
                                    </li>
                                    <li>
                                        {data.status}
                                    </li>
                                </ul>
                            )
                        })
                    }
                </Col>

            </Row>

        </Container>
    )
}


//Delete Modal (Message de confirmation de suppression d'élève)
function DeleteModal(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer l'élève</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sûr de vouloir supprimer cet élève ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onCancel} >
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={props.onConfirm}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default Dashboard
