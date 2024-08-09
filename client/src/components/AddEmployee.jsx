import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [category, setCategory] = useState([]);
    const navigate=useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        image: null,
        category_id: '',
    });

    // Fetch categories from backend on component mount
    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error(err));
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('salary', employee.salary);
        formData.append('address', employee.address);
        formData.append('category_id', employee.category_id);
        formData.append('image', employee.image);

        axios.post('http://localhost:3000/auth/add_employee', formData)
            .then(result => {
                if(result.data.Status){
                    navigate('/dashboard/employee')
                }
                else{
                    alert(result.data.Error);
                }
                // Optionally reset form fields or show success message
                setEmployee({
                    name: '',
                    email: '',
                    password: '',
                    salary: 0,
                    address: '',
                    image: null,
                    category_id: 0,
                });
            })
            .catch(err => console.error(err));
    };

    // Handle file input change
    const handleImageChange = (e) => {
        setEmployee({ ...employee, image: e.target.files[0] });
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>Add Employee</h2>
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
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Enter Password"
                            className="form-control rounded-0"
                            value={employee.password}
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
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
                    <div className='mb-3'>
                        <label htmlFor="image"><strong>Select Image:</strong></label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="form-control rounded-0"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Add Employee</button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
