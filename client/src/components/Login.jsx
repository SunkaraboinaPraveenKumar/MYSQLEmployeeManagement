import React, { useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;//req for cookie to store
    const [values,setValues]=useState({
        email:'',
        password:''
    });
    const [error,setError]=useState(null);
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('https://mysqlemployeemanagement.onrender.com/auth/adminlogin',values)
        .then(result=>{
            if(result.data.loginStatus){
                localStorage.setItem("valid",true);
                navigate('/dashboard');
            }
            else{
                setError(result.data.Error);
            }
        })
        .catch(err=>console.log(err));
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className="text-warning">
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Enter Email"
                            className="form-control rounded-0"
                            onChange={(e)=>setValues({...values,email:e.target.value})}
                        />
                    </div>
                    <div  className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Enter Password"
                            className="form-control rounded-0"
                            onChange={(e)=>setValues({...values,password:e.target.value})}
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
                    <div  className='mb-1'>
                       <input type="checkbox" name='tick' id='tick' className='me-2'/> 
                       <label htmlFor="tick">Agree To Terms & Conditions..</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
