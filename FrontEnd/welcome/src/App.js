import './App.css';
 import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//  import Nav from './components/Nav';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import GuestProf from './components/GuestProf'
import HostProf from './components/HostProf'
import Login from './components/LogIn'
import {io} from 'socket.io-client';
import ViewHomes from './components/ViewHomes'
import Booking from './components/Booking'
import Logout from './components/Logout'
import Chat from './components/Chat'
import  {useEffect , useState} from 'react'



// import Profile from './components/Profile'


function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("trying to connect to socket.io")
    const newSocket = io(`http://localhost:8080`);
    setSocket(newSocket);
  
  }, [setSocket]); 

  return (
    <div className="App">
    
       {/* <Nav/>  */}
      <Routes>
        
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/LogIn" element={<LogIn />}></Route>
        <Route path="/GuestProf/:id" element={<GuestProf />}></Route>
        <Route path="/HostProf/:id" element={<HostProf />}></Route>
        <Route path="/LogIn/:id" element={<LogIn />}></Route>
        <Route path="/ViewHomes" element={<ViewHomes />}></Route> 
        <Route path="/ViewHomes/:hostId" element={<ViewHomes />}></Route> 
        <Route path="/Booking/:id" element={<Booking />}></Route>
        {/* <Route exact path="/Profile" element={<Profile />}></Route> */}
        <Route path="/Logout" element={<Logout />}></Route>
        <Route path="/Chat/:id" element={<Chat socket={socket} />}></Route>
      
      </Routes>
    </div>
  );
}

export default App;
