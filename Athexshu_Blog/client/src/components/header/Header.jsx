import React from 'react'
import "./header.css"

export default function Header() {
  return (
    <div className='header'>
        
       <div className="headerTitles">
           <span className="headerTitleSm">AtheXshu & Friends</span>  
           <span className="headerTitleLg"> Blog</span>
       </div>
       <img className='headerImg' src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fHww" alt="" />
        
    </div>
  )
}
