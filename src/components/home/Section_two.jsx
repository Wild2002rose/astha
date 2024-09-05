import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import loc1 from "../home/loc1.png";
import call1 from "../home/call1.png"
import mail1 from "../home/mail1.png"
import med3 from "../home/med3.png"
import Map from "./Map";
import { Link } from "react-router-dom";

function Section_two(){
    return(
        <div className="flex">
            <div className="section_two h-96 w-96 ml-20 mt-10 text-lime-400">
                <Map/>
            </div>

            <div className="section_one h-96 w-96 ml-20 mt-10 ">
                <h1 className="bg-transparent text-lime-400 font-bold text-xl text-center mt-5">Know About Your Nearby Branches</h1>
                <input type="text" placeholder="Enter Your Location " className="h-10 w-80 ml-6 mt-8 bg-gray-200 rounded-md border-2 border-gray-400 text-gray-800 text-center font-semibold required" />

                <div className="bg-transparent flex mt-2">
                <h1 className="bg-transparent flex relative cursor-pointer ml-20  font-bold "><img src={loc1} alt="" className="bg-transparent h-12 w-10 mr-2 mt-0"/>Your live location</h1>
                </div>

                <div className="border-2 border-gray-200 mt-5 h-40 ml-5 mr-5 rounded-md bg-transparent">
                <div className="bg-transparent">

                <h1 className="bg-transparent flex relative cursor-pointer ml-5  font-semibold mt-1 "><img src={loc1} alt="" className="bg-transparent h-12 w-10 mr-2 mt-0"/></h1>

                <h1 className="bg-transparent flex relative cursor-pointer ml-6  font-semibold mt-2 "><img src={call1} alt="" className="bg-transparent h-10 w-8 mr-2 mt-0"/></h1>

                <h1 className="bg-transparent flex relative cursor-pointer ml-6  font-semibold mt-2 "><img src={mail1} alt="" className="bg-transparent h-10 w-8 mr-2 mt-0"/></h1>

                </div>

                </div>
            </div>


            <div className="med h-96 w-96 ml-20 mt-10 rounded-lg  ">
                <img src={med3} alt="" className="bg-transparent h-40 " />
                <h1 className="bg-transparent text-white text-3xl font-bold ml-10">Don't Worry!</h1>
                <h2 className="bg-transparent text-white text-2xl font-bold ml-10">Pharmacy at your doorstep!!</h2>
                <h4 className="bg-transparent text-white text-lg font-semibold ml-10 mt-2">All medicines are available.</h4>

                <Link to="/medorder">
                    <div className="bg-transparent">
                    <button className="bg-white h-10 w-60 rounded-full ml-20 text-lg font-bold mt-10 hover:text-lime-400">Order Now</button>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Section_two;