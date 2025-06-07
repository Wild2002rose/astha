import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className="about-container w-full mt-2 shadow-lg p-4 bg-white rounded-lg">
            <div className="flex flex-col">
                <ul className="list-disc list-inside bg-white">
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white mb-2">History</li>
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white mb-2">Aims, Goals</li>
                    <Link to="/chairman">
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white mb-2">Chairman's Desk</li>
                    </Link>
                    <Link to="/director">
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white mb-2">Director's Details</li>
                    </Link>
                    
                </ul>
            </div>
        </div>
    );
}

export default About;
