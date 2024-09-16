import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rating = ({ storeId , ratings}) => {
    const [userRating, setUserRating] = useState(null);
    const { userInfo } = useUser();
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        closeButton: false});
    useEffect(() => {
        const fetchRating = async () => {
            
            if(userInfo){
                let rate = null
                let ratingValue = ratings.map((e) => 
                {
                    if(e.user.toString() == userInfo.id){
                        rate = e.rating
                    }
                }
                  );
                  setUserRating(rate);
              }
        };
        fetchRating(); 
      }, [storeId, userInfo]); 
    const handleRatingSubmit = async (rating) => {
        if (userRating === rating) return;

        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${userInfo.token}`, 
                },
              };
            const response = await axios.post(`http://localhost:5000/api/stores/${storeId}/rate`, { rating }, config);
            setUserRating(rating);
        } catch (error) {
            console.error('Error submitting rating:', error);
            toast.error('Failed to submit rating');
            
        }
    };

    return (
        <div className="input-group mb-3">
        <ToastContainer/>
            
            <ul className='list-group list-group-horizontal-sm'>
                <li className='input-group-text bg-primary text-dark border-0 fw-semibold'>Rate</li>
                {[1, 2, 3, 4, 5].map((rate) => (
                    <li 
                        key={rate} 
                        className={`btn list-group-item ${userRating === rate ? 'active' : ''}`}
                        onClick={() => handleRatingSubmit(rate)}
                    >
                        {rate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Rating;
