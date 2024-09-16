import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = ({ roleChangeAllow }) => {
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        closeButton: false
    });
    const [formData, setFormData] = useState({ name: '', email: '', oldpass: '', address: '', role: 'User' });
    const [errors, setErrors] = useState({ name: '', msg: '' });
    const { userInfo } = useUser();
    const [oldUser, setOldUser] = useState(null);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    useEffect(() => {
        const fetchOldUser = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const response = await axios.get(`http://localhost:5000/api/users/me?id=${userInfo.id}`, config);
                let oldData = response.data;
                setOldUser(oldData);
                setFormData({ name: oldData.name, email: oldData.email, oldpass: '', address: oldData.address, role: oldData.role });

            } catch (error) {
                console.error('Error fetching store details:', error);
            }
        };

        fetchOldUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        setErrors({});
        try {
            await axios.put(`http://localhost:5000/api/users/me?id=${userInfo.id}`, formData, config);
            notify("Account Updated Successfully!!!")

        } catch (err) {
            let errorMsg = err.response.data.error;
            let msg = `${errorMsg}`.split(": ");
            setErrors({ name: msg[1], msg: msg[2] });
            console.error(err.response.data.error);

        }
    };

    return (
        <div className='px-5'>
            <div className="card shadow border-0 mt-2">
                <div className="card-header bg-primary bg-gradient mt-0 py-3">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3 className="py-2 text-white">Profile</h3>
                        </div>
                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row">
                        <ToastContainer />

                        <div className="col-md-12 px-5">
                            <section className='px-5'>
                                <form id="account" onSubmit={handleSubmit}>

                                    <div className='row'>
                                        <div className="form-floating mb-3 col-md-6">

                                            <input onChange={handleInputChange} value={formData.name} type="text" className="form-control" id="name" name="name" autoComplete="name" placeholder="name" required />
                                            <label htmlFor="name" className="form-label mx-3">Name</label>
                                            {errors.name == "name" && <span className="text-danger">{errors.msg}</span>}

                                        </div>

                                        <div className="form-floating mb-3 col-md-6">
                                            <input onChange={handleInputChange} value={formData.email} type="email" className="form-control" id="email" name="email" autoComplete="email" placeholder="name@example.com" required />
                                            <label htmlFor="email" className="form-label mx-3">Email</label>
                                            {errors.email == "email" && <span className="text-danger">{errors.msg}</span>}

                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="form-floating mb-3 col-md-6">
                                            <input onChange={handleInputChange} value={formData.oldpass} type="password" className="form-control" id="oldpass" name="oldpass" autoComplete="old-password" placeholder="old password" required />
                                            <label htmlFor="password" className="form-label mx-3">Old Password</label>
                                        </div>
                                        {roleChangeAllow ?
                                            <div className="form-floating mb-3 col-md-6">
                                                <select onChange={handleInputChange} value={formData.role} className="form-select" htmlFor="role" name="role">
                                                    <option defaultValue value={'User'}> User </option>
                                                    <option value={'Admin'}> Admin </option>
                                                    <option value={'StoreOwner'}> StoreOwner </option>
                                                </select>
                                                {errors.role == "role" && <span className="text-danger">{errors.msg}</span>}

                                            </div> : <></>
                                        }

                                    </div>
                                    <div className='form-floating mb-3 col-md-8'>
                                        <input onChange={handleInputChange} value={formData.address} type="text" className="form-control" id="address" name="address" autoComplete="address" placeholder="address" required />
                                        <label htmlFor="address" className="form-label mx-3">Address</label>
                                        <span className="text-danger" id="email-validation"></span>
                                    </div>

                                    <div className='row'>
                                        <div className="col-5 mb-5">
                                            <button id="edit-submit" type="submit" className="w-100 btn btn-lg btn-success">Edit</button>
                                        </div>
                                        <div className="col-2 mb-5">
                                        </div>

                                    </div>

                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default EditProfile;
