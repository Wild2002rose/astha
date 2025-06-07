import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../images/astha_logo.png';
import pic2 from '../images/pic2.png';
import About from "./nav_com/About";
import Branch from "./nav_com/Branch";
import Service from "./nav_com/Service";
import Patient from "./nav_com/Patient";
import { getAllBranches } from "../Api Services/Branch/Branches";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faUser } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showService, setShowService] = useState(false);
    const [showBranch, setShowBranch] = useState(false);
    const [showPatient, setShowPatient] = useState(false);
    const [showProfileDropDown, setShowProfileDropDown] = useState(false);
    const dropdownRef = useRef();
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const aboutRef = useRef();
    const serviceRef = useRef();
    const branchRef = useRef();
    const patientRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(
                !dropdownRef.current?.contains(event.target) &&
                !aboutRef.current?.contains(event.target) &&
                !serviceRef.current?.contains(event.target) &&
                !branchRef.current?.contains(event.target) &&
                !patientRef.current?.contains(event.target)
            ){
                setShowProfileDropDown(false);
                setShowAbout(false);
                setShowService(false);
                setShowBranch(false);
                setShowPatient(false);
            }
        };
        document.addEventListener("mousedown",handleClickOutside);
            return () => {
                document.removeEventListener("mousedown",handleClickOutside);
            };
    }, []);

    const toggleAbout = () => setShowAbout((prev) => !prev);
    const toggleService = () => setShowService((prev) => !prev);
    const toggleBranch = () => setShowBranch((prev) => !prev);
    const togglePatient = () => setShowPatient((prev) => !prev);

    useEffect(() => {
        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');
        const storedUserId = localStorage.getItem('userId');
        const storedUserRole = localStorage.getItem('userRole');
        if(storedFirstName && storedUserId) {
            setFirstName(storedFirstName);
            setLastName(storedLastName);
            setUserId(storedUserId);
            setUserRole(storedUserRole);
        }
    },[]);
    
    const handleLogOut = () => {
        localStorage.clear();
        setFirstName(null);
        setUserId(null);
        setUserRole(null);
        setShowProfileDropDown(false);
    }

    const getRoleFromUserId = (id) => {
        if (id?.startsWith("D")) return "Doctor";
        if (id?.startsWith("P")) return "Patient";
        return null;
    };
    

    return (
        <div>
            <nav className="nav flex text-sm  ml-6 items-center relative mt-2">
                <Link to={"/"}>
                    <img src={logo} alt="Logo" className="logo" />
                </Link>

                <ul className="flex text-md font-bold">
                    <li
                        className="ml-6 cursor-pointer relative"
                        onClick={toggleAbout}
                        ref={aboutRef}
                    >
                        ABOUT
                        {showAbout && (
                            <div className="absolute top-full left-0 mt-8">
                                <About />
                            </div>
                        )}
                    </li>

                    <li
                        className="ml-6 cursor-pointer relative"
                        onClick={toggleService}
                        ref={serviceRef}
                    >
                        SERVICE
                        {showService && (
                            <div className="absolute top-full left-0 mt-7">
                                <Service />
                            </div>
                        )}
                    </li>

                    <Link to={"/branches"}>
                    <li
                        className="ml-6 cursor-pointer relative"
                        onClick={toggleBranch}
                        ref={branchRef}
                    >
                        BRANCH
                        {showBranch && (
                            <div className="absolute top-full left-0 mt-7">
                                <Branch />
                            </div>
                        )}
                    </li>
                    </Link>

                    <li
                        className="ml-6 cursor-pointer relative"
                        onClick={togglePatient}
                        ref={patientRef}
                    >
                        FOR PATIENTS
                        {showPatient && (
                            <div className="absolute top-full left-0 mt-8">
                                <Patient />
                            </div>
                        )}
                    </li>

                    <li className="ml-8 cursor-pointer relative">CONTACT US</li>
                </ul>

                <div className="search flex ml-8 items-center">
                    <input type="search" placeholder="What are you looking for?" required className="" />
                    <button className="">SEARCH</button>
                </div>
                <div>
                    <Link to={ userId
                    ? (getRoleFromUserId(userId) === "Doctor" ? "/doctorDashboard" : "/patientDashboard")
                     : "/login" }>
                        <h1 className="appointment ml-8 text-md font-semibold">
                            <img src={pic2} alt="" className="h-6 w-6 mr-6" />
                            APPOINTMENT
                        </h1>
                    </Link>
                </div>
                <div className="icon relative" ref={dropdownRef}>
                    <Link >
                    <FontAwesomeIcon 
                    icon={faUser} 
                    className="cursor-pointer h-6 ml-10 mt-5"
                    onClick={()=> setShowProfileDropDown(!showProfileDropDown)}
                    />
                    {showProfileDropDown && (
                    <div className="absolute right-0 mt-9 shadow-lg rounded-md py-2 z-50 profile-menu">
                        
                        
                        <div className={`bg-transparent border-b-[0.5px] w-3/4 mx-auto border-gray-300 
                        ${firstName ? "h-[60px]" : "h-[30px]"}`}>

                        {firstName ? (
                            <>
                            <Link to={userId?.startsWith("D") ? "/doctorDashboard" : "/patientDashboard"}>
                                <h1 className="block bg-transparent leading-tight px-2 py-2 text-lg font-bold text-black hover:text-lime-400">
                                Hi {firstName}
                                </h1>
                            </Link>
                            <p className="block leading-none mt-[-10px] bg-transparent px-2 py-2 text-sm font-normal text-black">
                                {userId}
                            </p>
                            </>
                        ) : (
                            <div className="bg-transparent flex justify-center gap-2">
                            <Link
                                to="/login"
                                className="block bg-transparent leading-tight px-2 py-2 text-md text-black font-bold hover:text-lime-400">
                                Login
                            </Link>
                            <span className="bg-transparent text-black font-bold mt-1">/</span>
                            <Link
                                to="/register"
                                className="block bg-transparent leading-tight px-2 py-2 text-md text-black font-bold hover:text-lime-400">
                                Register
                            </Link>
                            </div>
                        )}
                        </div>

                        
                        {firstName && userId?.startsWith("D") && (
                        <div className="bg-transparent border-b-[0.5px] w-3/4 mx-auto border-gray-300 h-[115px] mt-2">
                            <Link to="/doctorDashboard">
                            <h1 className="block bg-transparent px-2 py-2 text-md text-black hover:font-bold">Patient List</h1>
                            </Link>
                            <Link to="/doctorDashboard">
                            <h1 className="block bg-transparent px-2 py-2 text-md text-black hover:font-bold">My Schedule</h1>
                            </Link>
                            <Link to="/doctorDashboard">
                            <h1 className="block bg-transparent px-2 py-2 text-md text-black hover:font-bold">Manage Reports</h1>
                            </Link>
                        </div>
                        )}

                        
                        {firstName && userId?.startsWith("P") && (
                        <div className="bg-transparent border-b-[0.5px] w-3/4 mx-auto border-gray-300 h-[72px] mt-2">
                            <Link to="/patientDashboard">
                            <h1 className="block bg-transparent px-2 py-2 text-md text-black hover:font-bold">Appointments</h1>
                            </Link>
                            <Link to="/patientDashboard">
                            <h1 className="block bg-transparent px-2 py-2 text-md text-black hover:font-bold">Orders</h1>
                            </Link>
                        </div>
                        )}

                        
                        {firstName && (
                        <div className="bg-transparent w-3/4 mx-auto h-[65px] mt-2">
                            <Link to="/editProfile">
                            <h1 className="block bg-transparent px-2 py-2 text-md text-black hover:font-bold">
                            Edit Profile
                            </h1>
                            </Link>
                            <h1
                            onClick={handleLogOut}
                            className="block bg-transparent px-2 py-2 text-md text-black hover:font-bold cursor-pointer">
                            Log Out
                            </h1>
                        </div>
                        )}
                    </div>
                    )}

                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
