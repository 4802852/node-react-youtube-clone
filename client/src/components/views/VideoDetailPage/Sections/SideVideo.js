import axios from "axios";
import React, { useEffect, useState } from "react";

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);
  useEffect(() => {
    axios.get("/api/video/getvideos").then((response) => {
      if (response.data.success) {
        setSideVideos(response.data.videos);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
    // eslint-disable-next-line
  }, []);

  const renderSideVideos = SideVideos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div key={index} style={{ display: "flex", marginBottom: "1rem", padding: "0 1rem" }}>
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href={`/video/${video._id}`}>
            <img style={{ width: "100%", height: "100%" }} src={`http://localhost:4000/${video.thumbnail}`} alt="thumbnail" />
          </a>
        </div>
        <div style={{ width: "50%" }}>
          <a style={{ color: "gray" }} href={`/video/${video._id}`}>
            <span style={{ fontSize: "1rem", color: "black" }}>{video.title}</span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }} />
      {renderSideVideos}
    </React.Fragment>
  );
}

export default SideVideo;
