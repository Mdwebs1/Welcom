import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode"
import Nav from './Nav'


function GuestProf() {
    const [users ,setUser] = useState()
    const [loading,setLoading]=useState(true)
    const [allBookinh ,setAllBookinh] = useState([])
    let params = useParams();
    let {id} = useParams();
    console.log(params.id)
    let navigate = useNavigate()

    //save informations in localStorage

    let decodedData ;
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      decodedData = jwt_decode(storedToken, { payload: true });
       console.log(decodedData);
       let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token"); 
        }
     }

    useEffect(() => {
        axios.get("http://localhost:8080/guestRouter/"+id )
        .then((res) => {
           console.log(res)
            setUser(res.data[0])
            setLoading(false)
            }
        )
        axios.get(`http://localhost:8080/hostRouter/booking/${decodedData.id}`)
        .then((res) => {
           console.log(res)
           setAllBookinh(res.data)
            }
        )
    }, [])
    const chat = (id) => {

        navigate(`/chat/${id}`)
      }

    if(loading){
        return(
            <p>loading...</p>
        )
    }
    

    return (
        
        <div >
             <Nav/>  
        <div className="guestProgBackground" >
            <div className="Guest" style={{display: 'flex', justifyContent: 'center', gap: '100px'}}>
    <img className="guestProgImg" src="https://i.pinimg.com/236x/20/0d/72/200d72a18492cf3d7adac8a914ef3520.jpg"></img>

    <div>
    
            <h1 className="guestProg"> {users.userName} : اليوزر</h1>
            <h1 className="guestProg"> {users.name}: الأسم</h1>
            

             {allBookinh.map((booking)=>{

                return(
                    <div >
                    <button className="button" onClick={() => chat(booking._id)}>Chat</button>

                    {(function(){
                    if(booking.bookingStatues =="Pending"){
                        return(
                            <div>
                                <p>طلبك في الإنتظار</p>

                    <h3 className="guestProg">{booking.host.name}: حجزك مع</h3>
                    <h3 className="guestProg"> {booking.date}: الموعد</h3>
                   
                    <img className="guestProg" src={booking.host.hostImage}></img> 
                            </div>
                        )
                    }
                    })()}

                    {(function(){
                    if(booking.bookingStatues =="Rejected"){
                        return(
                            <div>
                                <p>معليش رفضت طلبك عيال اختي بيزعجونك اشتر راحتك</p>
                    <h3 className="guestProg">{booking.host.name}: حجزك مع</h3>
                    <h3 className="guestProg">{booking.date}: الموعد</h3>
                   
                    <img className="guestProg" src={booking.host.hostImage}></img> 
                            </div>
                        )
                    }
                    })()}

                    
                    {(function(){
                    if(booking.bookingStatues =="Accepted"){
                        return(
                            <div>
                               <p> :) حياك الله ننتظرك بأقرب وقت</p>
                    <h3 className="guestProg">{booking.host.name}: حجزك مع</h3>
                    <h3 className="guestProg">{booking.date}: الموعد</h3>
                   
                    <img className="guestProg" src={booking.host.hostImage}></img> 
                            </div>
                        )
                    }
                    })()}
                    
               
                    </div>
                )
             })}
             
             </div>
             </div> 
        <div class="wrap">
        <div class="house__holder">
            <div class="sun"></div>
            <div class="cloud__holder">
                <div class="cloud"></div>
                <div class="cloud cloud--small"></div>
            </div>
            <div class="cloud__holder cloud__holder--reverse">
                <div class="cloud"></div>
                <div class="cloud cloud--small"></div>
            </div>
            <div class="house__base">
                <div class="house__side house__garage">
                    <div class="house__garage-door">
                        <span class="shadow"></span>
                        <span class="shadow shadow1"></span>
                        <span class="shadow shadow2"></span>
                        <span class="shadow shadow3"></span>
                        <span class="house__handle"></span>
                    </div>
                </div>
                <div class="house__side house__front">
                    <div class="house__roof">
                        <div class="house__chimney">
                            <span class="house__chimney-smoke"></span>
                            <span class="house__chimney-smoke"></span>
                            <span class="house__chimney-smoke"></span>
                            <span class="house__chimney-smoke"></span>
                            <span class="house__chimney-smoke"></span>
                        </div>
                        <span class="house__roof-window"></span>
                        <span class="house__roof-shadow"></span>
                        <span class="house__roof-shadow house__roof-shadow--sec"></span>
                    </div>
                    <div class="house__door">
                        <span class="house__eye-thing"></span>
                        <span class="house__handle house__door-handle"></span>
                        <span class="house__mail-box"></span>
                    </div>
                    <div class="house__window house__front-window">
                        <span class="house__shine"></span>
                        <span class="house__window-brick"></span>
                    </div>
                </div>
                <div class="house__side house__back">
                    <div class="house__roof-top">
                        <span class="house__shine house__shine--roof"></span>
                    </div>
                    <div class="house__window house__back-window">
                        <span class="house__shine"></span>
                        <span class="house__window-brick house__window-brick--sec"></span>
                    </div>
                    <div class="house__window house__back-window--sec">
                        <span class="house__shine"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>


         
             
        </div>
    )
}

export default GuestProf
