import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import "./topbar.css"
import { Link } from 'react-router-dom'
const PF = "http://localhost:5000/images/";

export default function TopBar() {

  const {user,dispatch} = useContext(Context);
  const handleLogout = ()=> {
    dispatch({type:"LOGOUT"});
  }

  return (
    <div className='top'>

        <div className="TopLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-pinterest"></i>
        <i className="topIcon fa-brands fa-discord"></i>
        </div>
        <div className="TopCenter">
            <ul className="topList">
                <li className='topListItem'><Link className='link' to="/">HOME </Link></li>
                <li className='topListItem'><Link className='link' to="/about">ABOUT</Link></li>
                <li className='topListItem'><Link className='link' to="">CONTACT</Link></li>
                <li className='topListItem'><Link className='link' to="/write">WRITE</Link></li>
                <li className='topListItem' onClick={handleLogout}>{user && "LOGOUT"}</li>
            </ul>
        </div>
        <div className="TopRight">


          {
            user ? (
              <Link className='link' to="/setting">
              <img className="topImg" src={PF+user.profilePic} alt="" /></Link>
            ) :(
              <ul className="topList">
                <li className='topListItem'><Link className='link' to="/login">LOGIN</Link></li>
                <li className='topListItem'><Link className='link' to="/register">REGISTER</Link></li>
                </ul>
            )
          }
         
           
          <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        
        </div>
    
    
    
    
    </div>
  )
}
