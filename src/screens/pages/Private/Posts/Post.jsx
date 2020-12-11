import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

// Gridjs
import CobaGrid2 from './CobaGrid2';

// Component
import ModalDetail from './component/ModalDetail';

const Post = () => {
    console.log('Post');

    const [showDetail, setShowDetail] = useState(false);
    const [count, setCount] = useState(0);

    const test = () => {
        setShowDetail(true);
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
    }

    return (
        <div>
            
            <ModalDetail show={showDetail} onHide={handleCloseDetail} />
            
            <NavLink to="/post/addpost">
                <Button type="button" variant="primary">Add Post</Button>
            </NavLink>
            <button onClick={test}>Test Modal</button>
            <button onClick={() => setCount(curret => curret + 1)}>Counter : {count}</button>
            <Link to="/post/editpost/1">Edit</Link>

            <hr/>
            <MemoizedCobaGrid2 />

        </div>
    );
}

const MemoizedCobaGrid2 = React.memo(CobaGrid2);

export default Post;