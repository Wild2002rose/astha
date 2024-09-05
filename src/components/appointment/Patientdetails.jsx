import Navbar from "../Navbar";

const Patientdetails = ()=>{

    return(
        <>
        <div className="flex flex-col items-center mb-20">
        <div className="page1  flex flex-col mt-20 ">
            <h1 className="font-semibold text-lg mt-10 text-center bg-transparent  text-white heading1 ">Fill the blanks</h1>

        <div className="bg-transparent ">
            <h1 className="mt-10 bg-transparent  text-lg text-white ml-7">Patient's Name: <input type="text" placeholder="First Name" className="ml-5 h-10 w-60 bg-transparent border border-gray-2 rounded-md items-center text-white text-center text-md "/> <input type="text" placeholder="Last Name" className="ml-5 h-10 w-60 bg-transparent border border-gray-2 rounded-md items-center text-white text-center text-md  "/></h1>

        </div>

        <div className=" bg-transparent">
            <h1 className="mt-10 bg-transparent  text-lg text-white ml-7">Age: <input type="text" placeholder="Enter age" className="ml-5 h-10 w-60 bg-transparent border border-gray-2 rounded-md items-center text-white text-center text-md  "/>
            </h1> 
        </div>

    <div class="bg-transparent">
    <h1 class="mt-10 bg-transparent text-lg text-white ml-7">
    Gender:
    <select class="ml-5 h-10 w-60 bg-transparent border border-gray-2 rounded-md items-center text-white text-center text-md">
      <option value="" disabled selected>Your gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Others">Others</option>
    </select>
    </h1>
    </div>


    <div class="bg-transparent">
    <h1 class="mt-10 bg-transparent text-lg text-white ml-7">
    Select your department:
    <select class="ml-5 h-10 w-60 bg-transparent border border-gray-2 rounded-md items-center text-white text-center text-md">
      <option value="" disabled selected>Select your department</option>
      <option value="Male">Cardiology</option>
      <option value="Female">Darmatology</option>
      <option value="ENT">ENT</option>
      <option value="Gastroenterology">Gastroenterology</option>
      <option value="Gynecology">Gynecology</option>
      <option value="Neurology">Neurology</option>
      <option value="Opthalmology">Opthalmology</option>      
      <option value="Orthopedics">Orthopedics</option>      
      <option value="Pediatrics">Pediatrics</option>      
      <option value="Psychiatry">Psychiatry</option>      

    </select>
    </h1>
    </div>

    <div className=" bg-transparent">
            <h1 className="mt-10 bg-transparent  text-lg text-white ml-7">Select your nearby branch: <select class="ml-5 h-10 w-60 bg-transparent border border-gray-2 rounded-md items-center text-white text-center text-md">
                <option value="Live location">Enter Your Live Location</option>
            </select>
            </h1> 
    </div>

    <button className=" bg-transparent text-lime-400 font-semibold text-lg rounded-lg mt-10 border-4 border-white w-40 next">Next</button>
    

        </div>
        </div>
        </>
    )
}
export default Patientdetails;