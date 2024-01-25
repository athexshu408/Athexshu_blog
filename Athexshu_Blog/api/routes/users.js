const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");



router.put("/:id", async (req, res) => {
    if(req.body.userId ===req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },
            {new:true});
            res.status(200).json(updatedUser)
 
 
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("you can update only our acount")
    }
});


router.delete("/:id", async (req, res) => {
    const userIdFromRequest = req.params.id;
    const loggedInUserId = req.body.userId; // Assuming the user ID is coming from the request body
  
    if (loggedInUserId === userIdFromRequest) {
      try {
        const user = await User.findById(userIdFromRequest);
  
        if (!user) {
          return res.status(404).json("User not found!");
        }
  
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(userIdFromRequest);
          res.status(200).json("User has been deleted...");
        } catch (deleteError) {
          console.error("Error deleting user:", deleteError);
          res.status(500).json("Error deleting user");
        }
      } catch (findError) {
        console.error("Error finding user:", findError);
        res.status(500).json("Error finding user");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  });


  //GET USER
router.get("/:id", async (req, res) =>{
try {
  const user = await User.findById(req.params.id);
  const {password, ...others} = user._doc;
res.status(200).json(others);
} catch (err) {
res.status(500).json(err);
}
});



router.get('/username/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send user data as JSON
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

    
       


 module.exports = router;