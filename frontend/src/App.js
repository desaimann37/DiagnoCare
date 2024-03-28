import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import PaymentButton from "./PatientComponents/Payment/Payment";
import NotFoundPage from "./NotFoundPage";
import "./style.css";
import LoadingPage from "./PatientComponents/LoadingPage";

function App() {
  const [loggedinObj, setLoggedinObj] = useState(null);

  const handleUserLogin = (userObj) => {
    setLoggedinObj(userObj);
    localStorage.setItem("loggedin_obj", JSON.stringify(userObj));
  };

  useEffect(() => {
    const storedUserObj = localStorage.getItem("loggedin_obj");
    setLoggedinObj(storedUserObj ? JSON.parse(storedUserObj) : null);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {loggedinObj ? (
          <Routes>
            {loggedinObj.role === "doctor" ? (
              
              <>
              {console.log("role is doctor")}
                <Route path="/doctor" element={<Dlayout />}>
                  <Route index element={<Banner />} />
                  <Route path="diabetes" element={<Diabetes />} />
                  <Route path="lungcancer" element={<LungCancer />} />
                  <Route path="alzheimer" element={<Alzheimer />} />
                  <Route path="braintumor" element={<BrainTumor />} />
                  <Route path="account" element={<Account />} />
                </Route>
              </>
            ) : (
              <>
              {console.log("role is patient")}
              <Route path="/patient" element={<Playout />}>
                <Route index element={<Home />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="doctors/:id" element={<DoctorDetail />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="services" element={<Services />} />
                <Route path="payment" element={<PaymentButton />} />
              </Route>
              </>
            )}
            <Route path="*" element={<NotFoundPage />} /> // Wildcard route for 404 page
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
