import { useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const [firstName, setFirstName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dashboardData = {
            firstName: firstName
        };

        try {
            const response = await axios.post('https://localhost:7230/api/auth/Register', dashboardData);
            console.log(response.data);
            localStorage.setItem('firstName', response.data.firstName);
            navigate('/home');
        } catch (error) {
            console.error(error.response?.data?.message || 'Oops!');
            setError(error.response?.data?.message || 'Oops!');
        }

        console.log({ firstName });
    };

    const storedFirstName = localStorage.getItem('firstName');

    return (
        <>
            <Navbar />
            <div style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h1 className="text-white mt-20 text-4xl font-bold">Welcome to our Astha Network! 
                <span className="text-white mt-20 text-2xl font-bold ml-6">{storedFirstName }</span> </h1>
                <Link to="/">
                    <button className="thank">Thank You</button>
                </Link>
            </div>
        </>
    );
}

export default Dashboard;
