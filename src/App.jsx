import React from 'react'
import Home from './components/Home'
import Students from './components/Students'
import Settings from './components/Settings'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default function App() {
  return (
    <BrowserRouter>

      <Container className="border fixed">
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/students" component={Students} />
          <Route path="/settings" component={Settings} />

        </Switch>
      </Container>




    </BrowserRouter>
  )
}

