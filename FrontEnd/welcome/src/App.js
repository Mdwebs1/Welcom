import './App.css';
 import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//  import Nav from './components/Nav';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import GuestProf from './components/GuestProf'
import HostProf from './components/HostProf'
import Login from './components/LogIn'
import ViewHomes from './components/ViewHomes'
import Booking from './components/Booking'
// import Profile from './components/Profile'


function App() {
  return (
    <div className="App">
      
       {/* <Nav/>  */}
      <Routes>
        
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/SignUp" element={<SignUp />}></Route>
        <Route exact path="/LogIn" element={<LogIn />}></Route>
        <Route exact path="/GuestProf/:id" element={<GuestProf />}></Route>
        <Route exact path="/HostProf/:id" element={<HostProf />}></Route>
        <Route exact path="/LogIn/:id" element={<LogIn />}></Route>
        <Route exact path="/ViewHomes" element={<ViewHomes />}></Route> 
        <Route exact path="/ViewHomes/:hostId" element={<ViewHomes />}></Route> 
        <Route path="/Booking/:id" element={<Booking />}></Route>
        {/* <Route exact path="/Profile" element={<Profile />}></Route> */}
      
      </Routes>
    </div>
  );
}

export default App;
