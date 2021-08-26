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
        const url = (`/api/history?student=${params.id}`)
        fetch(url)
            .then(res => res.json())
            .then(data => setHistoryData(data.payload))
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

    // const checkDate = useCallback(
    //     () => {
    //         let dateArray = []

    //         let len = historyData.length

    //         for (let i = 0; i < len; i++) {
    //             let hist = historyData[i].created
    //             let date = new Date(hist);
    //             let dd = String(date.getDate()).padStart(2, '0');
    //             let mm = String(date.getMonth() + 1).padStart(2, '0');
    //             let yyyy = date.getFullYear();
    //             date = dd + '/' + mm + '/' + yyyy;

    //             if (dateArray.indexOf(hist[i]) === -1) {
    //                 dateArray.push(hist[i])
    //                 console.log(dateArray)
    //             }
    //         }

    //         return checkDate
    //     },
    //     [historyData],
    // )


    return (

        <Container className="mt-5">

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
                                <td className="d-flex">
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
