import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
    const navigate=useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null); // Use null as the initial state

    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/' + id)
            .then(result => {
                console.log(result.data);
                setEmployee(result.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    const imagePathParts = employee.image.split("\\");
    const imageFileName = imagePathParts[2] ? imagePathParts[2] : ''; // Get the third part
    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate("/")
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <div className='p-2 d-flex justify-content-center shadow'>
                <h4>Employee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img src={`http://localhost:3000/images/` + imageFileName} alt="" className='employee_det_image' style={{ height: '250px', width: '250px', borderRadius: '50%' }} />
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: ${employee.salary}</h3>
                </div>
                <div>
                    <button className='btn btn-primary me-2'>Edit</button>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetail;
