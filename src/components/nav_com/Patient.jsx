import React from "react";

function Patient(){
    return(
        <div className="patient-container w-full mt-2 shadow-lg p-4 bg-white rounded-lg">
            <div className="flex flex-col">
                <ul className="list-disc list-inside space-y-2 bg-white">
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white">Doctor's details</li>
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white">Query</li>
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white">Feedback</li>
                    
                </ul>
            </div>
        </div>
    )
}export default Patient;