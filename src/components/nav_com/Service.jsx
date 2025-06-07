import React, { useState, useEffect } from "react";
import axios from "axios";

function Service() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://localhost:7230/api/Auth/GetServices')
          .then(response => {
            setServices(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError('Error fetching services');
            console.error(error);
            setLoading(false);
          });
      }, []);

    return(
        <div className="service-container  shadow-lg p-4 bg-white rounded-lg">
            <div className="flex flex-col">
                <ul className="list-disc list-inside space-y-2 bg-white">
                    {services.map(services =>(
                    <li className="text-gray-500 font-semibold text-md hover:text-lime-400 bg-white whitespace-nowrap overflow-hidden text-ellipsis">{services.ServiceName}</li>
                ))}
                </ul>
            </div>
        </div>
    )
}export default Service;