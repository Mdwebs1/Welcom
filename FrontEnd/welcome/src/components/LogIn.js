import React from 'react'
import {  useState } from "react";
import axios from "axios"
import {useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import vedio from '../vedio/vedio.mp4'

function LogIn() {
  const [password,setPassword] = useState()
  const [email,setEmail] = useState("")
  // let [users, setUser] = useState();
  const [ckeck,setCheck] = useState("")
  let navigate = useNavigate()


const userSignin=(e)=> { 
  if(ckeck==="Guest"){ 
  console.log("gfgf")

     e.preventDefault();
    axios.post("http://localhost:8080/guestRouter/login",{email,password}).then((res) => {
   console.log(res);
   if(res.data.error){
       alert('fals')
           }if(res.data.guestUser){
               const token = res.data.guestUser;
               const guestSignin = jwt_decode(token)
               localStorage.setItem('token',token)

               alert('true')  
               console.log(token)
               let decodedData;
               const storedToken = localStorage.getItem("token");
               if (storedToken) {
                 decodedData = jwt_decode(storedToken, { payload: true });
                 console.log(decodedData);
                 let expirationDate = decodedData.exp;
                 var current_time = Date.now() / 1000;
                 if (expirationDate < current_time) {
                   localStorage.removeItem("token");
                 }
               }
               navigate('/GuestProf/'+decodedData.id)
           }
   
    })
  }else if(ckeck==="Host"){
    console.log("res"); 

    e.preventDefault();
    axios.post("http://localhost:8080/hostRouter/login",{email,password}).then((res)=>{
      console.log(res); 
      if(res.data.error){
        alert('fals')
            }if(res.data.hostUser){
      const token = res.data.hostUser;
      // console.log(res.data.hostUser);
      const hostSignin = jwt_decode(token)
     localStorage.setItem('token',token)
      alert('true')  

      let decodedData;
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        decodedData = jwt_decode(storedToken, { payload: true });
        console.log(decodedData);
        let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if (expirationDate < current_time) {
          localStorage.removeItem("token");
        }
      }
      navigate('/HostProf/'+decodedData.id)
    }
   
    })

  }
  

    
    }
    return (
        <div className="signUp">
             <video  loop muted src={vedio} autoplay="true" type="video/mp4" ></video>
                   <fieldset id="fld">
                   <legend>Sign In</legend>
                   <label for="email"></label>
                   <input onChange={(e) =>{setEmail(e.target.value)}} type="email" size="30" id="email" placeholder="Enter a Valid Email" maxlength="30" required></input><br/><br/>


                   <label for="pass"></label>
                   <input onChange={(e) =>{setPassword(e.target.value)}} type="password" size="30" id="pass" placeholder=" Password" maxlength="40" required></input><br/><br/>

                 <input type="submit" onClick={(e)=>userSignin(e)} value="login" class="btn"></input>
                 <input type="reset" value="Clear" class="btn"></input><br/><br/>

                 <label for="Guest">Guest</label>
                   <input onChange= {(e)=>setCheck(e.target.value)} type="radio" value="Guest" name="fav_language" ></input>
                   <label for="Host">Host</label>
                   <input onChange= {(e)=>setCheck(e.target.value)}type="radio" value="Host" name="fav_language" ></input><br/><br/>
      
       

                   </fieldset>

                
        </div>
       )
}

export default LogIn
