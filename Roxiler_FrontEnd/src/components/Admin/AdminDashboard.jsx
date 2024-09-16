import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const notify = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 1000,
    closeButton: false});
  const { userInfo } = useUser();
  const [users, setUsers] = useState([]);
  const [ratingUserCount, setRatingUserCount] = useState(0);
  const [stores, setStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchUsersAndStores = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const usersRes = await axios.get('http://localhost:5000/api/users',config);
        const storesRes = await axios.get('http://localhost:5000/api/stores',config);
        setUsers(usersRes.data);

        
        let countsOfRaters = storesRes.data.map((e)=>{
          return Number(e.__v)
        })
        setRatingUserCount((countsOfRaters).sort((a, b) => b - a)[0])
        setStores(storesRes.data);
        
      } catch (error) {
        notify("Something wrong with Fetching Users and Stores")
      }
    };
    fetchUsersAndStores();
  }, []);


  const totalUsers = users.length;
  const totalStores = stores.length;


  let filteredUsers = users
  try {
    filteredUsers = users
    .filter((user) => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) => (roleFilter ? user.role === roleFilter : true));
  } catch (error) {
    notify("Filter Can't Be Applied!")
    
  }


  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortDirection === 'asc') return nameA > nameB ? 1 : -1;
    return nameA < nameB ? 1 : -1;
  });


  let usersWithRatings = users;
  try {
    usersWithRatings = users.filter(user => user.ratings.length > 0).length;
  } catch (error) {
notify("No Filter for Ratings Workable")
    
  }

  return (
    <div className="container mt-4">
      <ToastContainer/>
      <div className="row mb-4">
        <div className="col-md-4">
          <button className="btn btn-primary w-100">Total Users: {totalUsers}</button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-success w-100">Total Stores: {totalStores}</button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-warning w-100">Users Submitted Rating: {ratingUserCount}</button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Email, or Address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="">Filter by Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="StoreOwner">Store Owner</option>
          </select>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          >
            Sort by Name ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>{user.role=="StoreOwner" ? stores.map(e=>e.email==user.email ? e.averageRating:null).sort((a, b) => b - a)[0]: null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
