import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import User from './User';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { Container, Row, Col } from 'react-bootstrap';
import UserContextProvider from '../../../../contexts/UserContext';

const UserIndex = () => {

    return (
        <div style={{ minHeight: '85vh' }}>
            <Container>
                <Row>
                    <Col>
                        <UserContextProvider>
                            <Switch>
                                <Route path="/user/home" component={User} />
                                <Route path="/user/adduser" component={AddUser} />
                                <Route path="/user/edit/:id" component={EditUser} />
                                <Redirect to="/user/home" />
                            </Switch>
                        </UserContextProvider>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
 
export default UserIndex;