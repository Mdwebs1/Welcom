import React from 'react'
import {  useState } from "react";
import axios from "axios"
import {useNavigate } from "react-router-dom"
import jwt from "jwt-decode"

function LogIn() {
  const [password,setPassword] = useState()
  const [email,setEmail] = useState("")
  let [users, setUser] = useState();
  const [ckeck,setCheck] = useState("")
  let navigate = useNavigate()


const userSignin=(e)=> { 
  if(ckeck==="Guest"){ 

     e.preventDefault();
    axios.post("http://localhost:8080/guestRouter/login",{email,password}).then((res) => {
   console.log(res);
   if(res.data.error){
       alert('fals')
           }if(res.data.guestUser){
               const token = res.data.token;
               console.log(res.data);
               const guestSignin = jwt(token)
               localStorage.setItem('token',token)
               localStorage.setItem('user',res.data.guestUser)
               alert('true') 
               setUser(res.data);
               console.log(res.data)
               navigate('/GuestProf/'+res.data.guestUser._id)
           }
   
    })
  }else if(ckeck==="Host"){
  
    e.preventDefault();
    axios.post("http://localhost:8080/hostRouter/login",{email,password}).then((res)=>{
      console.log(res);
    if(res.data.hostUser){
      const token = res.data.token;
      console.log(res.data);

      const hostSignin = jwt(token)
      localStorage.setItem('token',token)
      localStorage.setItem('user',res.data.hostUser)
      alert('true') 
      setUser(res.data);
      console.log(res.data.hostUser._id)
      navigate('/HostProf/'+res.data.hostUser._id)
    }
   
    })

  }
  

    
    }
    return (
        <div>
            
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
