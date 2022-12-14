import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, List } from "antd";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikesDislikes from "./Sections/LikesDislikes";

function VideoDetailPage() {
  const videoId = useParams().videoId;
  const variable = { videoId: videoId };

  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    axios.post("/api/video/getvideodetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오길 실패했습니다.");
      }
    });
    axios.post("/api/comment/getcomments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("댓글 정보를 가져오는데 실패했습니다.");
      }
    });
    // eslint-disable-next-line
  }, []);

  const commentRefresh = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  if (VideoDetail.writer) {
    const subscribeButton = VideoDetail.writer._id !== localStorage.getItem("userId") && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem("userId")} />;

    return (
      <div className="app">
        <Row gutter={[16, 16]}>
          <Col lg={18} sx={24}>
            <div style={{ width: "100%", padding: "3rem 4rem" }}>
              <video style={{ width: "100%" }} src={`http://localhost:4000/${VideoDetail.filePath}`} controls />
              <List.Item actions={[<LikesDislikes video userId={localStorage.getItem("userId")} videoId={videoId} />, subscribeButton]}>
                <List.Item.Meta title={VideoDetail.writer.name} description={VideoDetail.description} />
              </List.Item>
              {/* { Comments } */}
              <Comment commentRefresh={commentRefresh} commentLists={Comments} postId={videoId} />
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo />
          </Col>
        </Row>
      </div>
    );
  } else {
    <div className="app">Loading...</div>;
  }
}

export default VideoDetailPage;
