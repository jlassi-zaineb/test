import React from 'react'
import Home from './components/Home'
import Students from './components/Students'
import Dashboard from './components/Dashboard'
import TouchGameLevelOne from './components/games/TouchGameLevelOne'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
     
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/students" component={Students} />
          <Route path="/dashboard/:id" component={Dashboard} />
          <Route path="/TouchGameLevelOne" component={TouchGameLevelOne} />
          
        </Switch>
    
    </BrowserRouter>
  )
}

