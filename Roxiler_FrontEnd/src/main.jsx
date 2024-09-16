// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/UserContext';
import { BrowserRouter, Link } from 'react-router-dom';
import App from './App';
import './bootswatch.css'
import SearchBar from './components/User/SearchBar';
import { SearchProvider } from './context/SearchContext';
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <SearchProvider>
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand btn btn-info px-5">Roxiler</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav ms-auto flex-grow-1 fw-bold">
                            <li className="nav-item pt-1">
                                <Link to="/" className="nav-link text-dark">Home</Link>
                            </li>
                            <li className="nav-item pt-1 dropdown">
                                <div className="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Edit Profile
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="">
                                    <Link to="/profile/change_details" className="nav-link text-dark">Change Details</Link>

                                    <hr className="dropdown-divider" />
                                    <Link to="/profile/change_password" className="nav-link text-dark">Change Password</Link> 

                                </ul>
                            </li>
                            <li className="nav-item pt-1">
                                <Link to="/store/dashboard" className="nav-link text-dark" >StoreOwner Dashboard</Link>
                            </li>
                            <li className="nav-item pt-1 dropdown">
                                <div className="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin Options
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="">
                                    <Link to="/admin/add_account" className="nav-link text-dark">Add Account</Link>

                                    <hr className="dropdown-divider" />
                                    <Link to="/admin/dashboard" className="nav-link text-dark">List of Accounts</Link>

                                </ul>
                            </li>
                            
                            <li className="nav-item pt-1">
                                <a className="nav-link text-dark px-4" ></a>
                            </li>
                            <li className="nav-item pt-1">
                                <a className="nav-link text-dark px-4" ></a>
                            </li>
                            <li className="nav-item pt-1">
                                <a className="nav-link text-dark px-4" ></a>
                            </li>
                            <li className="nav-item pt-1">
                                <a className="nav-link text-dark px-4" ></a>
                            </li>
                            <li className="nav-item pt-1">
                                <a className="nav-link text-dark px-4" ></a>
                            </li>
                            <li className="nav-item pt-1">
                                <a className="nav-link text-dark px-4" ></a>
                            </li>
                            <li className="nav-item px-5">
                                <a className="nav-link text-dark" >
                                    <SearchBar/>
                                </a>
                            </li>
                            <li className="nav-item pt-1">
                                <Link to="/register" className="nav-link text-dark" >Signup</Link>
                            </li>
                            <li className="nav-item pt-1">
                                <Link to="/login" className="nav-link text-dark" >Login</Link>
                            </li>
                            <li className="nav-item pt-1">
                                <Link to="/logout" className="nav-link text-dark ms-auto" >Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <div className="container">
            <main role="main" className="pb-3">
                <UserProvider>
                <App />
                </UserProvider>
            </main>

        </div>
        </SearchProvider>
    </BrowserRouter>
);
