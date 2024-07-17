import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashBoard = () => {
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  const handleLogout=()=>{
    axios.get('http://localhost:3000/auth/logout')
    .then(result=>{
      if(result.data.Status){
        localStorage.removeItem("valid");
          navigate("/")
      }
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-lg-2 px-sm-2 px-0 bg-light">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Code With Prav</span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item w-100">
                <Link to="/dashboard" className="nav-link text-dark w-100 hover-shadow">
                  <i className="bi bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline">DashBoard</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/dashboard/employee" className="nav-link text-dark w-100 hover-shadow">
                  <i className="bi bi-people"></i><span className="ms-1 d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/dashboard/category" className="nav-link text-dark w-100 hover-shadow">
                  <i className="bi bi-tags"></i><span className="ms-1 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/dashboard/profile" className="nav-link text-dark w-100 hover-shadow">
                  <i className="bi bi-person"></i><span className="ms-1 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/logout" className="nav-link text-dark w-100 hover-shadow" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i><span className="ms-1 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col py-3">
          <div className='p-2 d-flex justify-content-center shadow'>
            <h4>Welcome to the Dashboard</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
