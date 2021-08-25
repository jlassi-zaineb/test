import React from 'react'
import Home from './components/Home'
import Students from './components/Students'
import Dashbord from './components/Dashbord'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'


export default function App() {
  return (
    <BrowserRouter>

      <Container className="text-center mt-5">
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/students" component={Students} />
          <Route path="/dashbord/:id" component={Dashbord} />
          
        </Switch>
      </Container>




    </BrowserRouter>
  )
}

