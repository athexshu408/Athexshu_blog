const router = require("express").Router();
const User = require("../models/User");

const Post = require("../models/Post");
const { response } = require("express");


router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
 
    }catch(err){
         res.status(500).json(err);
    }
});


//update post 
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post exists
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      // Check if the user making the request is the owner of the post
      if (post.username === req.body.username) {
        try {
          // Use the findByIdAndUpdate method with { new: true } to get the updated post
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
  
          // Check if the update was successful
          if (!updatedPost) {
            return res.status(500).json({ error: "Error updating post" });
          }
  
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json({ error: "Error updating post", details: err });
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json({ error: "Error finding post", details: err });
    }
  });


  router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post exists
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      // Check if the user making the request is the owner of the post
      if (post.username === req.body.username) {
        try {
          // Use the deleteOne method to delete the post
          const deletedPost = await Post.deleteOne({ _id: req.params.id });
  
          // Check if the delete operation was successful
          if (deletedPost.deletedCount === 1) {
            res.status(200).json("Post has been deleted...");
          } else {
            res.status(500).json({ error: "Error deleting post", details: "Post not deleted" });
          }
        } catch (err) {
          res.status(500).json({ error: "Error deleting post", details: err });
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json({ error: "Error finding post", details: err });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    } catch (err) {
    res.status(500).json(err);
    }
    });

  //get methodddd
  router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
    let posts;
    if(username) {
    posts = await Post.find({username})
    } else if(catName) {
    posts =  await Post.find({categories: {
    $in: [catName],
    },
    });
    }else{
      posts = await Post.find();
    }
    res.status(200).json(posts);
    } catch (err) {
    res.status(500).json(err);
    }
    });
  
  module.exports = router;
