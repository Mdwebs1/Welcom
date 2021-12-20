import React from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'
import { useNavigate } from "react-router-dom";





function Nav() {
   const navigate = useNavigate();
  
   const Logout= ()=> {
    localStorage.clear();

    navigate('/')
  
  }
    return (
        <div>
                          <nav>
          <ul className="nav ">
    
             <li className="sidbarNav" >
              <Link to="/ViewHomes" ><HomeIcon  sx={{ fontSize: 40, color: '#000' }}/></Link>
            </li> 
           
            <li>
                <a onClick={Logout} className="Logout"> <LogoutIcon sx={{ fontSize: 40, color: '#000' }} /></a>
            </li>

          </ul>
          
        </nav>
        </div>
    )
}

export default Nav
