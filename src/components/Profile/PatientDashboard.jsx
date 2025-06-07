import React, { useState, useEffect } from 'react';
import { FaHospitalUser, FaSignOutAlt, FaCalendarPlus, FaStethoscope, FaCalendarAlt, FaCalendarCheck, FaFileMedicalAlt, FaUserMd, FaKey, FaTimes } from 'react-icons/fa';
import Navbar from '../Navbar';
import End from '../home/End';
import { useNavigate } from 'react-router-dom';
import { getAllBranches } from "../../Api Services/Branch/Branches";
import axios
 from 'axios';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error,setError] = useState('');
  const [opdList,setOpdList] = useState([]);
  const [selectOpd, setSelectOpd] = useState(0);
  const [branches,setBranches] = useState([]);
  const [selectBranch, setSelectBranch] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [selectSchedule, setSelectSchedule] = useState('');
  const [slots, setSlots] =useState([]);
  const [selectSlot, setSelectSlot] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(
    {
      firstName : '',
      lastName : '',
      userId : ''
    }
  );

  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userId = localStorage.getItem('userId');

    setUser({ firstName, lastName, userId });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    navigate('/');
  };

  useEffect(() => {
    const fetchOpds = async () => {
        try {
            const response = await axios.get('https://localhost:7230/api/Auth/GetOPDs');
            setOpdList(response.data);
        }catch(error){
            setError('Failed to fetch OPD List');
        }
    }
    fetchOpds();
},[]);

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

    useEffect(() => {

      console.log("Branch Selected:", selectBranch);
      console.log("OPD Selected:", selectOpd);

      const fetchDoctors = async () => {
        if(!selectBranch || !selectOpd){
          return;
        }

        console.log("Fetching doctors with:", {
          // branchId: parseInt(selectBranch),
          // opdId: parseInt(selectOpd)
          branchId: selectBranch,
          opdId: selectOpd
        });

        try {
          const response = await axios.get(`https://localhost:7230/api/Auth/GetDoctorsByBranchAndOPD`,{
            params: {
              branchId: selectBranch,
              opdId: selectOpd
            }
          });
          console.log("Doctors fetched:", response.data);
          setDoctors(response.data);
        }catch(error){
          console.log("failed to fetch doctors! ", error);
        }
      };
      fetchDoctors();
    },[selectBranch,selectOpd])
  
  useEffect(() =>{
    const fetchSchedules = async () => {
      if(!selectBranch || !selectOpd || !selectedDoctor){
        return;
      }
      try {
        const response = await axios.get(`https://localhost:7230/api/Auth/get-upcoming-slots`, {
          params: {
            branchId: selectBranch,
            doctorId: selectedDoctor
          },
        });
        console.log("Schedule fetched :", response.data);
        setSchedules(response.data);
      }
      catch(error){
        console.log("Failed to fetch:", error);
      }
    };
    fetchSchedules();
  },[selectBranch, selectedDoctor]);

  const handleScheduleChange = (e) =>{
    const selected = JSON.parse(e.target.value);
    setSelectSchedule(e.target.value);
    setSlots(selected.Slots);
    setSelectSlot('');
  };

  const [bookAppointment, setBookAppointment] = useState({
    patientId: '',
    doctorId: '',
    branchId: '',
    opdId: '',
    scheduleId: null,
    appointmentDate: '',
    appointmentTime: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setBookAppointment(prev => ({
      ...prev,
      [name] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user.userId || !selectedDoctor || !selectBranch ||!selectOpd || !selectSchedule || !selectSlot)
    {
      alert("Please fill all required fields.");
      return;
    }

    const scheduleObj = JSON.parse(selectSchedule);

    const payload = {
      patientId: user.userId,
      doctorId: selectedDoctor,
      branchId: parseInt(selectBranch),
      opdId: parseInt(selectOpd),
      scheduleId: scheduleObj.ScheduleId,
      appointmentDate: scheduleObj.Date,
      appointmentTime: selectSlot
    };

    try{
      const response = await axios.post(`https://localhost:7230/api/Auth/create-appointment`,payload);;
      alert(`Appointment Created! ID:${response.data.appointmentId}`);

      console.log({
        patientId: user.userId,
        doctorId: selectedDoctor,
        branchId: selectBranch,
        opdId: selectOpd,
        scheduleId: JSON.parse(selectSchedule).ScheduleId,
        appointmentTime: selectSlot
      });
    }catch(error) {
      console.error('Error booking appointment:', error);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`https://localhost:7230/api/Auth/get-appointments/${user.userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchAppointments();
  
  }, [user.userId]);

const handleCancelAppointment = async (appointmentId) => {
  if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
  try {
    const response = await axios.delete(`https://localhost:7230/api/Auth/delete-appointment/${appointmentId}`);
    alert("Appointment cancelled successfully");
    setAppointments(prev => prev.filter(appt => appt.AppointmentId !== appointmentId));

  }catch (error) {
    console.error('Error cancelling appointment:', error);
    alert("Failed to cancel appointment");
  }
};


useEffect(() => {
  const fetchReports = async () => {
    try {
      const response = await axios.get(`https://localhost:7230/api/Auth/get-report?patientId=${user.userId}`);
      console.log(response.data); 
      setReports(response.data.reports || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  };

  if (user.userId) {
    fetchReports();
  }
}, [user.userId]);


  return (
    <div className="">
      <Navbar/>
      <header className="flex sm:flex-row justify-between items-center mb-6 gap-3">
        <div className="text-left">
          <h1 className="text-2xl font-bold flex items-center gap-2 ml-10 mt-10 dashboard">
            <FaHospitalUser /> Patient Dashboard
          </h1>
          <h2 className="text-lg text-white font-semibold ml-10">{user.firstName} {user.lastName}</h2>
          <p className="text-white ml-10">{user.userId}</p>
        </div>
        <div className='mr-10'>
        <button onClick={handleLogout}
        className="logout bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2 ">
          <FaSignOutAlt className='bg-transparent' /> Logout
        </button>
        </div>
      </header>

      
      <section className="bg-black text-white rounded-lg shadow ml-10 mb-6 ">
        <h2 className="text-xl font-semibold mb-1 ">Welcome to our Astha family.</h2>
        <p className="text-white">Manage your appointments and view your medical reports all in one place.</p>
      </section>

      
      <main className="grid md:grid-cols-2 gap-6 mb-10">
        
        <div className="container rounded-lg shadow p-5 ">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2 bg-transparent line ml-10">
            <FaCalendarPlus className='bg-transparent'/> Schedule an Appointment
          </h3>

          <div className="mb-2 bg-transparent ml-10 mr-10 ">
          <label className="block bg-transparent text-black font-bold">Select nearby branch</label>
            <div className="relative bg-transparent ">
              <FaStethoscope className="absolute left-3 top-3 text-gray-400 bg-transparent" />
              <select
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-500 rounded focus:outline-none bg-transparent"
                value={selectBranch}
                onChange={(e) => setSelectBranch(Number(e.target.value))}
              >
                {!selectBranch && ( 
                <option value={0} className='bg-transparent' disabled >-- Select Your Nearby Branch--</option> )}
                {branches.map(branch => (
                  <option key={branch.BranchId} value={branch.BranchId} className='bg-transparent '>{branch.BranchName}, {branch.BranchLocation}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-2 bg-transparent ml-10 mr-10">
          <label className="block bg-transparent text-black font-bold">Select OPD</label>
            <div className="relative bg-transparent">
              <FaStethoscope className="absolute left-3 top-3 text-gray-400 bg-transparent" />
              <select
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-500 rounded focus:outline-none bg-transparent"
                value={selectOpd}
                onChange={(e) =>{ console.log('Selected Branch Value:', e.target.value); 
                  setSelectOpd(Number(e.target.value));
                }}
              >
                {!selectOpd && ( 
                <option value={0} className='bg-transparent' disabled>-- Select OPD --</option> )}
                {opdList.map(opd => (
                  <option key={opd.id} value={Number(opd.id)} className='bg-transparent'>{opd.name}</option>
                ))}
              </select>
            </div>
          </div>

          

          <div className="mb-2 bg-transparent ml-10 mr-10">
            <label className="block font-bold text-black bg-transparent    ">Select a Doctor</label>
            <div className="relative bg-transparent">
              <FaStethoscope className="absolute left-3 top-3 text-gray-400 bg-transparent" />
              <select
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-500 rounded focus:outline-none bg-transparent"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                {!selectedDoctor && ( 
                <option value="" className='bg-transparent' disabled>-- Select a doctor --</option> )}
                {doctors.map(doc => (
                  <option key={doc.DoctorId} value={doc.DoctorId} className='bg-transparent'>Dr. {doc.FirstName} {doc.LastName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-2 bg-transparent ml-10 mr-10">
            <label className="block bg-transparent text-black font-bold">Select appointment date </label>
            <div className="relative bg-transparent">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400 bg-transparent" />
              <select
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-500 rounded focus:outline-none bg-transparent"
                value={selectSchedule}
                // onChange={(e) => setSelectSchedule(e.target.value)}
                onChange={handleScheduleChange}
                >
              {!selectSchedule && (
                <option value="" className='bg-transparent' disabled>--Select a date--</option> )}
                {schedules.map((date, idx) => (
                  <option className='bg-transparent' key={idx} value={JSON.stringify(date)}>
                    {date.Date} - {date.Day} 
                  </option>
                ))}
              </select>
            </div>
          </div>


          {selectSchedule && slots.length > 0 && (
            <div className="mb-4 bg-transparent ml-10 mr-10">
              <label className="block text-black font-bold bg-transparent">Select slot time</label>
              {!selectSlot ? ( 
              <div className="flex flex-wrap gap-2 bg-transparent max-h-10 overflow-y-auto pr-2">
                {slots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectSlot(slot)}
                    className={`px-4 py-2 bg-transparent rounded border text-sm ${
                      selectSlot === slot
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-black border-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>) : (
                <div className="w-full pl-10 pr-4 py-2 border-2 border-gray-500 rounded bg-transparent relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400 bg-transparent" />
                  Selected Time : {selectSlot}
                </div>
              )}
            </div>
          )}


          <button
          onClick={handleSubmit}
          disabled={!selectedDoctor && selectSchedule && selectSlot}
            className={`w-80 ml-36 mt-1 bg-blue-800 text-white py-2 rounded ${!(selectedDoctor && selectSchedule) ? ' cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            <FaCalendarCheck className="inline mr-2" /> Schedule Appointment
          </button>
        </div>

        
        <div className="container rounded-lg shadow p-5">
          <h3 className="text-lg font-bold mb-4 text-blue-600 flex items-center gap-2 bg-transparent ml-10 line">
            <FaCalendarAlt className='bg-transparent'/> Scheduled  Appointment
          </h3>
          {appointments.length === 0 ? (
            <p className="text-gray-500 italic bg-transparent ml-10 mr-10 border-1 border-gray-400">No appointments scheduled yet.</p>
          ) : (
            <div className="space-y-4 bg-transparent">
              {appointments.map((appt,index) => (
                <div key={index} className=" bg-gray-300 p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm border-1 border-gray-500 ml-10 mr-10 ">
                  <div className='bg-transparent'>
                    <p className="font-medium text-black bg-transparent">Dr. {appt.DoctorName} <span className='bg-transparent text-gray-500 text-sm font-semibold'>--{appt.Branch}--{appt.Location} </span></p> 
                    <p className="text-black bg-transparent">
                      {new Date(appt.AppointmentDate).toLocaleDateString('en-GB', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' })} - {appt.AppointmentTime}
                    </p>
                  </div>

                  {appt.IsDiagnosed ?(
                  <span 
                  className="mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-bold w-24 text-center  text-white bg-green-600" disabled >
                    Diagnosed
                  </span>
                  ) : (
                  <span 
                  onClick={() => handleCancelAppointment(appt.AppointmentId)}
                  className="mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-bold w-20 text-center cursor-pointer text-white hover:bg-red-600" >
                    Cancel
                  </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="container1 rounded-lg shadow p-5 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-600 bg-transparent ml-10">
            <FaFileMedicalAlt className='bg-transparent'/> Your Medical Reports
          </h3>
          {reports.length === 0 ? (
            <p className='bg-transparent ml-10'>No reports available yet.</p>
          ) : (
            <div className="grid gap-4">
              {reports.map((report) => (
                <div key={report.reportId} className="bg-gray-100 p-4 rounded shadow">
                  <p className="font-bold text-lg">Report Type: {report.reportType}</p>
                  <p><strong>Doctor:</strong> {report.doctorName}</p>
                  <p><strong>Date:</strong> {new Date(report.date).toLocaleString()}</p>
                  {report.filename && (
                    <p><strong>File Name:</strong> {report.filename}</p>
                  )}
                  <a
                    href={report.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2 inline-block"
                  >
                    View Report
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>

        {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black">
              <FaTimes />
            </button>
            <h3 className="text-lg font-semibold mb-4">Grant Access to Report</h3>
            <p className="mb-4 text-sm text-gray-600">Report: <strong>Sample Report</strong></p>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Select Doctor</label>
              <div className="relative">
                <FaUserMd className="absolute left-3 top-3 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none">
                  <option value="">-- Select a doctor --</option>
                  
                </select>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              <FaKey className="inline mr-2" /> Grant Access
            </button>
          </div>
        </div>
        )}
      </main>

      
      <End/>
    </div>
  );
};

export default PatientDashboard;
