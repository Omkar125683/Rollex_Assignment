import React,{ useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({roleChangeAllow}) => {
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        closeButton: false});
    const notifyBad = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 1000,
        closeButton: false});
    const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '', role: 'User' });
    const [errors, setErrors] = useState({name:'',msg:''});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            notify("User Signup Successfully!!!")
        } catch (err) {
            notifyBad("Invalid Credentials!!!")

            let errorMsg = err.response.data.error;
            let msg = `${errorMsg}`.split(": ")
            setErrors({name: msg[1], msg: msg[2]})
            console.error(err.response.data.error);

        }
    };

    return (
        <div className='px-5'>
<div className="card shadow border-0 mt-2">
    <div className="card-header bg-primary bg-gradient mt-0 py-3">
        <div className="row">
            <div className="col-12 text-center">
                <h3 className="py-2 text-white">{roleChangeAllow ? <>Add Account</> : <>SignUp</>}</h3>
            </div>
        </div>
    </div>
    <div className="card-body p-3">
        <div className="row">
        <ToastContainer/>
            <div className="col-md-12 px-5">
                <section className='px-5'>
                    <form id="account" onSubmit={handleSubmit}>
                        <h3 className="border-bottom pb-3 mb-4 text-secondary text-center">Use a local account to {roleChangeAllow ? <>Add Account</> : <>Sign Up</>}.</h3>

                        <div className='row'>
                        <div className="form-floating mb-3 col-md-6">
                            
                            <input type="text" value={formData.name} onChange={handleInputChange} className="form-control" id="name" name="name" autoComplete="name" placeholder="name" required />
                            <label htmlFor="name" className="form-label mx-3">Name</label>
                            {errors.name == "name" && <span className="text-danger">{errors.msg}</span>}
                        </div>

                        <div className="form-floating mb-3 col-md-6">
                            <input type="email" value={formData.email} onChange={handleInputChange} className="form-control" id="email" name="email" autoComplete="email" placeholder="name@example.com" required />
                            <label htmlFor="email" className="form-label mx-3">Email</label>
                            {errors.email == "email" && <span className="text-danger">{errors.msg}</span>}
                        </div>
                        </div>
                        <div className='row'>
                        <div className="form-floating mb-3 col-md-6">
                            <input type="password" value={formData.password} onChange={handleInputChange} className="form-control" id="password" name="password" autoComplete="current-password" placeholder="password" required />
                            <label htmlFor="password" className="form-label mx-3">Password</label>
                            {errors.password == "password" && <span className="text-danger">{errors.msg}</span>}

                        </div>
                        <div className="form-floating mb-3 col-md-6">
                            <input type="text" value={formData.address} onChange={handleInputChange} className="form-control" id="address" name="address" autoComplete="address" placeholder="address" required />
                            <label htmlFor="address" className="form-label mx-3">Address</label>
                            {errors.address == "address" && <span className="text-danger">{errors.msg}</span>}
                        </div>
                        
                        
                        </div>
                    {
                        roleChangeAllow ? <div className="form-floating mb-3 col-md-6">
                        <select value={formData.role} onChange={handleInputChange} className="form-select" htmlFor="role" name="role">
                            <option defaultValue={'User'} value={'User'}> User </option>
                            <option value={'Admin'}> Admin </option>
                            <option value={'StoreOwner'}> StoreOwner </option>
                        </select>
                        {errors.role == "role" && <span className="text-danger">{errors.msg}</span>}
                    </div> : <></>
                    }
                        
                        <div className="col-12">
                            <button id="signup-submit" type="submit" className="w-100 btn btn-lg btn-success">Sign up</button>
                        </div>

                        <div className="row pt-3">
                            {roleChangeAllow ?<> </>: 
                            <>
                            <div className="col-md-6 text-center">
                                <Link to="/" id="home">go home?</Link>
                            </div>
                            <div className="col-md-6 text-center">
                                <Link to="/login" id="login">Login if Existing user</Link>
                            </div>
                            </>}
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

export default Signup;
