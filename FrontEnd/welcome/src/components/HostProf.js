import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from "react-router-dom"
import jwt_decode from "jwt-decode"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Nav from './Nav'


function HostProf() {
    const [users ,setUser] = useState()
    const [loading,setLoading]=useState(true)
    const [phoneNumber , setPhoneNumber] = useState()
    const [homeImage,setHomeImage] = useState()
    const [informations, setInformations] = useState()
    const [name , setName] = useState()
    const [userName , setUserName] = useState()
    const [userEmail , setUserEmail] = useState()
    const [password , setPassword] = useState()
    const [userImage , setUserImage] = useState()
    const [saveId , setSaveId]= useState()
    const [refresh , setRefresh]= useState(false)
    const [enableEdit , setEnableEdit]= useState(false)
    const [enableProfile , setEnableProfile]= useState(false)
    const [selectedDate , setSelectedDate]= useState(null)
    const [startDate, setStartDate] = useState();
    let { id } = useParams();
    let [homes, setHomes] = useState([]);
    let params = useParams();
    console.log(params.id)

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
        axios.get("http://localhost:8080/hostRouter/"+params.id )
        .then((res) => {
           console.log(res.data[0])
            setUser(res.data[0])
            setHomes(res.data[0].homes)
            setLoading(false)
            }
        )
    }, [refresh])

    // loding
    if(loading){
        return(
            <p>loading...</p>
        )
    }

    //   ADD A HOME INFORMATION
  const postMethod = (e) => {
    e.preventDefault();

    const obj = {
      //حطيناها في اوبجكت عشانها اكثر من قيمة وقيمتها الاصليه اوبجكت وعشان نقدر نمر على كل المؤلفين اللي قبل ويضيف عليهم مو فوقهم
      image:homeImage,
      phoneNumber: phoneNumber,
      informations:  informations,

    };
    axios
      .post(`http://localhost:8080/hostRouter/addHome/${id}`, obj)
      .then((res) => {
        console.log(res.data.homes);
        setHomes(res.data.homes)
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  //delete Home Frome Host Prof
  const deleteHome = (id) => {
    axios
      .delete("http://localhost:8080/hostRouter/deleteHome/", {data:{hostId:params.id ,homeId:id}})
      .then((res) => {

        console.log(res);
        //  setHomes(res.data.homes);
        setRefresh(!refresh)
      })
      .catch((error) => {
        // console.log(error.res);
      });
  };

  //Update
  const ubdate =(e,home)=>{
    e.preventDefault()
    setSaveId(home._id)
    setInformations(home.informations)
    setHomeImage(home.homeImage)
    setPhoneNumber(home.phoneNumber)
    setEnableEdit(true)


  }
  const saveData =(e)=>{
    e.preventDefault()
    const obj = {informations:informations,phoneNumber:phoneNumber,homeImage:homeImage,id:saveId};
    axios.put("http://localhost:8080/hostRouter/updateHomes/", obj).then((response) =>{
        setHomes(response.data.data)
        setRefresh(!refresh)
        console.log(response.data)
        setEnableEdit(false)
    })
  }


  //updateProfile


  const changeProfile =(e)=>{
    e.preventDefault()
  
    setName(users.name)
    setUserName(users.userName)
    setUserEmail(users.email)
    setPassword(users.password)
    setUserImage(users.hostImage)
    setEnableProfile(true)


  }

  const updateProfile =(e)=>{
    e.preventDefault()
    const obj = {name:name,userName:userName,email:userEmail,password:password,hostImage:userImage};
    axios.patch(`http://localhost:8080/hostRouter/updateProdile/${id}`,obj).then((response) =>{
      setUser(response.data)
        setHomes(response.data.homes)
        setRefresh(!refresh)
        console.log(response.data)
        setEnableProfile(false)
    })
  }
//for booking
const booking =()=>{
  console.log(id+"  "+decodedData.id+"   "+selectedDate) 
  axios.post('http://localhost:8080/guestRouter/booking', {hostId:id,guestId:decodedData.id,date:selectedDate})
  .then((response)=>{
    console.log(response.data)
    setStartDate([response.data])
  
  })
}

//   {(function(){
//     if(decodedData!=undefined){
//       console.log(decodedData)
//       console.log(decodedData.id)
//       console.log(id)
//       if(decodedData.id==id){
    return (
      <div>  

       <Nav/>
       <div  className="profile">
        <div>
        <div>
        <h1 className="hostProf">البيت بيتك والعين اوسع لك من المكان </h1>

          <h1 className="hostProf">userName :{users.userName}</h1>
          <h1 className="hostProf">name :{users.name}</h1>

            {/* form for more information */}
            {homes?.map((home, index) => {
                return(
                     <div key={index}>
                    <h3 className="hostProf">{home.phoneNumber}</h3>
                    <h3 className="hostProf">{home.informations}</h3>
                    <img src={home.image} />
                    {(function(){
                      console.log("function")
  if(decodedData!=undefined){
    console.log("decoder")
    if(decodedData.id===id){
      console.log("helllo")
      return (

        <>
         <button onClick={()=>{deleteHome(home._id)}}>Delete</button>
                    <button  onClick={(e)=>ubdate(e,home)}>ubdate</button>
                    <button  className="hostProf">Post</button> 
              </>     
                    )
                    }}})()}         
      </div>

      )
            }


      )}

      {(function(){
                      console.log("function")
  if(decodedData!=undefined){
    console.log("decoder")
    if(decodedData.id===id){
      console.log("helllo")
      return (

        <>
    
                    <form >
        <input placeholder=" Home Image" onChange={(e) =>{setHomeImage(e.target.value)}}/>
        <br />
        <input placeholder="phoneNumber"  onChange={(e) =>{setPhoneNumber(e.target.value)}}/>
        <br />
        <textarea placeholder="description" onChange={(e) =>{setInformations(e.target.value)}}/>
        <br />


        <button>Post</button>
        {enableEdit?<button onClick={(e) =>saveData(e)}>save</button>:<></>}
        
      </form>
       <button onClick={(e) =>changeProfile(e)}>updateProfile</button>
       {enableProfile?
       
      
       <form className="fullcard-container" onSubmit={(e) => postMethod(e)}>
        <input placeholder=" UserName" value={name} onChange={(e) =>{setName(e.target.value)}}/>
        <br />
        <input placeholder="Name" value={userName} onChange={(e) =>{setUserName(e.target.value)}}/>
        <br />
        <input placeholder="Email" value={userEmail} onChange={(e) =>{setUserEmail(e.target.value)}}/>
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) =>{setPassword(e.target.value)}}/>
        <br />
        <input placeholder="UserImage" value={userImage} onChange={(e) =>{setUserImage(e.target.value)}}/>
        <br />
        <button onClick={(e) =>updateProfile(e)}>updateProfile</button>
        </form>
       :<></>}        
        </>
      )
    }
        console.log("decodedData")
console.log(decodedData.id)

       }
})()}
     

       <DatePicker 
       selected ={selectedDate}
       onChange={date =>setSelectedDate(date)}
       dateFormat='dd/MM/yyyy'
       minDate={new Date()}
       isClearable
       showTimeSelect
       timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      >
      
  </DatePicker>
 
  <button  onClick={()=>{booking()}}>booking</button>


  {startDate?.map((data ,index) => (
         
       <div key={index}>
           <h3>{data.date}</h3>
           <h3>Guest :{data.guest.userName}</h3>
           <h3>Host :{data.host.name}</h3>
             <img src={data.host.hostImage}></img> 
           </div>
         
  ))
  }
     
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
        </div>
        </div>
        
    )

          }



export default HostProf
