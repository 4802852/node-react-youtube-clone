import React, { useState } from "react";
import { Comment, Button, Input } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const { TextArea } = Input;

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const user = useSelector((state) => state.user);

  const onClickReply = () => {
    setOpenReply(!OpenReply);
  };

  const handleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variable = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    axios.post("/api/comment/savecomment", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        props.commentRefresh(response.data.result);
        setCommentValue("");
        setOpenReply(false);
      } else {
        alert("댓글 등록에 실패했습니다");
      }
    });
  };

  const actions = [
    <span onClick={onClickReply} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment actions={actions} author={props.comment.writer.name} content={props.comment.content} />
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea style={{ width: "100%", borderRadius: "5px" }} onChange={handleChange} value={CommentValue} placeholder="코멘트를 작성해주세요" />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
