import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URLS } from '../../api.config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URLS}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                toast.success('Login successful', {
                    autoClose: 200,
                    onClose: () => {
                        navigate('/dashboard');
                    }
                });
            } else {
                const data = await response.json();
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            toast.error('An error occurred, please try again later');
        }
    };


    return (
        <div className="login-form container">
            <ToastContainer />

            <div className="form-login">
                <h2 className='text-center'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary m-3">Login</button>
                    </div>
                </form>
                <p className="signup-link text-center">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
