const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post("/getlikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, likes });
  });
});

router.post("/getdislikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Dislike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, dislikes });
  });
});

module.exports = router;
