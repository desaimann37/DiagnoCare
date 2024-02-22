import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Banner from './components/home/Banner';
import Footer from './components/footer/Footer';
import Diabetes from './components/d_diabetes/Diabetes';
import LungCancer from './components/d_lungcancer/LungCancer';
import Alzheimer from './components/d_alzheimer/Alzheimer';
import BrainTumor from './components/d_braintumor/BrainTumor';

function App() {
  const [loggedin_obj, setLoggedinObj] = useState(null);

  const handleUserLogin = (userObj) => {
    setLoggedinObj(userObj);
    localStorage.setItem('loggedin_obj', JSON.stringify(userObj));
    console.log(JSON.stringify(userObj));
  };

  useEffect(() => {
    const storedUserObj = localStorage.getItem('loggedin_obj');
    // console.log('Stored User Object:', storedUserObj);
    setLoggedinObj(storedUserObj ? storedUserObj : null);
  }, []);
  

  useEffect(() => {
    console.log('Updated loggedin_obj:', loggedin_obj);
  }, [loggedin_obj]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login onUserLogin={handleUserLogin} />} />

          {loggedin_obj !== null ? (
            <>
              <Route path='*'element={<Navbar />}/>
              <Route path='/home' element={<Banner />} />
              <Route path='/diabetes' element={<Diabetes />} />
              <Route path='/lungcancer' element={<LungCancer />} />
              <Route path='/alzheimer' element={<Alzheimer />} />
              <Route path='/braintumor' element={<BrainTumor />} />
              
            </>
          ) : null}

          {/* {loggedin_obj !== null && (
            <Navbar onClick={loggedin_obj} />
          )} */}

          <Route path='*' element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
