import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCategory = () => {
    const navigate=useNavigate();
    const [category,setCategory]=useState();
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('https://mysqlemployeemanagement.onrender.com/auth/add_category',{category})
        .then(result=>{
            if(result.data.Status){
                navigate("/dashboard/category");
            }
            else{
                alert(result.data.Error);
            }
        })
        .catch(error=>console.log(error));
    }
    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Email:</strong></label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            autoComplete="off"
                            placeholder="Enter Category"
                            className="form-control rounded-0"
                            onChange={(e)=>setCategory(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory