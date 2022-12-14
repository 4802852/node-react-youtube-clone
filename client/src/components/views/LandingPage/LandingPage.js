import React, { useEffect, useState } from "react";
import { Card, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [VideoList, setVideoList] = useState([]);
  useEffect(() => {
    axios.get("/api/video/getvideos").then((response) => {
      if (response.data.success) {
        setVideoList(response.data.videos);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
    // eslint-disable-next-line
  }, []);

  const renderCards = VideoList.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img style={{ width: "100%" }} src={`http://localhost:4000/${video.thumbnail}`} alt="thumbnail" />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta title={video.title} description="" />
        <span>{video.writer.name}</span>
        <br />
        <span>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div className="app">
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Title level={2}>Recommended</Title>
        <hr />
        {VideoList && <Row gutter={[32, 16]}>{renderCards}</Row>}
      </div>
    </div>
  );
}

export default LandingPage;
