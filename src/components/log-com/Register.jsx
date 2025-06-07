import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [userRole, setUserRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [opdId,setOpdId] = useState('');
    const [opdList, setOpdList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('https://localhost:7230/api/Auth/GetUserRoles');
                setRoles(response.data);
            } catch (error) {
                setError('Failed to fetch roles');
            }
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        const fetchOpds = async () => {
            try {
                const response = await axios.get('https://localhost:7230/api/Auth/GetOPDs');
                setOpdList(response.data);
            }catch(error){
                setError('Failed to fetch OPD List');
            }
        }
        fetchOpds();
    },[]);



    const handleSendOtp = async () => {
        try {
            const response = await axios.post('https://localhost:7230/api/Auth/Send_Otp', {
                MobileNumber: mobileNumber
            });
            if (response.status === 200) {
                setIsOtpSent(true);
                setError('');
            } else {
                setError('Failed to send OTP');
            }
        } catch (error) {
            setError('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('https://localhost:7230/api/Auth/Verify_Otp', {
                mobileNumber,
                otp
            });

            if (response.status === 200 && response.data?.msg?.toLowerCase().includes('success')) {
                setIsOtpVerified(true);
                setError('');
            } else {
                setError('Invalid OTP');
            }
        } catch (error) {
            setError('Error verifying OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        const registerData = {
            firstName,
            lastName,
            emailAddress,
            mobileNumber,
            userRole,
            password,
            confirmPassword,
        };
        if (userRole === 'Doctor') {
            registerData.opdId = opdId;
        }

        try {
            await axios.post('https://localhost:7230/api/Auth/Register', registerData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setError('');
            setSuccessMessage("🎉 Welcome to our Astha Family! Your User ID has been sent to your mobile number. You can now log in using your User ID and password.");

            setTimeout(() => {
                navigate('/login');
            }, 10000);
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <>
            <Navbar />
            <div className="register-container">
                <h1 className="text-white mb-10 text-xl font-bold">Register Here</h1>

                {successMessage ? (
                    <p className="success-message">{successMessage}</p>
                ) : (
                    
                    <>
                        {!isOtpVerified ? (
                            <>
                                {!isOtpSent ? (
                                    <div style={{ textAlign: 'center' }}>
                                        <input
                                            type="text"
                                            placeholder="Enter Mobile No"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            required
                                            className="input-field"
                                        />
                                        {error && <p className="error-message">{error}</p>}
                                        <div className="button-container">
                                            <button type="button" onClick={handleSendOtp} className="submit-btn">
                                                Send OTP
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                            className="input-field"
                                        />
                                        {error && <p className="error-message">{error}</p>}
                                        <div className="button-container">
                                            <button type="button" onClick={handleVerifyOtp} className="submit-btn">
                                                Verify OTP
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <form onSubmit={handleSubmit} className="register-form">
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="input-field"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="input-field"
                                />
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    required
                                    className="input-field"
                                />

                                <select
                                    value={userRole}
                                    onChange={(e) => setUserRole(e.target.value)}
                                    required
                                    className="input-field"
                                >
                                    <option value="">Select User Role</option>
                                    {roles.map((role, index) => (
                                        <option key={index} value={role.Role}>
                                            {role.Role}
                                        </option>
                                    ))}
                                </select>

                                {userRole === 'Doctor' &&(
                                <select
                                    value={opdId}
                                    onChange={(e) => setOpdId(parseInt(e.target.value))}
                                    required
                                    className="input-field"
                                >
                                    <option value="">Select Your Specialization</option>
                                    {opdList.map((opd) => (
                                        <option key={opd.id} value={opd.id}>
                                            {opd.name}
                                        </option>
                                    ))}
                                </select>)}

                                <input
                                    type="password"
                                    placeholder="Create Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="input-field"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="input-field"
                                />
                                {error && <p className="error-message">{error}</p>}
                                <div className="button-container">
                                    <button type="submit" className="submit-btn ml-24 ">
                                        Register
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}

                {!successMessage && (
                    <div className="login-link">
                        <p className="text-white mt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login Here
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Register;
