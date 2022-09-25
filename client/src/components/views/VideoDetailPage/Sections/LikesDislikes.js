import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import axios from "axios";

function LikesDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};
  if (props.video) {
    variable = {
      videoId: props.videoId,
      userId: props.userId,
    };
  } else {
    variable = {
      commentId: props.commentId,
      userId: props.userId,
    };
  }

  useEffect(() => {
    axios.post("/api/like/getlikes", variable).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
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
        // console.log(response.data);
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

  const onLike = () => {
    if (LikeAction == null) {
      axios.post("/api/like/uplike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("좋아요에 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/like/unlike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("좋아요 취소에 실패했습니다.");
        }
      });
    }
  };

  const onDislike = () => {
    if (DislikeAction == null) {
      axios.post("/api/like/updislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("싫어요에 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/like/undislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("싫어요 취소에 실패했습니다.");
        }
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <span key="comment-basic-like" style={{ display: "flex" }}>
        <Tooltip title="like">
          <div onClick={onLike}>{LikeAction === "liked" ? <AiFillLike /> : <AiOutlineLike />}</div>
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="commnet-basic-dislike" style={{ display: "flex" }}>
        <Tooltip title="dislike">
          <div onClick={onDislike}>{DislikeAction === "disliked" ? <AiFillDislike /> : <AiOutlineDislike />}</div>
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
      &nbsp;&nbsp;
    </div>
  );
}

export default LikesDislikes;
