import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Dlayout from "./DoctorComponents/DoctorLayout/Layout";
import Login from "./DoctorComponents/Login/Login";
import Banner from "./DoctorComponents/DoctorHome/Banner";
import Diabetes from "./DoctorComponents/D_diabetes/Diabetes";
import LungCancer from "./DoctorComponents/D_lungcancer/LungCancer";
import Alzheimer from "./DoctorComponents/D_alzheimer/Alzheimer";
import BrainTumor from "./DoctorComponents/D_braintumor/BrainTumor";
import Account from "./DoctorComponents/DoctorLayout/Account";
import Playout from "./PatientComponents/Layout/Layout";
import Doctors from "./PatientComponents/DoctorList/Doctors";
import Chatbot from "./DoctorComponents/Chatwidget/Chatbot";
import Home from "./PatientComponents/Home/Home";
import Services from "./PatientComponents/Sevices/Services";
import DoctorDetail from "./PatientComponents/DoctorList/DoctorDetail";
import NotFoundPage from "./NotFoundPage";
import "./style.css";
import PaymentSuccess from "./PatientComponents/DoctorList/PayemntSuccsess";
import MyBooking from "./PatientComponents/Layout/MyBooking";
import JoinRoomButton from "./PatientComponents/Meeting/JoinRoomButton";
import JoinRoom from './PatientComponents/Meeting/JoinRoom';
import SendAccurateRec from "./DoctorComponents/SendAccurateRec";
import UpdateProfile from "./DoctorComponents/DoctorLayout/UpdateProfile";


function App() {
  const [loggedinObj, setLoggedinObj] = useState(null);

  const handleUserLogin = (userObj) => {
    setLoggedinObj(userObj);
    localStorage.setItem("loggedin_obj", userObj);
  };

  useEffect(() => {
    const storedUserObj = localStorage.getItem("loggedin_obj");
    setLoggedinObj(storedUserObj ? storedUserObj : null);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {loggedinObj ? (
          <Routes>
            {loggedinObj && JSON.parse(loggedinObj).role === "doctor" ? (
              <>
                <Route path="/doctor" element={<Dlayout />}>
                  <Route index element={<Banner />} />
                  <Route path="diabetes" element={<Diabetes />} />
                  <Route path="lungcancer" element={<LungCancer />} />
                  <Route path="alzheimer" element={<Alzheimer />} />
                  <Route path="braintumor" element={<BrainTumor />} />
                  <Route path="account" element={<UpdateProfile/>}/>
                  <Route path="mypatient" element={<Account />} />
                  <Route path="acc-recommendation" element={<SendAccurateRec />} />
                </Route>
                <Route path="/doctor/meeting" element={<JoinRoom />} />

              </>
            ) : (
              <>
                <Route path="/patient" element={<Playout />}>
                  <Route index element={<Home />} />
                  <Route path="doctors" element={<Doctors />} />
                  <Route path="doctors/:id" element={<DoctorDetail />} />
                  <Route path="chatbot" element={<Chatbot />} />
                  <Route path="services" element={<Services />} />
                  <Route path="mybooking" element={<MyBooking />} />
                  <Route path="join_room" element={<JoinRoomButton />} />
                  <Route
                    path="payment-succsess/:id"
                    element={<PaymentSuccess />}
                  />
                </Route>
                <Route path="/patient/meeting" element={<JoinRoom />} />
              </>
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        ) : (
          <>
            <Login onUserLogin={handleUserLogin} />
            {/* <Navigate to="/login" replace /> */}
            <Routes>
              <Route path="/login" />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
