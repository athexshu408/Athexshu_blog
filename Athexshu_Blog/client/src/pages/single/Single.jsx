import React, { useState, useEffect } from 'react';
import "./single.css";
import SideBar from '../../components/sidebar/SideBar';
import SinglePost from '../../components/singlePost/SinglePost';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Single() {
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const[title,setTitle] = useState("")
  const[desc,setDesc] = useState("")
  const [postData, setPostData] = useState({});
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null); // New state to handle errors

  useEffect(() => {
    const fetchPostData = async () => {
      try {
       
        const res = await axios.get("http://localhost:5000/api/posts/" + path);
        console.log(res.data);
        setPost(res.data);
        setTitle(res.data.title)
        setDesc(res.data.desc)
        const userResponse = await axios.get(`http://localhost:5000/api/users/username/${res.data.username}`);
         setUserData(userResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Update state to reflect the error
        setError(error.message || "An error occurred while fetching data");
      }
    };



    // const userResponse = await axios.get(`http://localhost:5000/api/users/username/${response.data.userData}`);
    // setUserData(userResponse.data);


    fetchPostData();
  }, [path]);

  return (
    <div className='single'>
    
        <>
          <SinglePost postData={post} />
          <SideBar userData={userData} />
        </>
      
    </div>
  );
}
