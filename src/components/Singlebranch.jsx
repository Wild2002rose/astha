import { useEffect, useState } from "react";
import { getBranchById} from "../Api Services/Branch/Branches";
import Navbar from "./Navbar";
import Banner from "./Banner";
import { useParams } from "react-router-dom";
import arr from "../images/arrow.png"
import image from "../images/pic2.png"

function Singlebranch() {
    const [branch, setBranch] = useState(null);
    const [error, setError] = useState("");
    const { id } = useParams();
    

    useEffect(() => {
        const fetchBranchByID = async (id) => {
            try {
                const data = await getBranchById(id); 
                console.log(data);
                setBranch(data);
            } catch (err) {
                setError("Failed to fetch branch details.");
                console.error(err);
            }
        };
        fetchBranchByID(id);
        
    }, [id]);


    return (
        <div className="min-h-screen">
            <Navbar />
            
            
            <div>
            {error ? (
                    <p>{error}</p>
                ) : branch ? (

                    <div className="test" key={branch.BranchID}>

                    <div className="bg-transparent singlebranch ml-1 mt-4">

                        <h1 className=" bg-transparent font-bold">{branch.BranchName}</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 bg-transparent ">

                        <div className="bg-transparent">
                        <p className=" bg-transparent mb-4"><strong className="font-semibold bg-transparent text-2xl">Location:</strong> {branch.branchLocation}</p>
                        <p className=" bg-transparent mb-4"><strong className="font-semibold bg-transparent text-2xl ">Contact:</strong> {branch.ContactNumber}</p>
                        <p className=" bg-transparent mb-4"><strong className="font-semibold bg-transparent text-2xl">Email:</strong> {branch.Email}</p>

                        <p className=" bg-transparent mb-4 grid grid-cols-12 OPD"><strong className="font-semibold bg-transparent text-2xl w-50"> Departments:</strong>
                        
                        <ul className="border border-2-white mr-50 font-semibold text-sm list-disc list-inside" >
                        {branch.branchOPD.split(",").map((name,index)=> (
                            <li key={index} className="bg-transparent pl-4">
                                {name}
                            </li>
                        ))}
                        </ul>
                        </p>
                         

                        

                        </div>


                        <div className="doctor border border-2-gray-200 ">
                            <h2 className="font-bold  mt-4 ">Our Doctors</h2>
                            <div className="bg-transparent profilelist grid grid-cols-5 ">
                            {branch.branchDoctors.split(",").map((name,index) => (
                                
                                <div className="bg-transparent ml-6 mt-2">
                                <img src={image} alt="" className="h-14 w-14 rounded-lg"/>
                                <h4 className="bg-transparent text-sm font-semibold text-white ">{name}</h4>
                                </div>
                                
                            ))}
                            </div>

                            <button className="font-bold bg-lime-500 rounded-lg">Select Your Doctor
                            </button>
                        </div>

                        </div>
                        
                        

                    </div>

                    
                       
                    </div>
                    
                    
                ) : (
                    <p>Loading branch details...</p>
                )}

                
            </div>
        </div>
                
    );
}

export default Singlebranch;
