import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import Profile from './components/Profile';
import AddCategory from './components/AddCategory';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Start from './components/Start';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeDetail from './components/EmployeeDetail';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start/>}></Route>
        <Route path='/employee_login' element={<EmployeeLogin />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
          }>
          <Route index element={<Home />} />
          <Route path='employee' element={<Employee />} />
          <Route path='category' element={<Category />} />
          <Route path='profile' element={<Profile />} />
          <Route path='/dashboard/add_category' element={<AddCategory />} />
          <Route path='/dashboard/add_employee' element={<AddEmployee/>} />
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>} />
        </Route>
        <Route path='/employee_detail/:id' element={<EmployeeDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
