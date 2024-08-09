import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios.get('https://mysqlemployeemanagement.onrender.com/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('https://mysqlemployeemanagement.onrender.com/auth/delete_employee/' + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => {
                const imagePathParts = e.image.split("\\");
                const imageFileName = imagePathParts[2] ? imagePathParts[2] : ''; // Get the third part
                return (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td><img src={`https://mysqlemployeemanagement.onrender.com/images/` + imageFileName} alt="" className='employee_img' style={{width:'40px',height:'40px',borderRadius:'50%'}}/></td>
                    <td>{e.email}</td>
                    <td>{e.address}</td>
                    <td>{e.salary}</td>
                    <td>
                      <Link to={`/dashboard/edit_employee/` + e.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                      <button className='btn btn-warning btn-sm' onClick={() => handleDelete(e.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
