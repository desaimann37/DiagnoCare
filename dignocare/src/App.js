import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import SignIn from './components/login/Login';
import SignUp from './components/login/Signup';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar/>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;