import React, { useEffect, useState,useContext } from 'react'
import "./home.css"
import Header from '../../components/header/Header'
import SideBar from '../../components/sidebar/SideBar'
import Posts from '../../components/posts/Posts'
import axios from "axios"
import { useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import GuestPosts from '../../components/guestposts/GuestPosts'
import Sideform from '../../components/sideform/Sideform'

export default function  Home() {

const [posts,setPosts] = useState([]);
const { user } = useContext(Context);

const {search} = useLocation();

const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSideformVisible, setIsSideformVisible] = useState(false);

  const handleSidebarButtonClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsSideformVisible(!isSideformVisible);
  };

  const handleFormSubmit = () => {
    // Handle form submission logic
    // ...

    // Reset visibility after submitting the form
    setIsSidebarVisible(true);
    setIsSideformVisible(false);
  };

  const handleBackToSidebar = () => {
    setIsSidebarVisible(true);
    setIsSideformVisible(false);
  };


useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts"+search);
      console.log(res.data); // Log the response to verify data
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, [search]);





  return (
    
      
         <>
         <Header/> 
         <div className='home'>
       {user ? (  <>
            <Posts  posts={posts}/>
            {isSidebarVisible && <SideBar handleButtonClick={handleSidebarButtonClick} />}
            {isSideformVisible && <Sideform onSubmit={handleFormSubmit} onBackToSidebar={handleBackToSidebar} />}
     
            </> ) :( <GuestPosts guestpost={posts}/>)}
            
         </div>
         </>
  );
}
