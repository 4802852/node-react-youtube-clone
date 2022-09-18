import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import axios from "axios";

function LikesDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  useEffect(() => {
    let variable = {};
    if (props.video) {
      variable = {
        videoId: props.videoId,
        userId: props.userId,
      };
    } else {
      variable = {
        commnetId: props.commentId,
        userId: props.userId,
      };
    }
    axios.post("/api/like/getlikes", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setLikes(response.data.likes.length);
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("좋아요 정보를 가져오는데 실패했습니다.");
      }
    });
    axios.post("/api/like/getdislikes", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setDislikes(response.data.dislikes.length);
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("싫어요 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <span key="comment-basic-like" style={{ display: "flex" }}>
        <Tooltip title="like">
          <div onClick>{LikeAction === "liked" ? <AiFillLike /> : <AiOutlineLike />}</div>
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>1</span>
      </span>
      <span key="commnet-basic-dislike" style={{ display: "flex" }}>
        <Tooltip title="dislike">
          <div onClick>{DislikeAction === "disliked" ? <AiFillDislike /> : <AiOutlineDislike />}</div>
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>1</span>
      </span>
    </div>
  );
}

export default LikesDislikes;
