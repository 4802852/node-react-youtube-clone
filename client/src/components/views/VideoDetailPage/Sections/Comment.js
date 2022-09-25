import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Input, Button } from "antd";

const { TextArea } = Input;

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");

  const handleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variable = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
    };

    axios.post("/api/comment/savecomment", variable).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        props.commentRefresh(response.data.result);
        setCommentValue("");
      } else {
        alert("댓글 등록에 실패했습니다");
      }
    });
  };

  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comments List */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment commentRefresh={props.commentRefresh} comment={comment} postId={props.postId} />
                <ReplyComment commentRefresh={props.commentRefresh} postId={props.postId} parentCommentId={comment._id} commentLists={props.commentLists} />
              </React.Fragment>
            )
        )}

      {/* Root Comments Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea style={{ width: "100%", borderRadius: "5px" }} onChange={handleChange} value={CommentValue} placeholder="코멘트를 작성해주세요" />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comment;
