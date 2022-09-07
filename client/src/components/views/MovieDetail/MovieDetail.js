import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, IMAGE_BASE_URL } from "../../Config";
import { API_KEY } from "../../dev";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";
import { Row } from "antd";

function MovieDetail(props) {
  let { movieId } = useParams();
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  const endpointInfo = `${API_URL}${movieId}?api_key=${API_KEY}`;
  const endpointCrew = `${API_URL}${movieId}/credits?api_key=${API_KEY}`;

  useEffect(() => {
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setMovie(response);
      });
    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setCasts(response.cast);
      });
    // eslint-disable-next-line
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}
      {Movie && <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} title={Movie.original_title} text={Movie.overview} />}
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem("userId")} />
        </div>
        {/* Movie Info */}
        {Movie && <MovieInfo movie={Movie} />}
        <br />
        {/* Actors Grid */}
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((casts, index) => (
                <React.Fragment key={index}>
                  <GridCards Casts image={casts.profile_path ? `${IMAGE_BASE_URL}w500${casts.profile_path}` : null} castsName={casts.name} />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
