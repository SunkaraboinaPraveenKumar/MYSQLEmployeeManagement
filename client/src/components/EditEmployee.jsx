import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleImageChange = (e) => {
        setEmployee({ ...employee, image: e.target.files[0] });
    };
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        category_id: '',
    });
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get('https://mysqlemployeemanagement.onrender.com/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                }
                else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));

        axios.get('https://mysqlemployeemanagement.onrender.com/auth/employee/'+id)
            .then(result => {
                if (result.data.Status) {
                    setEmployee({
                        ...employee,
                        name:result.data.Result[0].name,
                        email:result.data.Result[0].email,
                        address:result.data.Result[0].address,
                        salary:result.data.Result[0].salary,
                        category_id:result.data.Result[0].category_id,
                    })
                    // console.log(result.data);
                }
                else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put('https://mysqlemployeemanagement.onrender.com/auth/edit_employee/'+id, employee)
        .then(result=>{
            if(result.data.Status){
                navigate("/dashboard/employee");
            }
            else{
                alert(result.data.Error);
            }
        })
        .catch(err=>console.log(err));
    }
    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name:</strong></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="off"
                            placeholder="Enter Name"
                            className="form-control rounded-0"
                            value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Enter Email"
                            className="form-control rounded-0"
                            value={employee.email}
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="salary"><strong>Salary:</strong></label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            autoComplete="off"
                            placeholder="Enter Salary"
                            className="form-control rounded-0"
                            value={employee.salary}
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="address"><strong>Address:</strong></label>
                        <textarea
                            id="address"
                            name="address"
                            autoComplete="off"
                            placeholder="Enter Address"
                            className="form-control rounded-0"
                            value={employee.address}
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        ></textarea>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="category_id"><strong>Category:</strong></label>
                        <select
                            id="category_id"
                            name="category_id"
                            className='form-select'
                            value={employee.category_id}
                            onChange={(e) => setEmployee({ ...employee, category_id: parseInt(e.target.value) })}
                        >
                            <option value={0}>Select Category</option>
                            {category.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Edit Employee</button>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee