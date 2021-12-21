import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom"
import Nav from './Nav'
import jwt_decode from "jwt-decode"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';// import LoginIcon from '@mui/icons-material/Login';
import Animation from './Animation'



function ViewHomes() {
    const [Homes ,setHomes] = useState([])
    const [search ,setSearch] = useState()
    const [city ,setCity] = useState()
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


      const handelSearch =(e)=>{
        console.log(search)
        e.preventDefault();
        axios.get(`http://localhost:8080/hostRouter/findCity/${search}`)
        .then((res) => {
          console.log(res.data);
           setCity(res.data)
        })
      }
    return (
        <div className="home-backgroundColor">
              <Animation/>

<div className="sidbar ">
{/* {(function () {
             if(decodedData!==undefined) {
               if( decodedData.typeOfUser==="guestUser"){
                 return (<div onClick={()=>{navigate("/GuestProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>)
               }if(decodedData.typeOfUser==="hostUser"){
                 return(<div onClick={()=>{navigate("/HostProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>)
                
               }
             }      
                  })()} */}
                  <Nav />
                  <div className="search">
                  <input className="inp-search" onChange={(e) => setSearch(e.target.value)} ></input>
                  <SearchOutlinedIcon sx={{ fontSize: 40,color: '#000' }} onClick={(e)=>handelSearch(e)}/>

                  {/* <button  onClick={(e)=>handelSearch(e)} ><SearchOutlinedIcon sx={{ fontSize: 30, color: '#000' }}/></button> */}
                  </div>
{/* { typeOfUser=="guestUser"?<div onClick={()=>{navigate("/GuestProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>:
                          <div onClick={()=>{navigate("/HostProf/"+decodedData.id)}}><AccountBoxIcon sx={{ fontSize: 40 }}/></div>}
      */}
    
      </div>
     

        <div className="containerHome">
                    {Homes.map((host) => {
                          return(
                            <div >
          
          <div className="all-card">

           <div class="card" onClick={()=>{navigate("/HostProf/"+host._id)}}>
           <div class="avatar">
                  {host.hostImage? <img className='mapImg' src={host.hostImage} ></img>:<></>} 
           </div>
   <div class="title">
   <br/> <br/> 
      <h4>{host.name}</h4>
      <h4>{host.city}</h4>
          </div>
            </div>
            </div>
            </div>

        )
       
    })}
  
        </div>
      

       {/* ========================================== code amirah =========================== */}

       {/* <div className="container-amirah">
          <div className="card-amirah">
            <div className="card-item-amirah">
            <div className="card-title-amirah">
            <h4>test name</h4>
            <img className="img-amirah" style={{width: '60%'}} src={'https://www.befreetour.com/img/produk/img-worlds-of-adventure-dubai/img-worlds-of-adventure-dubai_c08a22f95d160733e13ab4c44c049fca06192e49.jpg'}/>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <button>test</button>
            </div>
            
            </div>
          </div>


       </div> */}
       {/* ========================================== code amirah =========================== */}

       
        </div>
    )
}

export default ViewHomes
