import React from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"
import AccountBoxIcon from '@mui/icons-material/AccountBox';





let decodedData ;
const storedToken = localStorage.getItem("token");
const typeOfUser = localStorage.getItem("typeOfUser");
if (storedToken){
  decodedData = jwt_decode(storedToken, { payload: true });
   console.log(decodedData);
 }

function Nav() {
  let navigate = useNavigate()

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
           
         

            <li >
            {(function () {
             if(decodedData!==undefined) {
               if( decodedData.typeOfUser==="guestUser"){
                 return (<div onClick={()=>{navigate("/GuestProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 30 }}/></div>)
               }if(decodedData.typeOfUser==="hostUser"){
                 return(<div onClick={()=>{navigate("/HostProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>)
                
               }
             }      
                  })()}

            </li>
            <li>
                <a onClick={Logout} className="Logout"> <LogoutIcon sx={{ fontSize: 30, color: '#000' }} /></a>
            </li>

          </ul>
          
        </nav>
        </div>
    )
}

export default Nav
