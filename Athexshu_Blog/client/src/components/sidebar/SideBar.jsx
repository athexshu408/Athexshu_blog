import React, { useEffect, useState ,useContext } from 'react'

import { Context } from '../../context/Context'
import "./sidebar.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SideBar({handleButtonClick,userData}) {
  console.log("userData:", userData);
  const [cats, setCats] = useState([]);

  const [profileInfo, setProfileInfo] = useState({});

  const PF = "http://localhost:5000/images/";
  const {user,dispatch} = useContext(Context);
  const handleLogout = ()=> {
    dispatch({type:"LOGOUT"});
  }

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCats(res.data)
    };
    const getProfileInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user._id}`);
        setProfileInfo(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    getCats();
    getProfileInfo();
  }, [user._id])

  


  return (
    <div className='sidebar'>

      <div className="sidebarItem">

        <span className="sidebarTitle">ABOUT ME <button className='sTI' onClick={handleButtonClick}>
        <i class="fa-solid fa-gear"></i></button></span>

      {/*  <img src={PF+user.pic} alt="" className="sidebarImg" />*/}
        {userData ? (
          // Use userData if available (single post page)
          <img
          src={userData && userData.pic ? PF + userData.pic : 'data:image/png;base64,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'}
          alt=""
          className="sidebarImg"
        />
        ) : (
          // Fall back to user.desc if userData is not available (home page)
          <img
          src={user && user.pic ? PF + user.pic : 'data:image/png;base64,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'}
          alt=""
          className="sidebarImg"
        />
        )}


        {userData ? (
          // Use userData if available (single post page)
          <p>{userData.desc}</p>
        ) : (
          // Fall back to user.desc if userData is not available (home page)
          <p>{profileInfo.desc}</p>
        )}
       

      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className='sidebarList'>
          {cats.map((c) => (
            <Link className="link" to={`/?cat=${c.name}`}>
              <li className="sidebarListItems">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
        {userData?(  <a href={userData.facebook} target="_blank" rel="noopener noreferrer">
          <i className="sidebarIcon fa-brands fa-facebook"></i></a> ):(
        <a href={profileInfo.facebook} target="_blank" rel="noopener noreferrer">
          <i className="sidebarIcon fa-brands fa-facebook"></i></a>
         )}
          {userData?(  <a href={userData.insta} target="_blank" rel="noopener noreferrer"> 
          <i className="sidebarIcon fa-brands fa-square-instagram"></i></a>):(
          <a href={profileInfo.insta} target="_blank" rel="noopener noreferrer"> 
          <i className="sidebarIcon fa-brands fa-square-instagram"></i></a>
          )}
             {userData?( <a href={userData.linkedIn} target="_blank" rel="noopener noreferrer"> 
          <i className="sidebarIcon fa-brands fa-pinterest"></i></a> ):(
          <a href={profileInfo.linkedIn} target="_blank" rel="noopener noreferrer"> 
          <i className="sidebarIcon fa-brands fa-pinterest"></i></a>
          )}
           {userData?( <a href={userData.github} target="_blank" rel="noopener noreferrer">
          <i className="sidebarIcon fa-brands fa-github"></i></a>):(
          <a href={profileInfo.github} target="_blank" rel="noopener noreferrer">
          <i className="sidebarIcon fa-brands fa-github"></i></a>
           )}

        </div>
      </div>
    </div>
  )
}
