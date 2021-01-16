import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Customers from './customers';
import Trainings from './trainings';
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <div>
            <AppBar position="static">
                <Toolbar>
                  <Typography>Personal trainer app</Typography>
                </Toolbar>
            </AppBar>
            </div>
        <Router>
          <div>
            <Link to="/" style={{padding: 30}}>Customers </Link>
            <Link to="/trainings" style={{padding: 30}}>Trainings </Link>
            <Switch>
              <Route exact path="/" component={Customers} />
              <Route exact path="/trainings" component={Trainings} />
              <Route render={() => <h1> Page not   found</h1>}/>
            </Switch>
          </div>
        </Router>
      </div>
  );
}

export default App;
