import React from 'react';
import { Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import SessionForm from "./components/session_form/session_form"


const App = () => (
    <div>
      <header> 
      </header>
      <Switch>
        <Route exact path='/register' component={SessionForm} />
        <Route exact path='/login' component={SessionForm} /> 
      </Switch>
    </div>
);

export default App;