import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthContextProvider from '../contexts/AuthContext';
import BlogContextProvider from '../contexts/BlogContext';
import Private from './pages/Private';
import PrivateRoute from '../auths/PrivateRoute';
// import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
import Header from '../component/Header';
import Login from './pages/Login';
import { Home, Detail } from './pages/Home';

import './main.css';
import 'aos/dist/aos.css';

const App = () => {
    
    return (
        <div style={{ maxWidth: '100vw' }}>
            <AuthContextProvider>
                <Router>
                    <Header />
                    <Switch>
                        <PrivateRoute path="/dashboard" component={Private} />
                        <PrivateRoute path="/user" component={Private} />
                        <PrivateRoute path="/post" component={Private} />
                    
                        <Route path="/login" component={Login} />
                        <BlogContextProvider>
                            <Route exact path="/" component={Home} />
                            <Route path="/detail/:id" component={Detail} />
                        </BlogContextProvider>
                    </Switch>
                </Router>
                <Footer />
            </AuthContextProvider>
        </div>
    );

}

export default App;