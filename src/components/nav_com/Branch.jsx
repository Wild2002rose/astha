import React from "react";
//import Singlebranch from "../Singlebranch";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { getAllBranches } from "../../Api Services/Branch/Branches";

function Branch() {

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


    return(
        <div className="branch-container w-full mt-2 shadow-lg p-4 bg-white rounded-lg">
            <div className="flex flex-col">
                <ul className="list-disc list-inside space-y-2 bg-white">
                
                {
                    branches.map((branch) => (
                        <div key={branch.branchId}>
                        <Link to={`/singlebranch/${branch.branchId}`}>
                            <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white">{branch.BranchName + ", " + branch.BranchLocation}</li>
                        </Link>
                        </div>
                    ))
                }


                </ul>
                
            </div>
        </div>
    )
}export default Branch;