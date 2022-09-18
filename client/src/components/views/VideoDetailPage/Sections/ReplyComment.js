import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComment, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    // eslint-disable-next-line
    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
    // eslint-disable-next-line
  }, [props.commentLists]);

  const renderReplyComment = (parentCommentId) =>
    props.commentLists.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment commentRefresh={props.commentRefresh} comment={comment} postId={props.postId} />
            <ReplyComment commentRefresh={props.commentRefresh} commentLists={props.commentLists} parentCommentId={comment._id} />
          </div>
        )}
      </React.Fragment>
    ));

  const handleChange = () => {
    setOpenReplyComment(!OpenReplyComment);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p style={{ fontSize: "14px", margin: "0", color: "gray" }} onClick={handleChange}>
          View {ChildCommentNumber} more comment(s)
        </p>
      )}
      {OpenReplyComment && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
