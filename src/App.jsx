import React from 'react'
import Home from './components/Home'
import Students from './components/Students'
import Dashboard from './components/Dashboard'
// import TouchGameLevelOne from './components/TouchGameLevelOne'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'


export default function App() {
  return (
    <BrowserRouter>

      <Container className="text-center mt-5">
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/students" component={Students} />
          <Route path="/dashboard/:id" component={Dashboard} />
          {/* <Route path="/TouchGameLevelOne/:id" component={TouchGameLevelOne} /> */}
          
        </Switch>
      </Container>




    </BrowserRouter>
  )
}

