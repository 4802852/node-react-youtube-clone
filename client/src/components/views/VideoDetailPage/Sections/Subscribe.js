import axios from "axios";
import React, { useEffect, useState } from "react";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  let subscribeNumVariable = { userTo: props.userTo };
  let subscribeInfoVariable = { userTo: props.userTo, userFrom: props.userFrom };

  useEffect(() => {
    axios.post("/api/subscribe/subscribenumber", subscribeNumVariable).then((response) => {
      if (response.data.success) {
        // console.log(response);
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다.");
      }
    });
    axios.post("/api/subscribe/subscribed", subscribeInfoVariable).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        setSubscribed(response.data.subscribed);
      } else {
        alert("구독 정보를 받아오지 못했습니다.");
      }
    });
    // eslint-disable-next-line
  }, []);

  const onSubscribe = () => {
    if (Subscribed) {
      axios.post("/api/subscribe/unsubscribe", subscribeInfoVariable).then((response) => {
        if (response.data.success) {
          // console.log(response.data);
          setSubscribeNumber(SubscribeNumber - 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독 취소에 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/subscribe/dosubscribe", subscribeInfoVariable).then((response) => {
        if (response.data.success) {
          // console.log(response.data);
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독에 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          border: "0px",
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
