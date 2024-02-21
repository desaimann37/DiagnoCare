import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useEffect
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Banner from './components/home/Banner';
import Footer from './components/footer/Footer';
import Diabetes from './components/d_diabetes/Diabetes';
import LungCancer from './components/d_lungcancer/LungCancer';
import Alzheimer from './components/d_alzheimer/Alzheimer';
import BrainTumor from './components/d_braintumor/BrainTumor';

function App() {
  // Use state for loggedin_obj
  const [loggedin_obj, setLoggedinObj] = useState(null);

  // Handling Generated User object After login
  const handleUserLogin = (userObj) => {
    // Use setLoggedinObj to update the state
    setLoggedinObj(userObj);
  };

  // Use useEffect to log state changes
  useEffect(() => {
    console.log('Updated loggedin_obj:', loggedin_obj);
  }, [loggedin_obj]); // Only re-run the effect if loggedin_obj changes

  return (
    <div className="App">
      <BrowserRouter>
      {loggedin_obj !== null && <Navbar OnClick={loggedin_obj} />}       
        <Routes>
          <Route path='/' element={<Banner />} />
          <Route path='/login' element={<Login onUserLogin={handleUserLogin} />} />
          <Route path='/diabetes' element={<Diabetes />} />
          <Route path='/lungcancer' element={<LungCancer />} />
          <Route path='/alzheimer' element={<Alzheimer />} />
          <Route path='/braintumor' element={<BrainTumor />} />
          {/* <Route path='/logout' element={<Logout />} /> */}

          {/* <Route path='UserProfile' element={<AuthUser />} /> */}
        </Routes>
        {/* <Chatbot/> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
