import React, { useState, useContext } from 'react';
import "./sideform.css"
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Sideform({ onBackToSidebar }) {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [facebook, setFacebook] = useState("");
  const [insta, setInsta] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type:"UPDATEFORM_START"})
    setLoading(true);
    setError(null);
    try {
      const updatedUser = {
        userId: user._id,
        desc,
        facebook,
        insta,
        github,
        linkedIn,
      };

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.pic = filename;

        await axios.post("http://localhost:5000/api/upload", data);
      }

      const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser);
     
     
      setSuccess(true);
      dispatch({ type: "UPDATEFORM_SUCCESS", payload: response.data });
      
      console.log("User updated successfully:", response.data);
   
    } catch (error) {
      console.error("Error updating user:", error);
      setError("An error occurred. Please try again.");
      dispatch({ type: "UPDATEFORM_FAILURE" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const setUser = (e) => {
    setUser((prev) => ({ ...prev, [(e).target.name]: (e).target.value}));
  };
  


  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFacebook(newName);
  };
    

    
    const handleFacebookChange = (e) => {
      const newFacebook = e.target.value;
      setFacebook(newFacebook);
    };
  
    const handleInstaChange = (e) => {
      const newInsta = e.target.value;
      setInsta(newInsta);
    };
  
    const handleGithubChange = (e) => {
      const newGithub = e.target.value;
      setGithub(newGithub);
    };
  
    const handleLinkedInChange = (e) => {
      const newLinkedIn = e.target.value;
      setLinkedIn(newLinkedIn);
    };
    const iconColorName = desc.length > 10 ? 'red' : 'black';
    const iconColorFacebook = facebook.length > 10 ? 'red' : 'black';
    const iconColor = insta.length > 10 ? 'red' : 'black';
    const iconColorGithub = github.length > 10 ? 'red' : 'black';
    const iconColorLinkedIn = linkedIn.length > 10 ? 'red' : 'black';
     

  return (
    <div className="sideform" style={{ flex: 3 }}>
       
       <button className="tbtn" onClick={onBackToSidebar}><i className="tbtn fa-regular fa-circle-left"></i></button>


       <form className="sideformitem" onSubmit={handleSubmit}>
      <div className="settingsformPP">

      
        <label style={{alignItems:'center'}}className='settingsPP' htmlFor="fileInput">
          <img className='settingsPPimg'src= {file ? URL.createObjectURL(file) : PF + user.pic}  alt="" />

        </label>

        <input type="file" id='fileInput' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
      </div>

      

        <input  className='sfinput'
          type="text" 
          
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Lines About u"
        /><i className=" sideIcon fa-regular fa-square-check" style={{ color:iconColorName}}></i>

      
        <input className='sfinput'
          type="text"
          placeholder={user.facebook}
         onChange={e => setFacebook(e.target.value)}
         
          /><i className={`sideIcon fa-brands fa-facebook`}style={{ color:iconColorFacebook}}></i>
          
        <input className='sfinput'
          type="text"
          onChange={(e) => setInsta(e.target.value)}
          placeholder={user.insta}
        /> <i className={`sideIcon fa-brands fa-square-instagram`} style={{ color: iconColor }}> </i>
     
        <input className='sfinput'
          type="text"  
            onChange={(e) => setGithub(e.target.value)}
          placeholder={user.github}
        /><i className="sideIcon fa-brands fa-github"style={{ color: iconColorGithub }}></i>

         <input className='sfinput'
          type="text"
          value={user.linkedIn}
           onChange={(e) => setLinkedIn(e.target.value)}
          placeholder={user.linkedIn}
        /><i className="sideIcon fa-brands fa-pinterest"style={{ color: iconColorLinkedIn }}></i>





        <button className='sbtn' type="submit">Submit</button>
        {success && (

<span style={{ color: 'green', marginTop: '20px', textAlign: 'center' }}>Profile has been updated...</span>
)}
        </form>
      
    </div>
  );
}
