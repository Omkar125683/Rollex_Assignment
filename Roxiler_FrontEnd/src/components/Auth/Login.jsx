import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { BrowserRouter, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        closeButton: false});
        const notifyBad = (msg) => toast.error(msg, {
            position: "top-right",
            autoClose: 1000,
            closeButton: false});
    const { userInfo, loading, error, loginUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser({ email, password });
    };

    return (
        <div className='px-5'>
            <div className="card shadow border-0 mt-2">
                <div className="card-header bg-primary bg-gradient mt-0 py-3">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3 className="py-2 text-white">Login</h3>
                        </div>
                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row">
                        <ToastContainer/>
                        <h4 className='border-bottom pb-3 mb-4 text-danger text-center'>{error && <p>{error}</p>}</h4>
        
                        <h4 className='border-bottom pb-3 mb-4 text-success text-center'>{userInfo && <p>Welcome as {userInfo.role}</p> }</h4>
                        <div className="col-md-12 px-5">
                            <section className='px-5'>
                                <form id="account" onSubmit={handleSubmit}>
                                    <h3 className="border-bottom pb-3 mb-4 text-secondary text-center">Use a local account to log in.</h3>


                                    <div className="form-floating mb-3">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" name="email" autoComplete="username" placeholder="name@example.com" required />
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <span className="text-danger" id="email-validation"></span>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" name="password" autoComplete="current-password" placeholder="password" required />
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <span className="text-danger" id="password-validation"></span>
                                    </div>

                                    <div className="col-12">
                                        <button id="login-submit" disabled={loading} type="submit" className="w-100 btn btn-lg btn-success">{loading ? 'Logging in...' : 'Log In'}</button>
                                    </div>

                                    <div className="row pt-3">
                                        <div className="col-md-6 text-center">
                                            <Link to="/" id="home">Go home?</Link>
                                        </div>
                                        <div className="col-md-6 text-center">
                                            <Link to="/register" id="register">Register as a new user</Link>
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

export default Login;
