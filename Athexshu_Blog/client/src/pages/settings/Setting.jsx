import React from 'react'
import axios from 'axios';
import { useContext, useState } from 'react'
import "./settings.css"
import SideBar from "../../components/sidebar/SideBar"
import { Context } from '../../context/Context';
export default function Setting() {
  
  
    
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/";
   
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type:"UPDATE_START"})

        try {
            // Create a new post object
            const updatedUser = {
                userId: user._id,
                username, email, password,
            };

            // Check if a file is selected
            if (file) {
                // Create FormData for file upload
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                updatedUser.profilePic = filename;

                // Upload file using axios
                await axios.post("http://localhost:5000/api/upload", data);
            }

            // Create new post using axios
            const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser);


            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: response.data })
            // Log the response for debugging
            console.log("User update successfully:", response.data);


        } catch (error) {
            // Log and handle errors
            console.error("Error creating or uploading post:", error);
            dispatch({ type: "UPDATE_FAILURE"})
            // Optionally show an alert or handle the error in another way
            // alert("An error occurred. Please try again.");
        }
    };









    
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingUpdateTitle">UPDATE YOUR ACCOUNT</span>
                    <span className="settingDeleteTitle">DELETE ACCOUNT</span>
                </div>
                <form action="" className="settingsForm" onSubmit={handleSubmit}>
                    <label htmlFor="">Profile picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />

                        <label htmlFor="fileInput">

                            <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>

                        <input type="file" id='fileInput' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <label >Username</label>
                    <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
                    <label >Email</label>
                    <input type="text" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                    <label >Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type='submit'>Update</button>
                    {success && (

                        <span style={{ color: 'green', marginTop: '20px', textAlign: 'center' }}>Profile has been updated...</span>
                    )}
                </form>

            </div>
            <SideBar />
        </div>
    )
}
