import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Post from './Post';
import AddPost from './AddPost';
import EditPost from './EditPost';
import { Container, Row, Col } from 'react-bootstrap';
import BlogContextProvider from '../../../../contexts/BlogContext';

const PostsIndex = () => {
    return (
        <div style={{ minHeight: '85vh' }}>
            <Container>
                <Row>
                    <Col>
                        <BlogContextProvider>
                            <Switch>
                                <Route path="/post/home" component={Post} />
                                <Route path="/post/addpost" component={AddPost} />
                                <Route path="/post/editpost/:id" component={EditPost} />
                                <Redirect to="/post/home" />
                            </Switch>
                        </BlogContextProvider>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
 
export default PostsIndex;