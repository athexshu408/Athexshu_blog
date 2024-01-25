const router = require("express").Router();
const Profile = require("../models/Profile");
const Post = require("../models/Post");

router.post("/", async (req, res) => {
    try {
      const newProfile = new Profile(req.body);
      const savedProfile = await newProfile.save();
      res.status(201).json({ data: savedProfile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });




router.put("/:id", async (req, res) => {
    try {
      const updatedProfile = await Profile.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }
  
      res.status(200).json({ data: updatedProfile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;