import React, { Fragment, useState, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { useHistory, Link } from 'react-router-dom';

const Addemployee = () => {

    const {employees, addEmployee} = useContext(GlobalContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let history = useHistory();
    
    const onSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            id: employees.length + 1,
            title,
            content
        };
        addEmployee(newEmployee);
        history.push('/');
    }

    return (
        <Fragment>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Title</label>
                        <input 
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                    </div>
                    <div>
                        <label>Content</label>
                        <input 
                            type="text"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Enter Content"
                        />
                    </div>
                    <div>
                        <button type="submit">Add Employee</button>
                    </div>
                    <div>
                        <Link to="/">Cancel</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}
 
export default Addemployee;