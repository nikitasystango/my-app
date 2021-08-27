import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.css';
import Home from './Components/home';
import List from './Components/list';
import history from './Components/history'

function App() {

  useEffect(() => {
    history.listen((location, action) => {
        console.log('check for sw updates on page change')
        // check for sw updates on page change
        navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((reg) => reg.update()))
    })
  }, [])

  return (

      <Router history={createBrowserHistory()} >
    <Switch>
    <Route exact path={'/'} component={Home} />
    <Route exact path={'/list'} component={List} />
    </Switch>
    </Router>
  );
}

export default App;
