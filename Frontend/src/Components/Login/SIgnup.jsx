import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URLS } from "../../api.config";

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`${API_URLS}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                toast.success('Registration successful!', {
                    onClose: () => {
                        window.location.href = '/';
                    }
                });
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed');
                toast.error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('An error occurred, please try again later');
        }
    };

    return (
        <div className="signup-form container">
            <ToastContainer />
            <div className='form-login'>
                <h2 className='text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name" 
                            required
                        />
                    </div>
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
                            autoComplete="new-password" 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <p className="signup-link text-center">Already have an account? <Link to="/">Login</Link></p>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary m-3">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
