import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';

const StoreOwnerDashboard = () => {
  const { userInfo } = useUser();
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await axios.get(`http://localhost:5000/api/stores/byemail?email=${userInfo.email}`, config);

        let foundStore = response.data;
        

        if (foundStore) {
          console.log(foundStore);
          
          setStore(foundStore);
          setRatings(foundStore.ratings);
        } else {
          setError('No store found for this user');
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching store data');
        setLoading(false);
      }
    };
    fetchStore();
  }, [userInfo.id, userInfo.token]);

  // Calculate the average rating
  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
    : 'No Ratings Yet';

  // Filter out users who submitted ratings
  const usersWithRatings = ratings.filter(rating => rating.user);

  // Handle loading state
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Dashboard Header */}
      <div className="row mb-4">
        <div className="col-md-12">
          <h2 className="text-center text-dark">Store Owner Dashboard</h2>
        </div>
      </div>

      {/* Average Rating Section */}
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <button className="btn btn-primary w-50 py-3" style={{ fontSize: '1.2rem' }}>
            Average Rating: <span className="fw-bold">{averageRating}</span>
          </button>
        </div>
      </div>

      {/* Ratings Table */}
      {usersWithRatings.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center">
              <tr>
                <th>User Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {usersWithRatings.map((r) => (
                <tr key={r._id}>
                  <td className="text-center">{r.user || 'Anonymous'}</td>
                  <td className="text-center">{r.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">
          No users have submitted ratings yet.
        </div>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
