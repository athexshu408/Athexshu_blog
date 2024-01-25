import React from 'react';
import { Link } from 'react-router-dom';
import "./post.css";

export default function Post({post}) {
  
  console.log('Post Object:', post); // Add this console log to inspect the post object
  const PF = "http://localhost:5000/images/";
  return (
    <div className='post'>
      {post?.photo && (
        <img className="postImg" src={PF+post.photo} alt="" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post?.categories?.map((c) => (
            <span key={c._id} className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post?._id}`} className="link">
          <span className="postTitle">{post?.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {post?.createdAt ? new Date(post.createdAt).toDateString() : 'Unknown Date'}
        </span>
        <span className="postAuthor">
          {post?.username ? `by ${post.username}` : 'Unknown Author'}
        </span>
        {/* Add similar checks for other properties */}
      </div>
      <p className='postDesc'>
        {post?.desc}
      </p>
    </div>
  );
}
