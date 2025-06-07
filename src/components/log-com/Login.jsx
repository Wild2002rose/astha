import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Login() {
    
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate(); 

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginData = {
            userId: userId,
            password: password
        };

        try {
            
            const response = await axios.post('https://localhost:7230/api/Auth/Login', loginData);
            console.log(response.data);
            const {userId,firstName,lastName} = response.data;
            localStorage.setItem('userId', userId);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            setErrorMessage(''); 
            navigate('/dashboard'); 

        } catch (error) {
            console.error(error.response?.data.message || 'Login failed');
            setErrorMessage(error.response?.data?.message || 'Login failed'); 
        }
    };

    
    return (
        <>
            <Navbar />
            <div className="login-container ">
                <h1 className="text-white font-bold text-xl mb-10">Login Here</h1>
                <div>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your UserId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="submit-btn mt-10">Login</button>
                    </form>
                    
                    
                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

                    <div className='flex mt-5 ml-8'>
                        <p>Don't have an account? 
                            <Link to="/register">
                                <span className='cursor-pointer text-lime-400'>Register</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
