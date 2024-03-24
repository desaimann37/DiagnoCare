import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
//import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Navbar from "./components/layout/Layout";
import Login from "./components/login/Login";
import Banner from "./components/home/Banner";
import Diabetes from "./components/d_diabetes/Diabetes";
import LungCancer from "./components/d_lungcancer/LungCancer";
import Alzheimer from "./components/d_alzheimer/Alzheimer";
import BrainTumor from "./components/d_braintumor/BrainTumor";
import Account from "./components/layout/Account";
import UploadForm from "./components/UploadForm";
import Layout from "./Patient/Layout/Layout";
import Doctors from "./Patient/DoctorList/Doctors";
import Chatbot from "./components/chatwidget/Chatbot";
import Home from "./Patient/Home/Home";
import Services from "./Patient/Sevices/Services";
import DoctorDetail from "./Patient/DoctorList/DoctorDetail";
// import CircularDemo from "./components/home/Cards";
// import CircularDemo from "./components/home/Cards"


//import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  const [loggedin_obj, setLoggedinObj] = useState(null);

  const handleUserLogin = (userObj) => {
    setLoggedinObj(userObj);
    localStorage.setItem("loggedin_obj", JSON.stringify(userObj));
    console.log(JSON.stringify(userObj));
  };

  useEffect(() => {
    const storedUserObj = localStorage.getItem("loggedin_obj");
    setLoggedinObj(storedUserObj ? JSON.parse(storedUserObj) : null);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {!localStorage.getItem("loggedin_obj") ? (
          <Navigate to="/login" replace />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<Banner />} />
                <Route path="diabetes" element={<Diabetes />} />
                <Route path="lungcancer" element={<LungCancer />} />
                <Route path="alzheimer" element={<Alzheimer />} />
                <Route path="braintumor" element={<BrainTumor />} />
                <Route path="account" element={<Account />} />
                <Route path="store" element={<UploadForm />} />
              </Route>
              <Route path="/p-layout" element={<Layout />} >
                <Route index element={<Home/>} />
                <Route path="doctors" element={<Doctors/>} />
                <Route path="doctors/:id"element={<DoctorDetail/>} />
                <Route path="chatbot" element={<Chatbot/>} />
                <Route path="services" element={<Services/>} />
              </Route>
            </Routes>
          </>
        )}
        <Routes>
          <Route
            path="/login"
            element={<Login onUserLogin={handleUserLogin} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
