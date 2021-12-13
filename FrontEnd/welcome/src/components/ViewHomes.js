import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom"
import Nav from './Nav'
import jwt_decode from "jwt-decode"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Link} from 'react-router-dom'
import coffe from '../vedio/coffe.mp4'
import coffee from '../vedio/coffee.MP4'

function ViewHomes() {
    const [Homes ,setHomes] = useState([])
    let { hostId } = useParams();
    let params = useParams();
    const navigate = useNavigate();
    console.log(params.hostId)

    let decodedData ;
    const storedToken = localStorage.getItem("token");
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
          <video loop muted src={coffee} autoplay="true" type="video/mp4" ></video>
        <div className="container">
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
      
        <div className="sidbar"  onClick={()=>{navigate("/GuestProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/>
     
        <Nav />
         </div>
       

       
        </div>
    )
}

export default ViewHomes
