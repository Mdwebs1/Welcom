import React from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const Logout= ()=> {
  localStorage.clear();
}


function Nav() {
 


    return (
        <div>
                          <nav>
          <ul className="nav ">
    
             <li className="sidbarNav" >
              <Link to="/ViewHomes" ><HomeIcon  sx={{ fontSize: 40, color: '#000' }}/></Link>
            </li> 
           
            <li>
                <a onClick={Logout} className="Logout">Logout</a>
            </li>

          </ul>
          
        </nav>
        </div>
    )
}

export default Nav
