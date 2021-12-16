import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom"
import Nav from './Nav'
import jwt_decode from "jwt-decode"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Link} from 'react-router-dom'


function ViewHomes() {
    const [Homes ,setHomes] = useState([])
    let { hostId } = useParams();
    let params = useParams();
    const navigate = useNavigate();
    console.log(params.hostId)

    let decodedData ;
    const storedToken = localStorage.getItem("token");
    const typeOfUser = localStorage.getItem("typeOfUser");
    if (storedToken){
      decodedData = jwt_decode(storedToken, { payload: true });
       console.log(decodedData);
     }
    useEffect(() => {
        axios.get("http://localhost:8080/hostRouter/")
        .then((res) => {
          console.log(res.data);
          setHomes(res.data)
        });
      }, []);

    return (
        <div>
<div className="sidbar ">
{(function () {
             if(typeOfUser!=undefined) {
               if( typeOfUser=="guestUser"){
                 return (<div onClick={()=>{navigate("/GuestProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>)
               }if(typeOfUser=="hostUser"){
                 return(<div onClick={()=>{navigate("/HostProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>)
                
               }
             }      
                  })()}
{/* { typeOfUser=="guestUser"?<div onClick={()=>{navigate("/GuestProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>:
                          <div onClick={()=>{navigate("/HostProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>}
      */}
     <Nav />
      </div>
        <div className="containerHome">
                    {Homes.map((host) => {
                          return(
                            <div >
          
          <div className="all-card">

           <div class="card" onClick={()=>{navigate("/HostProf/"+host._id)}}>
           <div class="avatar">
                  {host.hostImage? <img src={host.hostImage} ></img>:<></>} 
           </div>
   <div class="title">
      <h4>{host.name}</h4>
          </div>
            </div>
            </div>
            </div>
        



        )
       
    })}
  
        </div>
      
       
       

       
        </div>
    )
}

export default ViewHomes
