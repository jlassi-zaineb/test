import React, { useCallback } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { house, returnArrow, trash } from '../assets/icons'


function Dashbord() {
    const history = useHistory()
    const params = useParams()

    // const getHistory = () => {
    //     const url = (`/api/history/${params.id}`)
    //     fetch(url)
    // }

    // useEffect(() => { //récupération de l'historique et l'afficher en bas
        
    // }
    // }, [params])

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
                <Button variant="outline-danger" onClick={() => deleteStudent(params.id)}>{trash} </Button>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col> <h5>Tableau de bord</h5> </Col>
        </Row>

    </Container>
)
}

export default Dashbord
