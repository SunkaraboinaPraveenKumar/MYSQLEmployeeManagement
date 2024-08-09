import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/auth/profile', { withCredentials: true })
      .then(response => {
        if (response.data.Status) {
          setAdmin({ ...admin, email: response.data.Result.email });
          setLoading(false);
        } else {
          setError(response.data.Error);
          setLoading(false);
        }
      })
      .catch(error => {
        setError('Failed to fetch admin data');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/auth/profile', admin, { withCredentials: true })
      .then(response => {
        if (response.data.Status) {
          alert('Profile updated successfully');
        } else {
          setError(response.data.Error);
        }
      })
      .catch(error => {
        setError('Failed to update profile');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Admin Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Profile Information</h5>
          <p className="card-text"><strong>Email:</strong> {admin.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Update Profile</button>
      </form>
    </div>
  );
};

export default AdminProfile;
