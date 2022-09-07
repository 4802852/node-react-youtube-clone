import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

const initialState = {
  isLoggedIn: false,
};

export default function user_reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    case AUTH_USER:
      return { ...state, isLoggedIn: action.payload.isAuth, userData: action.payload };

    default:
      return state;
  }
}
