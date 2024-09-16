import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Rating from '../Store/Rating';
import { SearchContext } from '../../context/SearchContext';
import { useUser } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreList = () => {
    const notify = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 1000,
        closeButton: false});
    const { searchQuery } = useContext(SearchContext)
    const [stores, setStores] = useState([]);
    const [ratings, setRatings] = useState([]);
    const {userInfo}= useUser();
    
    useEffect(() => {
      const fetchStores = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/stores');
          setStores(response.data);
          

          
        } catch (error) {
          notify('Error When fetching stores');
        }
      };
  
      fetchStores();
    }, []);


    const navigate = useNavigate();
    const handleViewDetails = (id) => {
        navigate(`/detail/${id}`);
      };
      let filteredStores
      try {
        filteredStores = stores.filter(store =>
            store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } catch (error) {
        filteredStores = stores
      }


    return (
        <div className='row'>
        <ToastContainer/>

            {filteredStores.map(store=>(
                <div key={store._id} className="col-lg-3 col-sm-6">
                <div className="row p-2">
                    <div className="col-12 p-1">
                        <div className="card border-0 p-3 shadow border-top border-5 rounded">
                            
                            <div className="d-flex justify-content-center">
                            <img src="https://placehold.co/500x400/png" className="card-img-top rounded" />
                            </div>
    
                            <div className="card-body pb-0">
                                <div className="pl-1">
                                    <p className="card-title h5 text-dark opacity-75 text-uppercase text-center">{store.name}</p>
                                    <p className="card-title text-warning text-center">Address: <b>{store.address}</b></p>
                                </div>
                                <div className="pl-1">
                                    <p className="text-dark text-opacity-75 text-center py-2 mb-0">
                                        Avg Rating:
                                        <b className="text">
                                            {store.averageRating}
                                        </b>
                                    </p>
                                </div>
                                <div>
                                    <Rating storeId={store._id} ratings={store.ratings}/>

                            </div>
                            </div>
                            <div>
                                <button onClick={() => handleViewDetails(store._id)} className="btn btn-primary bg-gradient border-0 form-control">
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    
            ))}
        
        </div>
    );
};

export default StoreList;
