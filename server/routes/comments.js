const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post("/savecomment", (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });
    Comment.find({ _id: comment })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getcomments", (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
