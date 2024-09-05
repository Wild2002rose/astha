import Navbar from "./Navbar";
import { auth } from "../firebase/setup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Appointment = () => {
    const [phone, setPhone] = useState("");
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState("");

    const sendOtp =async()=>{
        try{
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha",{})
            const confirmation = await signInWithPhoneNumber(auth,phone,recaptcha)
            setUser (confirmation)

        }catch(err){
            console.error(err)
        }
    }

    const verifyOtp = async()=>{
        try{
            await user.confirm(otp)

        }catch(err){
            console.error(err)
        }
        
    }

    console.log(auth);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center">
                <div className="page h-96 w-96 flex flex-col mt-20 items-center">
                    <h1 className="heading font-semibold text-lg mt-5 text-center">Take an appointment</h1>
                    {user == null &&
                    <div className="phone mt-10 text-white  ">
                        <PhoneInput
                            placeholder="Enter your mobile number"
                            value={phone}
                            onChange={phone => setPhone("+" + phone)}
                            buttonStyle={{backgroundColor:"white"}}
                            inputStyle={{width:"320px"}}
                            country={'us'}

                        />
                    </div>}

                    

                    {!otp &&<button onClick={sendOtp} className="bg-gray-600 w-80 text-white mt-10 text-center font-bold py-2 px-4 border-2 rounded-lg">
                        Get OTP
                    </button>}

                    {user &&<input onChange={(e)=>setOtp(e.target.value)} className=' bg-gray-100 border border-spacing-1   text-gray-900 font-normal outline-none  text-sm rounded-sm block w-80 p-2.5 mt-2 ml-8' placeholder='Enter OTP' required />}



                    {otp &&<button onClick={verifyOtp} className="bg-rose-400 w-80 text-white mt-4 text-center font-bold py-2 px-4 ml-8">
                    Verify OTP          
                    </button>}

                    <h1 className='text-sm bg-transparent text-gray-400 mt-20 text-center'> Have problem to register? <span className='text-lime-400 mt- bg-transparent  font-semibold text-md cursor-pointer  '>Click continue</span></h1>     
        
                </div>
            </div>
        </>
    );
}

export default Appointment;
