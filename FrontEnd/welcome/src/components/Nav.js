import React from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Logout= ()=> {
  localStorage.clear();
  axios.get("http://localhost:8080/hostRouter/logout")
}


function Nav() {
  const navigate = useNavigate();


    return (
        <div>
                          <nav>
          <ul className="nav ">
    
             <li className="sidbarNav" >
              <Link to="/ViewHomes" ><HomeIcon  sx={{ fontSize: 40, color: '#000' }}/></Link>
            </li> 
           
            <li>
                <a onClick={Logout} className="Logout"> <LogoutIcon sx={{ fontSize: 40, color: '#000' }} onClick={()=>{navigate("/")}}/></a>
            </li>

          </ul>
          
        </nav>
        </div>
    )
}

export default Nav
