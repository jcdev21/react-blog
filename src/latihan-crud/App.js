import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './AppStyle.css';

import Home from './components/Home';
import Addemployee from './components/Addemployee';
import Editemployee from './components/Editemployee';

import { GlobalProvider } from './contexts/GlobalContext';

const App = () => {
    return (
        <GlobalProvider>
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/add" component={Addemployee} exact />
                    <Route path="/edit/:id" component={Editemployee} exact />
                </Switch>
            </Router>
        </GlobalProvider>
    );
}

export default App;