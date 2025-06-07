import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaStethoscope, FaUsers, FaCheckCircle, FaCalendarAlt, FaUserInjured, FaFileMedicalAlt, FaFileUpload, FaCloudUploadAlt, FaUser, FaIdCard } from 'react-icons/fa';
import Navbar from '../Navbar';
import End from '../home/End';
import axios from 'axios';

const DoctorDashboard = () => {
  const [diagnosedPatients, setDiagnosedPatients] = useState(0);
  const [reappointedPatients, setReappointedPatients] = useState(0);
  const [showModel, setShowModel] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [user, setUser] = useState(
    {
      firstName : '',
      lastName : '',
      userId : ''
    }
  );
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userId = localStorage.getItem('userId');

    setUser({ firstName, lastName, userId});
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; 
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try{
        const response = await axios.get(`https://localhost:7230/api/Auth/get-all-patients/${user.userId}`);
        setPatients(response.data);
      }catch(error){
        setError('Failed to fetch Patient List');
      }
    }
    fetchPatients();
  },[user.userId]);

  const [patientDetail, setPatientDetail] = useState('');
  useEffect(() => {
    const fetchDetails = async () => {
      try{
        const response = await axios.get(`https://localhost:7230/api/Auth/get-appointments/${patientId}`);
        setPatientDetail(response.data);
      }catch(error) {
        setError('Failed to fetch Patient detail')
      }
    }
    fetchDetails();
  },[]);
  

  const[today, setToday] = useState('');
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setToday(currentDate);
  }, []);

  const [totalPatients, setTotalPatients] = useState(null);
  useEffect(() => {
    const fetchCount = async() => {
      try{
        const response = await fetch(`https://localhost:7230/api/Auth/todays-total-patient?doctorId=${user.userId}&date=${today}`);
        const data = await response.json();
        setTotalPatients(data.Count);
      }catch(error){
        console.error("Error fetching total patients:", error);
      }
    };
    fetchCount();
  }, [user.userId, today]);

  const [todaysPatients, setTodaysPatients] = useState([]);
  useEffect(() => {
    const fetchTodaysPatients = async () =>{
      try {
        const response = await axios.get(`https://localhost:7230/api/Auth/todays-patients?doctorId=${user.userId}&date=${today}`);
        setTodaysPatients(response.data);
      }catch(error){
        setError("Failed to fetch");
      }
    }
    fetchTodaysPatients();
  },[user.userId, today]);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowModel(true);
  };


  const [uploadReport, setUploadReport] = useState(null);
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadReport) {
      setError('Please select a report to upload');
      return;
    }

    const formData = new FormData();
    formData.append('report', uploadReport);

    try {
      const response = await axios.post(`https://localhost:7230/api/Auth/upload-report?patientId=${selectedPatient.PatientId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Report uploaded successfully');
    } catch (error) {
      setError('Error uploading report');
    }
  };

  const handleMarkDiagnosed = async () => {
    try {
      await markPatientAsDiagnosed(); 
      setDiagnosedPatients(diagnosedPatients + 1);
      setShowModel(false);
    } catch (error) {
      console.error('Error during diagnosis process:', error);
    }
  };
  

  const markPatientAsDiagnosed = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7230/api/Auth/mark-diagnosed?patientId=${selectedPatient.PatientId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error marking patient as diagnosed:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (totalPatients !== null && diagnosedPatients !== null) {
      const pendingPatientsCount = totalPatients - diagnosedPatients;
      setReappointedPatients(pendingPatientsCount);
    }
  }, [totalPatients, diagnosedPatients]);


  const [patientId, setPatientId] = useState('');

  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

   const handleSearch = async () => {
    if (!patientId) {
      setError('Please enter a patient ID');
      return;
    }

    try {
      const response = await axios.get(`https://localhost:7230/api/Auth/get-appointments/${patientId}`);
      setPatientDetail(response.data); 
      setError('');
    } catch (error) {
      setError('Failed to fetch patient details');
    }
  };

  
const uniquePatients = patients.filter((patient, index, self) =>
  index === self.findIndex(p => 
    p.PatientId === patient.PatientId && 
    p.FirstName === patient.FirstName && 
    p.LastName === patient.LastName
  )
);

const diagnosedToday = todaysPatients.filter(patient => patient.IsDiagnosed === true);
const pendingToday = todaysPatients.filter(patient => patient.IsDiagnosed === false);

const downloadReport = async () => {
  try {
    const response = await fetch("https://localhost:7230/api/Auth/get-report?patientId=PE291DC", {
      method: "GET",
      headers: {
        // Add Authorization if needed
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) throw new Error("Failed to fetch report");

    const blob = await response.blob();
    const contentDisposition = response.headers.get("content-disposition");
    let filename = "report.pdf";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading report:", error);
  }
};


  return (
    <div>
    <Navbar/>
      <header className="flex justify-between items-center mb-8 mt-6">
        <div className="user-info">
          <h1 className="text-2xl font-semibold flex items-center gap-2 line ml-10">
            <FaStethoscope />
            Doctor Dashboard
          </h1>
          <h2 className="text-lg font-semibold text-white ml-10">{user.firstName} {user.lastName}</h2>
          <p className="text-white ml-10">{user.userId}</p>
        </div>
        <div className='bg-transparent '>
          <input 
          type="date" 
          value={today}
          onChange={(e) => setToday(e.target.value)}
          className='bg-gray-200 text-black text-center font-semibold text-lg mt-1 h-10 rounded shadow-lg w-60' />
        </div>
        <button 
          onClick={handleLogout} 
          className="logout mr-10 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
        >
          <FaSignOutAlt className='bg-transparent'/>
          Logout
        </button>
      </header>

      <main>
        
        <div className="dashboard-stats grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 ml-10">
          
          <div className="stat-card p-4  shadow-md hover:shadow-xl ">
            <div className="stat-icon text-3xl bg-transparent flex gap-4">
              <FaUsers className='bg-transparent ml-2'/>
              <h3 className="text-xl font-bold text-black bg-transparent">Total Patients</h3>
            </div>
            <div className="stat-details mt-2 bg-transparent">
             
              <p className="text-2xl bg-transparent ml-16 text-center text-black ">{totalPatients}</p>

            </div>
          </div>

          
          <div className="stat-card p-4 shadow-md hover:shadow-xl ">
            <div className="stat-icon text-3xl bg-transparent flex gap-4">
              <FaCheckCircle className='bg-transparent ml-2'/>
              <h3 className="text-xl font-semibold bg-transparent text-black">Diagnosed</h3>
            </div>
            <div className="stat-details mt-2 bg-transparent">
              
              <p className="text-2xl bg-transparent ml-16">{diagnosedToday.length}</p>
            </div>
          </div>

          
          <div className="stat-card p-4  shadow-md hover:shadow-xl ">
            <div className="stat-icon text-3xl bg-transparent flex gap-4">
              <FaCalendarAlt className='bg-transparent ml-2'/>
              <h3 className="text-xl font-semibold bg-transparent ">Pending</h3>
            </div>
            <div className="stat-details mt-2 bg-transparent ">
              
              <p className="text-2xl bg-transparent ml-16">{pendingToday.length}</p>
            </div>
          </div>
        </div>

        
        <div className="patients-list-container mb-8 ml-10 flex gap-8 ">

          <div className='bg-transparent w-80'>
            <h3 className="text-xl font-bold mt-6 mb-4 flex items-center gap-4 bg-transparent text-black ml-20">
              <FaUserInjured className='bg-transparent' />
              Today's Patients 
            </h3>

            <div className='bg-transparent border-2 border-gray-600 ml-6 mt-6 h-80 w-80 rounded shadow-sm overflow-y-auto'>
              <ul className='bg-transparent mt-2'>
                {todaysPatients.length > 0 ? (
                  todaysPatients.map(patient => (
                    <li
                      className='bg-transparent ml-4 shadow-lg mr-4 h-10 text-center cursor-pointer text-md font-semibold hover:text-blue-600'
                      key={patient.PatientId}
                      onClick={() => handlePatientClick(patient)}
                    >
                      <h4 className='bg-transparent mt-2'>
                        {patient.Name} - {patient.PatientId} 
                      </h4>
                    </li>
                  ))
                ) : (
                  <li className='text-center text-gray-500 mt-4 bg-transparent '>No patients found</li>
                )}
              </ul>
            </div>

          </div>


          <div className="search-container mb-4 grid  bg-transparent mt-4 ">
            <div className='bg-transparent flex ml-3'>
            <input 
              type="text" 
              id="patient-search" 
              placeholder="Search patient by name or ID..." 
              className="p-2 border-2 border-gray-400 rounded-lg ml-10 w-70 h-10 mt-1 bg-transparent"
              value={patientId}
              onChange={handleInputChange}
            />
            <button className='cursor-pointer active bg-blue-700 text-white py-2 px-4 rounded-lg mt-1 h-10 ml-2'
            onClick={handleSearch}>Search</button>
            </div>
            {patientDetail && patientDetail.map( (man) => (
            <div className='bg-transparent border-2 border-gray-600 rounded ml-10 mt-4 h-80 w-70 overflow-y-auto'
            >
              <h1 className='bg-transparent ml-4 mt-4 font-semibold text-black text-lg'>Name : <span className='bg-transparent text-gray-500 '>{man.PatientName}</span></h1>
              <h1 className='bg-transparent ml-4 mt-4 font-semibold text-black text-lg'>PatientId : <span className='bg-transparent text-gray-500 '>{man.PatientId}</span></h1>
              <h1 className='bg-transparent ml-4 mt-4 font-semibold text-black text-lg'>Branch : <span className='bg-transparent text-gray-500 '>{man.Branch}</span></h1>
              <h1 className='bg-transparent ml-4 mt-4 font-semibold text-black text-lg'>Location : <span className='bg-transparent text-gray-500 '>{man.Location}</span></h1>
              <h1 className='bg-transparent ml-4 mt-4 font-semibold text-black text-lg'>Appointment Date : <span className='bg-transparent text-gray-500 '>{man.AppointmentDate}</span></h1>
              <h1 className='bg-transparent ml-4 mt-4 font-semibold text-black text-lg'>Appointment Time : <span className='bg-transparent text-gray-500 '>{man.AppointmentTime}</span></h1>
            </div>
            ))}
          </div>

          
          <div className="filter-tools mb-4 flex space-x-4 ml-2 mt-4 gap-2 bg-transparent">
            <div className='bg-gray-200 border-2 border-gray-300 w-52 rounded shadow-sm'>
            <h1 className="active bg-gray-400 text-white py-2 px-4 rounded-lg ml-2 w-30 mr-2 text-center mt-2 cursor-pointer hover:text-black text-md font-semibold">
              All Patients
            </h1>
            <ul className='bg-transparent mt-2 '>
              {uniquePatients.map(patient => 
              <li className='bg-transparent ml-2 shadow-lg mr-2 h-10 text-center cursor-pointer text-md font-semibold hover:text-blue-600' key={patient.PatientId}>
                <h4 className='bg-transparent '>{patient.FirstName} {patient.LastName} - {patient.PatientId}</h4>
              </li>)}
            </ul>
            </div>

            <div className='bg-gray-200 border-2 border-gray-300 w-52 rounded shadow-sm'>
            <h1 className="active bg-gray-400 text-white py-2 px-4 rounded-lg ml-2 w-30 mr-2 text-center mt-2 cursor-pointer hover:text-black text-md font-semibold">
              Diagnosed
            </h1>
            <ul className='bg-transparent mt-2 '>
              {diagnosedToday.map(patient => 
              <li className='bg-transparent ml-2 shadow-lg mr-2 h-10 text-center cursor-pointer text-md font-semibold hover:text-blue-600' key={patient.PatientId}>
                <h4 className='bg-transparent '>{patient.Name} - {patient.PatientId}</h4>
              </li>)}
            </ul>
            </div>
            
            <div className='bg-gray-200 border-2 border-gray-300 w-52 rounded shadow-sm'>
            <h1 className="active bg-gray-400 text-white py-2 px-4 rounded-lg ml-2 w-30 mr-2 text-center mt-2 cursor-pointer hover:text-black text-md font-semibold">
              Pending
            </h1>
            <ul className='bg-transparent mt-2 '>
              {pendingToday.map(patient => 
              <li className='bg-transparent ml-2 shadow-lg mr-2 h-10 text-center cursor-pointer text-md font-semibold hover:text-blue-600'
              
              key={patient.PatientId}>
                <h4 className='bg-transparent '>{patient.Name} - {patient.PatientId}</h4>
              </li>)}
            </ul>
            </div>
          </div>

          
          <ul id="patients-list" className="list-container">
            
          </ul>
        </div>
      </main>

      {showModel && selectedPatient &&(
     <div id="patient-modal" className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md bg-transparent">
          <span className="close-modal absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer bg-transparent">&times;</span>
          <div className="patient-details bg-transparent">
            <h2 className="text-xl font-bold mb-4 bg-transparent">Patient Details</h2>

            
            <div className="patient-info mb-2 bg-transparent">
              <div className="patient-info-header flex justify-between bg-transparent">

                <div className='bg-transparent'>
                  <p className='bg-transparent flex gap-2'>
                    <strong className='bg-transparent flex gap-2'>
                        <FaUser className='bg-transparent mt-1'/> Patient Name: </strong>
                        {todaysPatients.map(patient => (
                        <span id="modal-patient-name" className='bg-transparent'>{patient.Name}</span>))}
                  </p>
                  <p className='bg-transparent flex gap-2 mt-1'>
                    <strong className='bg-transparent flex gap-2'>
                        <FaIdCard  className='bg-transparent mt-1'/> Patient ID: </strong>
                        {todaysPatients.map(patient => (
                        <span id="modal-patient-id" className='bg-transparent'>{patient.PatientId}</span>))}
                  </p>
                </div>

                <div className="patient-status bg-transparent">
                  {!selectedPatient.IsDiagnosed && ( 
                  <span id="diagnosis-status" className="bg-red-500 text-black font-bold py-1 px-3 rounded-full ">
                    Not Diagnosed
                  </span>)}
                </div>

              </div>

            </div>

            
            <div className="report-section bg-transparent mb-2">
              <h3 className="text-md font-bold  bg-transparent flex gap-2"><FaFileMedicalAlt className='bg-transparent mt-1 ' /> Medical Reports :</h3>
              <div id="patient-reports" className="reports-container bg-transparent">
                
              </div>
            </div>

            {selectedPatient.IsDiagnosed ? (
            
            <div className="view-reports-section bg-white p-4 rounded-lg shadow-md border-2 border-gray-200">
            <h3 className="text-md font-bold text-black flex gap-2 mb-2 bg-transparent">
              <FaFileMedicalAlt className='mt-1 bg-transparent'/> View Medical Reports
            </h3>

            <div className="reports-container text-gray-700 bg-transparent">
            <button
              onClick={downloadReport}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-24"
            >
              Download Report
            </button>

            </div>
            </div>

            ) : (
            <div className="report-upload-section bg-white p-4 rounded-lg shadow-md border-2 border-gray-200">
              <h3 className="text-md font-bold bg-transparent text-black flex gap-2 mb-1"><FaFileUpload  className='bg-transparent mt-1'/> Upload Medical Reports</h3>
              <form id="report-upload-form" className="space-y-4 bg-transparent" onSubmit={handleUpload}>
                <div className="form-group bg-transparent">
                  <label htmlFor="report-title" className="font-medium bg-transparent">Report Title :</label>
                  <div className="input-with-icon relative bg-transparent">
                    <FaFileMedicalAlt className="absolute left-3 top-3 text-gray-400 bg-transparent mt-1" />
                    <input 
                      type="text" 
                      id="report-title" 
                      name="report-title" 
                      placeholder="Enter report title" 
                      className="pl-10 p-2 w-full border-2 mt-2 border-gray-400 rounded-lg bg-transparent"
                      required 
                    />
                  </div>
                </div>

                <div className="form-group bg-transparent">
                  <label htmlFor="report-files" className="font-bold text-md bg-transparent">Select Files</label>
                  <div className="file-input-container flex items-center gap-3 bg-transparent mt-2 " >
                    <input 
                      type="file" 
                      id="report-files" 
                      name="report-files" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      multiple 
                      className="p-2 w-full border-2 border-gray-400 rounded-lg bg-transparent"
                      required 
                      onChange={(e) => setUploadReport(e.target.files[0])}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary bg-blue-700 text-white py-2 px-4 rounded-lg w-full font-bold">
                  Upload Reports
                </button>
              </form>
            </div>
            )}

            {selectedPatient?.IsDiagnosed ? (
            <button 
                  id="mark-diagnosed-btn" 
                  className="btn-primary bg-green-500 text-white py-2 px-4 rounded-lg flex gap-2 ml-24 mt-6 "
                  
                >
                  <FaCheckCircle className='bg-transparent mt-1 '
                  
                  />Already Diagnosed
            </button>
            ) : (
            <button 
                  id="mark-diagnosed-btn" 
                  className="btn-primary bg-green-500 text-white py-2 px-4 rounded-lg flex gap-2 ml-24 mt-6 "
                  onClick={handleMarkDiagnosed}
                >
                  <FaCheckCircle className='bg-transparent mt-1 '
                  /> Mark as Diagnosed
            </button>
            )}
          </div>
          
        </div>
     </div> 
      )}


    <End/>
    </div>
  );
};

export default DoctorDashboard;
