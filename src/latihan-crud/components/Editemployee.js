import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';

const Editemployee = (props) => {

    let history = useHistory();
    const { employees, editEmployee } = useContext(GlobalContext);
    const [selectedUser, setSelectedUser] = useState({
        id: null,
        title: "",
        content: ""
    });
    const currentUserId = props.match.params.id;

    useEffect(() => {
        console.log('Edit Useeffect');
        const employeeId = currentUserId;
        const selectedUser = employees.find(emp => emp.id === parseInt(employeeId));
        setSelectedUser(selectedUser);
    }, [currentUserId, employees]);

    const onSubmit = e => {
        e.preventDefault();
        editEmployee(selectedUser);
        history.push('/');
    }

    const handleOnChange = (userKey, value) => setSelectedUser({...selectedUser, [userKey]: value});

    // if (!selectedUser || !selectedUser.id) {
    //     alert("Id dont match !");
    // }

    return (
        <Fragment>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Title</label>
                        <input 
                            type="text"
                            value={selectedUser.title}
                            onChange={e => handleOnChange("title", e.target.value)}
                            placeholder="Enter title"
                        />
                    </div>
                    <div>
                        <label>Content</label>
                        <input 
                            type="text"
                            value={selectedUser.content}
                            onChange={e => handleOnChange("content", e.target.value)}
                            placeholder="Enter Content"
                        />
                    </div>
                    <div>
                        <button type="submit">Edit Employee</button>
                    </div>
                    <div>
                        <Link to="/">Cancel</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}
 
export default Editemployee;