import React from "react";

function Service() {
    return(
        <div className="service-container w-full mt-2 shadow-lg p-4 bg-white rounded-lg">
            <div className="flex flex-col">
                <ul className="list-disc list-inside space-y-2 bg-white">
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white">Ambulance</li>
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white">Dialysis Service</li>
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white">Blood Bank</li>
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white">Medicine</li>
                </ul>
            </div>
        </div>
    )
}export default Service;