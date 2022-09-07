import axios from "axios";
import React, { useEffect, useState } from "react";
import "./favorite.css";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  const variable = {
    userFrom: localStorage.getItem("userId"),
  };

  useEffect(() => {
    fetchFavoredMovie();
    // eslint-disable-next-line
  }, []);

  const renderFavorite = Favorites.map((favorite, index) => {
    const content = <div>{favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} alt="No Data" /> : "No Image"}</div>;
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRuntime}</td>
        <td>
          <button onClick={() => onClickRemove(favorite.movieId, favorite.userFrom)}>Remove</button>
        </td>
      </tr>
    );
  });

  const onClickRemove = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    axios.post("/api/favorite/removefavorite", variables).then((response) => {
      if (response.data.success) {
        fetchFavoredMovie();
      } else {
        alert("리스트에서 지우는데 실패했습니다.");
      }
    });
  };

  const fetchFavoredMovie = () => {
    axios.post("/api/favorite/getfavoredmovies", variable).then((response) => {
      //   console.log(response);
      if (response.data.success) {
        setFavorites(response.data.favorites);
      } else {
        alert("영화 정보를 가져오는데 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove from Favorites</td>
          </tr>
        </thead>
        <tbody>{renderFavorite}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
