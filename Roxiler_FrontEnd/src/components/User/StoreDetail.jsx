import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Details.css';
import { useUser } from '../../context/UserContext';
import Rating from '../Store/Rating';

const StoreDetail = () => {
    const notify = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 1000,
        closeButton: false});
    const { id } = useParams();
  const [store, setStore] = useState(null);
  const [error, setError] = useState(null);
  
  const { userInfo } = useUser();

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`, 
          },
        };

        const response = await axios.get(`http://localhost:5000/api/stores/${id}`, config); 
        setStore(response.data); 
        
      } catch (error) {
        notify('Error fetching store details');
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    if (id) {
      fetchStoreDetails();
    }
  }, [id]);


    return (
        <>
        {store ?
        <div className="card shadow border-0 mt-4 mb-4">
            <div className="card-header bg-dark bg-gradient text-light py-4">
                <div className="row">
        <ToastContainer/>

                    <div className="col-12 text-center">
                        <h3 className="text-white text-uppercase">{store.name}</h3>
                        <p className="text-white-50 fw-semibold mb-0">{store.email}</p>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="py-3">
                    <div className="row">
                        <div className="col-6 col-md-2 offset-lg-1 pb-1">
                            <Link to="/" className="btn btn-outline-primary bg-gradient mb-5 fw-semibold btn-sm text-uppercase">
                                <small>Back to home</small>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-3 offset-lg-1 text-center mb-3">
                            <img src="https://placehold.co/500x400/png" className="card-img-top rounded" alt="Store" />
                        </div>
                        <div className="col-12 col-lg-6 offset-lg-1">
                            <div className="col-12 col-md-6 pb-4">
                                <div className="btn-success btn">Avg. Rating: <h5 className='text-secondary'> {store.averageRating} Stars </h5> </div>
                            </div>

                            <div>
                                <ul className="scrollable-ul border rounded">
                                    {store.ratings.map((user, index) => (
                                        <li key={index}>
                                            <span>{user.user}</span>
                                            <span>{user.rating} Stars</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="row ps-2 my-3">
                                <p className="text-warning fw-bold lh-sm">{store.address}</p>
                            </div>


                            <div className="row">
                                <div className="col-12 col-md-6 pb-1">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : <h1>Loading.....</h1>}
        </>
    );
};

export default StoreDetail;
