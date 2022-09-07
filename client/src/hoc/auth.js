import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../_actions/user_action";

export default function _auth(SpecificComponent, option, adminRoute = null) {
  // options
  // null: 아무나 출입 가능한 페이지
  // true: 로그인한 유저만 출입 가능한 페이지
  // false: 로그인한 유저는 접근 안되는 페이지

  function AuthentificationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(userAuth()).then((response) => {
        // console.log(response);
        // 로그인하지 않은 상태
        if (!response.payload.isAuth) {
          // window.localStorage.clear();
          if (option) {
            alert("로그인이 필요합니다.");
            navigate("/login");
          }
        } else {
          // window.localStorage.setItem("loginSuccess", response.payload.isAuth);
          // window.localStorage.setItem("userId", response.payload._id);
          // window.localStorage.setItem("userName", response.payload.name);

          // 로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            // 관리자만 들어갈 수 있는 페이지 접속시
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    });
    return <SpecificComponent />;
  }

  return AuthentificationCheck;
}
