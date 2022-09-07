import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "antd";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRuntime,
  };

  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      //   console.log(response.data);
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
    });
    axios.post("/api/favorite/favorited", variables).then((response) => {
      //   console.log(response.data);
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는데 실패했습니다.");
      }
    });
    // eslint-disable-next-line
  }, []);

  const favoriteToggle = () => {
    if (Favorited) {
      axios.post("/api/favorite/removefavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 제거에 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/favorite/addfavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 추가에 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={favoriteToggle}>
        {Favorited ? "Delete Favorite" : "Add to Favorite"} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
