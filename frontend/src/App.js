import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login';
import Banner from './components/home/Banner';
import Footer from './components/footer/Footer'
import Diabetes from './components/d_diabetes/Diabetes';
import LungCancer from './components/d_lungcancer/LungCancer';
import Alzheimer from './components/d_alzheimer/Alzheimer';
import BrainTumor from './components/d_braintumor/BrainTumor';
import Chatbot from './components/chatwidget/Chatbot';
// import ChatWidget from './components/chatwidget/ChatWidget';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar/>
        <Routes>
          <Route path='/' element={<Banner/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/diabetes' element={<Diabetes/>}/>
          <Route path='/lungcancer' element={<LungCancer/>}/>
          <Route path='/alzheimer' element={<Alzheimer/>}/>
          <Route path='/braintumor' element={<BrainTumor/>}/>
          {/* <Route path='UserProfile' element={<AuthUser />} /> */}
        </Routes>
        {/* <Chatbot/> */}
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;