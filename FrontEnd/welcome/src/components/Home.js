import React from 'react'
import {Link} from 'react-router-dom'
import Animation from './Animation'


// import SignUp from '../components/SignUp'

function Home() {
    return (
        <div>
          <Animation/>
        <div className="home" >
  

     <h2 data-text="أرحب..">أرحب ...</h2><br/><br/>
   
    
     
        </div>
        <div className="button-div"> <button className="btn-home"><ul>  <li>
              <Link to="/SignUp">SignUp</Link>
            </li> </ul></button>
     <button className="btn-home"><ul>  <li>
              <Link to="/LogIn">SignIn</Link>
            </li> </ul></button></div>
     </div>
    )
}

export default Home
