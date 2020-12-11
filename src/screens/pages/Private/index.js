import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardIndex from './Dashboard';
import UserIndex from './User';
import PostIndex from './Posts';

const Private = () => {

    console.log('di Index Private');

    return (
        <Switch>
            <Route path="/dashboard" component={DashboardIndex} />
            <Route path="/user" component={UserIndex} />
            <Route path="/post" component={PostIndex} />
        </Switch>
    );
}

export default Private;