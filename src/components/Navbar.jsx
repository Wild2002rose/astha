import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../images/astha_logo.png';
import pic2 from '../images/pic2.png';
import About from "./nav_com/About";
import Branch from "./nav_com/Branch";
import Service from "./nav_com/Service";
import Patient from "./nav_com/Patient";
import { getAllBranches } from "../Api Services/Branch/Branches";

const Navbar = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showService, setShowService] = useState(false);
    const [showBranch, setShowBranch] = useState(false);
    const [showPatient, setShowPatient] = useState(false);

    

    const handleMouseOverAbout = () => {
        setShowAbout(true);
    };

    const handleMouseOutAbout = () => {
        setShowAbout(false);
    };

    const handleMouseOverService = () => {
        setShowService(true);
    };

    const handleMouseOutService = () => {
        setShowService(false);
    };

    const handleMouseOverBranch = () => {
        setShowBranch(true);
    };

    const handleMouseOutBranch = () => {
        setShowBranch(false);
    };

    const handleMouseOverPatient = () => {
        setShowPatient(true);
    };

    const handleMouseOutPatient = () => {
        setShowPatient(false);
    };

    

    return (
        <div>
            <nav className="nav flex text-sm font-bold ml-6 items-center relative mt-2">
                <Link to={"/"}>
                    <img src={logo} alt="Logo" className="logo" />
                </Link>

                <ul className="flex text-md font-bold">
                    <li
                        className="ml-6 cursor-pointer relative"
                        onMouseOver={handleMouseOverAbout}
                        onMouseOut={handleMouseOutAbout}
                    >
                        ABOUT
                        {showAbout && (
                            <div className="absolute top-full left-0">
                                <About />
                            </div>
                        )}
                    </li>

                    <li
                        className="ml-6 cursor-pointer relative"
                        onMouseOver={handleMouseOverService}
                        onMouseOut={handleMouseOutService}
                    >
                        SERVICE
                        {showService && (
                            <div className="absolute top-full left-0">
                                <Service />
                            </div>
                        )}
                    </li>

                    <Link to={"/branches"}>
                    <li
                        className="ml-6 cursor-pointer relative"
                        onMouseOver={handleMouseOverBranch}
                        onMouseOut={handleMouseOutBranch}
                    >
                        BRANCH
                        {showBranch && (
                            <div className="absolute top-full left-0">
                                <Branch />
                            </div>
                        )}
                    </li>
                    </Link>

                    <li
                        className="ml-6 cursor-pointer relative"
                        onMouseOver={handleMouseOverPatient}
                        onMouseOut={handleMouseOutPatient}
                    >
                        FOR PATIENTS
                        {showPatient && (
                            <div className="absolute top-full left-0">
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
                    <Link to="/appointment">
                        <h1 className="appointment ml-8 text-md font-semibold">
                            <img src={pic2} alt="" className="h-6 w-6 mr-6" />
                            APPOINTMENT
                        </h1>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
