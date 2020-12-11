import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Employeelist from './Employeelist';

const Home = () => {
    return (
        <Fragment>
            <Link to="/add">
                <button onClick={() => {}}>Add Employee</button>
            </Link>
            <Employeelist />
        </Fragment>
    );
}
 
export default Home;