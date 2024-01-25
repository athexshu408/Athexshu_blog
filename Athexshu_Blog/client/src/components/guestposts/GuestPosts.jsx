import React from 'react';
import "./guestposts.css";
import Post from '../post/Post';

export default function GuestPosts({ guestpost }) {
  return (
    <div className='GuestPosts'>
      {guestpost && guestpost.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
