import Navbar from "../Navbar";
import Banner from "../Banner";
import flag from "../Medicine/med1.avif";
import { useState } from "react";
import End from "../home/End";
function Medorder(){
    const [showForm, setShowForm] =useState(false);
    const [step,setStep] =useState(1);


    const handleButtonClick = () => {
        setShowForm(!showForm);
    }

    const handleNextClick = () => {
        setStep(2);
    }

    const handleBackClick = () =>{
        setStep(1);
    }

    return(
        <div>
        <Navbar/>
        <div className="">
            <div className="flag flex flex-cols-2">

            <div>
            <div className="flag2">
            
            <div className="bg-transparent">
            <h1 className="bg-transparent text-red-800  font-bold text-8xl">Order</h1>
            <h2 className="bg-transparent text-red-800  font-bold text-5xl">Get 40% Off for First Order</h2>
            </div>

            <div className="flag3 ">
                <div className="bg-transparent">
                <h1 className="bg-transparent text-white text-3xl font-bold">Upload Your Prescription</h1>
                <h2 className="bg-transparent text-red-900 text-3xl font-bold ">Get Medicine Within 30 Minutes</h2>

                <button 
                onClick={handleButtonClick}
                className="bg-black text-white font-bold">
                {showForm ? "Upload Later" : "Upload Now"}
                </button>
                </div>
            </div>

            </div>

            </div>

            {showForm && (

            <div className="bg-transparent">
            {step ===1 ? (
                <div className="medform border border-white">
                    <h1 className="bg-transparent text-white text-3xl font-bold">Make An Order</h1>
                    <form className="bg-transparent">
                        <h2 className="text-xl">
                        <strong>Name :</strong>
                        <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="font-semibold text-md border border-4-gray-300 rounded p-2"/>
                        </h2>

                        <h2 className="text-xl">
                        Mobile Number :
                        <input
                        type="text"
                        placeholder="Enter Your Number"
                        className="font-semibold text-md border border-4-gray-300 rounded p-2"/>
                        </h2>

                        <h2 className="text-xl">
                        Age :
                        <input
                        type="number"
                        placeholder="Enter Your Age"
                        className="font-semibold text-md border border-4-gray-300 rounded p-2"/>
                        </h2>

                        <h2 className="text-xl">
                        Location :
                        <input
                        type="text"
                        placeholder="Enter Your Location"
                        className="font-semibold text-md border border-4-gray-300 rounded p-2"/>
                        </h2>

                        <h2 className="text-xl">
                        Attach Your Prescription : 
                        <input
                        type="text"
                        placeholder="Drag Your File Here"
                        className="font-semibold text-md border border-4-gray-300 rounded p-2"/>
                        </h2>
                    </form>

                <div className="flex bg-transparent">
                    <button className="bg-white text-black font-bold button1">Cancel</button>
                    <button onClick={handleNextClick} className="bg-cyan-400 text-white font-bold button2">Next</button>
                </div>

            </div>
            ) : (
                <div className="medform border border-white">
                                    <h1 className="bg-transparent text-white text-3xl font-bold">Additional Details</h1>
                                    <form className="bg-transparent">
                                        {/* Form fields for the second step */}
                                        <h2 className="text-xl">
                                            Address :
                                            <input
                                                type="text"
                                                placeholder="Enter Your Address"
                                                className="font-semibold text-md border border-4-gray-300 rounded p-2"
                                            />
                                        </h2>
                                        {/* Additional fields for the second step */}
                                    </form>

                                    <div className="flex bg-transparent">
                                        <button onClick={handleBackClick} className="bg-white text-black font-bold button1">Back</button>
                                        <button className="bg-cyan-400 text-white font-bold button2">Submit</button>
                                    </div>
                                </div>
            )}
            
        </div>)}


            </div>
            
        </div>
        <div className="mt-10">
        <End/>
        </div>
        </div>
    )
}
export default Medorder;