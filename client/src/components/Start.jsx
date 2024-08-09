import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Start = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const result = await axios.get('https://mysqlemployeemanagement.onrender.com/verify', { withCredentials: true });
                if (result.data.Status) {
                    if (result.data.role === "admin") {
                        navigate("/dashboard");
                    } else {
                        navigate("/employee_detail/" + result.data.id);
                    }
                }
            } catch (err) {
                console.error("Error verifying user:", err);
            }
        };
        
        verifyUser();
    }, [navigate]);

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <h2 className='text-center'>Login As</h2>
                <div className='d-flex justify-content-between mt-5 mb-2'>
                    <button type='button' className='btn btn-primary' onClick={() => { navigate('/employee_login') }}>Employee</button>
                    <button type='button' className='btn btn-success' onClick={() => { navigate('/adminlogin') }}>Admin</button>
                </div>
            </div>
        </div>
    );
};

export default Start;
