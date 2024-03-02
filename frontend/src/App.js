import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Layout";
import Login from "./components/login/Login";
import Banner from "./components/home/Banner";
import Diabetes from "./components/d_diabetes/Diabetes";
import LungCancer from "./components/d_lungcancer/LungCancer";
import Alzheimer from "./components/d_alzheimer/Alzheimer";
import BrainTumor from "./components/d_braintumor/BrainTumor";
import Account from "./components/layout/Account";

function App() {
  const [loggedin_obj, setLoggedinObj] = useState(null);

  const handleUserLogin = (userObj) => {
    setLoggedinObj(userObj);
    localStorage.setItem("loggedin_obj", JSON.stringify(userObj));
    console.log(JSON.stringify(userObj));
  };

  useEffect(() => {
    const storedUserObj = localStorage.getItem("loggedin_obj");
    // console.log('Stored User Object:', storedUserObj);
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
