import React, { useContext,useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./singlePost.css"
import { Context } from '../../context/Context';

export default function SinglePost({postData}) {
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const { user } = useContext(Context);
  const[title,setTitle] = useState("")
  const[desc,setDesc] = useState("")
  const[updateMode,setUpdateMode] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts/" + path);
        console.log(res.data);
        setPost(res.data);
        setTitle(res.data.title)
        setDesc(res.data.desc)
      } catch (error) {
        console.error("Error fetching post:", error.message);
        // Handle error (e.g., show an error message to the user)
      }
    };

    getPost();
  }, [path]);
  
  const handleDelete=async()=>{
    try{
    await axios.delete(`http://localhost:5000/api/posts/${post._id}`,{data:{username:user.username},});
    window.location.replace(`/`);

    }catch(err){

    }
  };

  const handleUpdate=async ()=>{
    try{
      await axios.put(`http://localhost:5000/api/posts/${post._id}`,{
      username: user.username,
      title,
      desc,
     } );
     window.location.reload(`http://localhost:5000/api/posts/${post._id}`);

    }catch{

    }
  }

  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        {post.photo &&(
          <img src= {PF +post.photo} alt="" className='singlePostImg' />
          )}{
            updateMode ? <input type='text' value={title} className='singlePostTitleInput' onChange={(e)=>setTitle(e.target.value)}/> :(
          
        <h1 className="singlePostTitle">
         {post.title}
         {post.username === user?.username &&(
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
            <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
          </div>
          )}
        </h1>
            )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">Author: <Link className="link" to={`/?user=${post.username}`}><b>{post.username}</b></Link></span>
          <span className="singlePostDate">{post?.createdAt ? new Date(post.createdAt).toDateString() : 'Unknown Date'}</span>
        </div>
        {updateMode ? (
          <textarea className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/>):(
        <p className='singlePostDesc'>{post?.desc}</p>
        )}
        {updateMode && (
       < button className="singlePostButton"onClick={handleUpdate}>Update</button>)}
      </div>

    </div>
  )
}
