import React, { useState, useEffect } from "react";
import { getAllBranches } from "../Api Services/Branch/Branches";
import Navbar from "./Navbar";
import Banner from "./Banner";
import { Link } from "react-router-dom";


function Branches() {
    const [branches, setBranches] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const data = await getAllBranches();
                setBranches(data);
            } catch (err) {
                setError("Failed to fetch");
                console.error(err);
            }
        };
        fetchBranches();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <Banner />
            
            <div className="container mx-auto py-10 px-20 ">
                {error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 bg-transparent branches ">
                        {branches.length > 0 ? (
                            branches.map((branch) => (
                                <div key={branch.branchId} className="branch rounded-lg shadow-lg ">
                                    <Link to={`/singlebranch/${branch.branchId}`}>
                                    <h2 className="text-2xl font-bold mb-2 text-center">
                                    {branch.branchName}
                                    </h2>
                                    </Link>
                                    
                                    <p className="text-lg bg-transparent mt-4 ml-4 text-white font-semibold"><strong className="font-semibold">Location:</strong> {branch.branchLocation}</p>
                                    <p className="text-lg bg-transparent mt-2 ml-4 font-semibold text-white"><strong className="font-semibold">Contact Number:</strong> {branch.contactNumber}</p>
                                    <p className="text-lg bg-transparent mt-2 ml-4 font-semibold text-white"><strong className="font-semibold">Email:</strong> {branch.email}</p>
                                    <p className="text-lg bg-transparent mt-2 ml-4 font-semibold text-white"><strong className="font-semibold">OPD Services:</strong> {branch.branchOPD}</p>
                                    <p className="text-lg bg-transparent mt-2 ml-4 font-semibold text-white"><strong className="font-semibold">Doctors:</strong> {branch.branchDoctors}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-2 bg-transparent">Loading...</p>
                        )}
                    </div>
                )}
            
            </div>
        </div>
    );
}

export default Branches;
