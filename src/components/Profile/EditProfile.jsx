import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const userId = localStorage.getItem("userId"); 
    const [member, setMember] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        emailAddress: ""
    });
    const navigate = useNavigate();
    const [alternateMobileNumber, setAlternateMobileNumber] =useState('');
    const [address, setAddress] = useState('');
    const [birthday,setBirsthday] =useState('');    

   useEffect(() =>{
    if (!userId) {
        console.error("No userId found in localStorage");
        return;
    }
    fetch(`https://localhost:7230/api/Auth/GetDetails/${userId}`)
    .then((res) => res.json())
    .then((data) => {
        console.log("Fetched member:", data);
        setMember(data); 
        // if(Array.isArray(data) && data.length > 0) {
        //     setMember(data[0]);
        // }
    }).catch((err) => {
        console.error("Fetch error", err);
    });

   },[userId]);

   const handleSave = () => {
    const updatedData ={
        firstName: member.firstName,
        lastName: member.lastName,
        emailAddress: member.emailAddress,
        mobileNumber: member.mobileNumber,
        alternateMobileNumber,
        alternateMobileNumber,
        address,
        birthday: birthday ? new Date(birthday).toISOString().split("T")[0] : null
        };
        fetch(`https://localhost:7230/api/Auth/UpdateProfile/${userId}`,{
            method: "PUT",
            headers : {
                "Content-Type" :"application/json",
            },
            body : JSON.stringify(updatedData)
        })
        .then((res) => {
            if(res.ok){
                navigate("/");
            }else {
                alert("Failed to update");
            }
        })
        .catch((err) =>{
            console.log("Update error:", err);
        });
    }
   
    return(
        
        <>
        <Navbar/>
        <div className="edit-container bg-gray-200">
            <header className="bg-transparent font-bold text-3xl mt-4 text-center text-gray-600">Your Profile</header>

            <div className="bg-transparent flex justify-center gap-6 mt-6">
                <div className="flex flex-col items-center bg-transparent">
                    <input type="text" placeholder="First Name" value={member.firstName} onChange={(e) => setMember({ ...member, firstName: e.target.value })}
                    className="bg-transparent border-2 border-gray-300 w-60 h-10 rounded-md font-bold text-black text-center"/>
                    <p className="bg-transparent font-semibold text-sm text-blue-600">First Name</p>
                </div>
                <div className="flex flex-col items-center bg-transparent">
                    <input type="text" placeholder="Last Name" value={member.lastName} onChange={(e) => setMember({ ...member, lastName: e.target.value })}
                    className="bg-transparent border-2 border-gray-300 w-60 h-10 rounded-md font-bold text-black text-center"/>
                    <p className="bg-transparent font-semibold text-sm text-blue-600">Last Name</p>
                </div>
            </div>

            <div className="bg-transparent flex justify-center gap-6 mt-6">
                <div className="flex flex-col items-center bg-transparent">
                    <input type="text" placeholder="Mobile Number" value={member.emailAddress} onChange={(e) => setMember({ ...member, emailAddress: e.target.value })}
                    className="bg-transparent border-2 border-gray-300 w-60 h-10 rounded-md font-bold text-black text-center"/>
                    <p className="bg-transparent font-semibold text-sm text-blue-600">Mobile Number</p>
                </div>
                <div className="flex flex-col items-center bg-transparent">
                    <input type="text" placeholder="Email Address" value={member.mobileNumber} onChange={(e) => setMember({ ...member, mobileNumber: e.target.value })}
                    className="bg-transparent border-2 border-gray-300 w-60 h-10 rounded-md font-bold text-black text-center"/>
                    <p className="bg-transparent font-semibold text-sm text-blue-600">Email Address</p>
                </div>
            </div>

            <div className="bg-transparent flex justify-center gap-6 mt-6">
                <div className="flex flex-col items-center bg-transparent">
                    <input type="text" placeholder="Alternate Mobile Number" onChange={(e) => setAlternateMobileNumber(e.target.value)} 
                    className="bg-transparent border-2 border-gray-300 w-60 h-10 rounded-md font-bold text-black text-center"/>
                    <p className="bg-transparent font-semibold text-sm text-blue-600">Alternate Mobile Number</p>
                </div>
                <div className="flex flex-col items-center bg-transparent">
                    <input type="text" placeholder="Birthday" onChange={(e) => setBirsthday(e.target.value)}
                    className="bg-transparent border-2 border-gray-300 w-60 h-10 rounded-md font-bold text-black text-center"/>
                    <p className="bg-transparent font-semibold text-sm text-blue-600">Birthday</p>
                </div>
            </div>

            <div className="bg-transparent  mt-6">
                <div className="flex flex-col items-center bg-transparent ">
                    <input type="text" placeholder="Your Address" onChange={(e) => setAddress(e.target.value)}
                    className="bg-transparent border-2 border-gray-300 w-60 h-10 rounded-md font-bold text-black text-center edit-address"/>
                    <p className="bg-transparent font-semibold text-sm text-blue-600">Your Address</p>
                </div>
            </div>

            <div className="flex flex-col items-center bg-transparent ">
                <button className="bg-blue-700 text-white cursor-pointer  mt-10 h-10 w-40 rounded-lg border-2 border-blue-800"
                onClick={handleSave}
                >Save Details</button>
            </div>
            
        </div>
        </>
    )
}
export default EditProfile; 