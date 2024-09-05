import pic2 from "../home/bg1.avif";
import { useState,useEffect } from "react";
import { getAllBranches } from "../../Api Services/Branch/Branches";
import { Link } from "react-router-dom";

function Section_one (){

    const [branches,setBranches] = useState([]);
    const [error,setError] =useState("");

    useEffect(() => {
        const fetchBranches = async () =>{
            try{
                const data = await getAllBranches();
                setBranches(data);
            } catch(err){
                setError("Failed to fetch");
            }
        };
        fetchBranches();
    }, []);


    return(
        <div className="flex">
            <div className="h-100 w-80 section_one ml-14 mt-5 cursor-pointer ">
            <p className="text-black text-sm font-bold bg-transparent p-5"><span className="text-lime-400 bg-transparent text-lg font-bold ">Astha</span> also popularly known as RN Tagore Hospital, Kolkata, is a 681-bedded, NABH-accredited multi-superspeciality quaternary care hospital, established in the year 2000. RTIICS has 15 fully-equipped operation theatres and 4 state-of-the-art catheterisation laboratories with 24-hour facility. <br />

            It provides services to the people of West Bengal and the neighbouring states in Eastern India and North Eastern India. RTIICS is a global healthcare hub catering to patients from countries such as Bangladesh, Bhutan, Myanmar, Nepal as well as African countries.
            </p>
        </div>

        <div className="h-100 w-80 section_one ml-10 mt-5 cursor-pointer ">
        <Link to={"/branches"}>
            <h1 className="font-bold text-lg mt-5 text-lime-400  bg-transparent text-center ">Our Branches</h1>
        </Link>
            
            <div className="bg-transparent p-5 text-md text-black" >
                {branches.map((branch)=>(
                    <div key={branch.branchId} className="bg-transparent">
                    <Link to={`/singlebranch/${branch.branchId}`}>
                        <h4 className="bg-transparent  text-center cursor-pointer text-md font-bold hover:text-lime-400 p-1">{branch.branchName+ ", "+ branch.branchLocation}</h4>
                    </Link>
                    </div>
                ))}
                
            </div>
        </div>

        <div className="h-100 w-80 section_one ml-10 mt-5 cursor-pointer ">
            <h1 className="font-bold text-lg mt-5 text-lime-400  bg-transparent text-center ">Services that offers</h1>
            <div className="bg-transparent p-5">
                <h4 className="bg-transparent  text-center cursor-pointer text-md font-bold hover:text-lime-400 ">24/7 Emergency and Trauma Care</h4>
                <h4 className="bg-transparent  text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">Ambulance</h4>
                <h4 className="bg-transparent text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">Blood Bank</h4>
                <h4 className="bg-transparent text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">Dialysis Services</h4>
                <h4 className="bg-transparent text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">Chemotherapy</h4>
                <h4 className="bg-transparent  text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">Transplant of Regional Organs</h4>
                <h4 className="bg-transparent  text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">OPD Schedule</h4>
                <h4 className="bg-transparent text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">Labratory</h4>
                <h4 className="bg-transparent  text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">Micro Surgery</h4>
                <h4 className="bg-transparent text-center cursor-pointer text-md font-bold hover:text-lime-400 mt-1">Medicine Delivery</h4>
            </div>
        </div>

        <div className="h-100 w-80 section_one ml-10 mt-5  ">
            <div className=" bg-transparent ">
                <img src={pic2} alt="" className=" p-4 h-70 w-80 rounded-md bg-transparent mt-6"/>
                <button className="view rounded-lg text-white test-lg font-bold items-center mt-4 ml-20 h-10 w-40 hover:text-lime-400 cursor-pointer">View Gallery</button>
            </div>
            
        </div>
        </div>
    )
}
export default Section_one;