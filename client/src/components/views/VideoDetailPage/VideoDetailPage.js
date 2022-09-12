import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, List } from "antd";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage() {
  const videoId = useParams().videoId;
  const variable = { videoId: videoId };

  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    axios.post("/api/video/getvideodetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오길 실패했습니다.");
      }
    });
    // eslint-disable-next-line
  }, []);

  if (VideoDetail.writer) {
    return (
      <div className="app">
        <Row gutter={[16, 16]}>
          <Col lg={18} sx={24}>
            <div style={{ width: "100%", padding: "3rem 4rem" }}>
              <video style={{ width: "100%" }} src={`http://localhost:4000/${VideoDetail.filePath}`} controls />
              <List.Item actions={[<Subscribe userTo={VideoDetail.writer._id} />]}>
                <List.Item.Meta title={VideoDetail.writer.name} description={VideoDetail.description} />
              </List.Item>
              {/* { Comments } */}
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
