import axios from 'axios'
import React from 'react'
import {useState} from "react"
import {useNavigate } from "react-router-dom"
import vedio from '../vedio/vedio.mp4'
import jwt_decode from "jwt-decode";


function SignUp() {
    const [guest, setGuest] = useState();
    const [host, setHost] = useState();
    const [ckeck,setCheck] = useState("")
    const [name,setName] = useState("")
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState()
    const [email,setEmail] = useState("")
    let navigate = useNavigate()

    
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

    const handleSignUp =()=>{
    
        //for move from page to another

        if(ckeck === "Guest"){
        axios.post("http://localhost:8080/guestRouter/signup",{name,userName,email,password}).then((res)=>{
            if(res.data.error){
                alert('معليش يالطيب بس ترا عندك خطا')
                    }if(res.data.guestUser){
                        const token = res.data.guestUser;
                        localStorage.setItem('token',token)

                        console.log('guest')
                        alert(`أرررحب  ${name}`) 

                    }
                    setGuest(res.data.guest)

                     navigate('/GuestProf/'+decodedData.id)
        })
      
        console.log('guest')

    }else if(ckeck === "Host"){

        axios.post('http://localhost:8080/hostRouter/signup',{name,userName,email,password}).then((res)=>{
            if(res.data.error){
                alert('معليش يالطيب بس ترا عندك خطا')
                    }
                     if(res.data.hostUser){
                        const token = res.data.hostUser;
                        localStorage.setItem('token',token)
                        
                        alert(`أرررحب  ${name}`)
                        // alert(`أرررحب  ${res.data.hostUser.name}`) 
                    }
                    setHost(res.data.hostUser) 

                     navigate('/HostProf/'+decodedData.id)
        })
        console.log('host')
    }}
  
   
 
    return (
        <div className="signUp">
        <img src="https://i.pinimg.com/564x/f3/ac/ed/f3aced989a07f2f345d6d53dde818784.jpg"></img>
           {/* <video  loop muted src={vedio} autoplay="true" type="video/mp4" ></video> */}
                   <fieldset id="fld">
                   <legend>Sign Up</legend>
                   <label for="user"></label>
                   <input onChange={(e) =>{setUserName(e.target.value)}} type="string" size="30" id="userName" placeholder=" userName" maxlength="30" required></input><br/><br/>

                   <label for="name"></label>
                   <input onChange={(e) =>{setName(e.target.value)}} type="string" size="30" id="name" placeholder=" name" maxlength="30" required></input><br/><br/>

                   <label for="email"></label>
                   <input onChange={(e) =>{setEmail(e.target.value)}} type="email" size="30" id="email" placeholder="Enter a Valid Email" maxlength="30" required></input><br/><br/>


                   <label for="pass"></label>
                   <input onChange={(e) =>{setPassword(e.target.value)}} type="password" size="30" id="pass" placeholder=" Password" maxlength="40" required></input><br/><br/>
                
                   <label for="Guest">Guest</label>
                   <input onChange= {(e)=>setCheck(e.target.value)} type="radio" value="Guest" name="fav_language" ></input>
                   <label for="Host">Host</label>
                   <input onChange= {(e)=>setCheck(e.target.value)}type="radio" value="Host" name="fav_language" ></input><br/><br/>
      
                   <input onClick={handleSignUp} type="submit" value="Create Account" class="btn"></input>
                   <input type="reset" value="Clear" class="btn"></input><br/><br/>
                   
       

                   </fieldset>
    
               
        </div>
    )
}

export default SignUp
