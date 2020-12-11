import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

const DashboardIndex = () => {
    
    return (
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    );
}
 
export default DashboardIndex;