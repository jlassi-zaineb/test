import React, { useCallback, useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { house, returnArrow, trash } from '../assets/icons'
import '../App.css'

function Dashboard() {
    const history = useHistory()
    const params = useParams()
    //deleteModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const confirm = () => {
        setShow(false);
        deleteStudent()
    }
    const cancel = () => setShow(false);
    //Data récupéré du fetch et stocké ici pour faire un map dessus
    const [historyData, setHistoryData] = useState([])
    console.log(historyData)
    //fetch History
    const getHistory = () => {
        // const url = (`/api/history?student=${params.id}`)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setHistoryData(data.payload))
        setHistoryData(
            [
                [
                    {
                        "_id": "612762a4b8a2871e9445953b",
                        "level": 1,
                        "student": {
                            "classroom": [],
                            "_id": "612654df19fc3e20bc913cfe",
                            "name": "kids",
                            "created": "2021-08-25T14:34:07.753Z",
                            "__v": 0
                        },
                        "duration": 2000,
                        "status": "FAILED",
                        "created": "2021-08-26T09:45:08.906Z",
                        "__v": 0
                    },
                    {
                        "_id": "612762b3b8a2871e9445953d",
                        "level": 1,
                        "student": {
                            "classroom": [],
                            "_id": "612654df19fc3e20bc913cfe",
                            "name": "kids",
                            "created": "2021-08-25T14:34:07.753Z",
                            "__v": 0
                        },
                        "duration": 1000,
                        "status": "PARTIAL",
                        "created": "2021-08-26T09:45:23.816Z",
                        "__v": 0
                    },
                    {
                        "_id": "612762bab8a2871e9445953f",
                        "level": 1,
                        "student": {
                            "classroom": [],
                            "_id": "612654df19fc3e20bc913cfe",
                            "name": "kids",
                            "created": "2021-08-25T14:34:07.753Z",
                            "__v": 0
                        },
                        "duration": 2000,
                        "status": "PARTIAL",
                        "created": "2021-08-26T09:45:30.355Z",
                        "__v": 0
                    },
                    {
                        "_id": "6127630fb8a2871e94459541",
                        "level": 1,
                        "student": {
                            "classroom": [],
                            "_id": "612654df19fc3e20bc913cfe",
                            "name": "kids",
                            "created": "2021-08-25T14:34:07.753Z",
                            "__v": 0
                        },
                        "duration": 5000,
                        "status": "SUCCESS",
                        "created": "2021-08-26T09:46:55.516Z",
                        "__v": 0
                    },
                    {
                        "_id": "612791eab8a2871e94459729",
                        "level": 1,
                        "student": {
                            "classroom": [],
                            "_id": "612654df19fc3e20bc913cfe",
                            "name": "kids",
                            "created": "2021-08-25T14:34:07.753Z",
                            "__v": 0
                        },
                        "duration": 1000,
                        "status": "FAILED",
                        "created": "2021-08-26T13:06:50.221Z",
                        "__v": 0
                    }
                ],
                [
                    {
                        "_id": "6127a0f8b8a2871e944597e1",
                        "level": 1,
                        "student": {
                            "classroom": [],
                            "_id": "612654df19fc3e20bc913cfe",
                            "name": "kids",
                            "created": "2021-08-25T14:34:07.753Z",
                            "__v": 0
                        },
                        "duration": 6000,
                        "status": "SUCCESS",
                        "created": "2020-01-30T14:11:04.335Z",
                        "__v": 0
                    }
                ]
            ])
    }
    
    //récupération de l'historique et l'afficher en bas
    useEffect(() => {
        getHistory()
    }, [])
    // fonction suppression de l'élève sélectionné
    const deleteStudent = useCallback(
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

        <Container className="text-center mt-5">

            <Row>
                {/* LINK RETOUR EN ARRIERE */}
                <Col> <Link to="/students" > {returnArrow} </Link> </Col>
                {/* LINK RETOUR AU MENU PRINCIPAL */}
                <Col> <Link to="/" > {house} </Link> </Col>
                {/* BOUTON SUPPRIMER ET MODAL DE CONFIRMATION */}
                <Col>
                    <DeleteModal show={show} handleClose={handleClose} onConfirm={confirm} onCancel={cancel} />
                    <Button variant="outline-danger" onClick={handleShow}> {trash} </Button>
                </Col>
            </Row>

            {/* TABLEAU DE BORD */}
            <Row className="mt-5">
                <Col> <h5>Tableau de bord</h5> </Col>
                {/* {
                    historyData[0]?.student.name
                } */}
            </Row>
            <hr></hr>

            <Row>
                <Col>
                    <table>
                        <tbody>
                            <tr>
                                <th scope="row">

                                    {
                                        historyData.map((data, index) => {

                                            let date = new Date(data.created);
                                            let dd = String(date.getDate()).padStart(2, '0');
                                            let mm = String(date.getMonth() + 1).padStart(2, '0');
                                            let yyyy = date.getFullYear();
                                            date = dd + '/' + mm + '/' + yyyy;

                                            return <p key={index}>{date}</p>

                                        })
                                    }

                                </th>
                                <td className="">
                                    {
                                        historyData.map((data, index) => {

                                            if (data.status === 'FAILED') {
                                                return <ul key={index}>
                                                    <li id="failed"><span>{data.status}</span></li></ul>

                                            } else if (data.status === 'PARTIAL') {
                                                return <ul key={index}>
                                                    <li id="partial"><span>{data.status}</span></li></ul>

                                            } else {
                                                return <ul key={index}>
                                                    <li id="success"><span>{data.status}</span></li>
                                                </ul>
                                            }
                                        })
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container >
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
