import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Components
import Navigation from './components/template/Navigation';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import TestInterceptor from './components/TestInterceptor';

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/testing" component={TestInterceptor} />
        </Switch>
        {/* Foot */}
      </Router>
    </div>
  );
}

export default App;
