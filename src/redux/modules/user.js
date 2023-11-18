import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import jwt_decode from "jwt-decode";
import { getApi, postApi, setClient } from "../../api/client";
import axios from "axios";

// 액션 타입
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SIGNUP = "SIGNUP";

// 액션 생성 함수
const logIn = createAction(LOGIN, (userInfo) => ({ userInfo }));
const SignUp = createAction(SIGNUP, (user) => ({ user }));
const logOut = createAction(LOGOUT, (key) => ({ key }));

const initialState = {
  userInfo: {},
};

// 미들 웨어
const SignUpSP = (userId, nickname, pw, checkPw) => {
  return function (dispatch, getState) {
    postApi("/user/signup", {
      username: userId,
      nickname: nickname,
      password: pw,
      passwordCheck: checkPw,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
};

const LoginSP = (userId, pw) => {
  return function (dispatch, getState) {
    postApi("/user/login", {
      username: userId,
      password: pw,
    })
      .then((res) => {
        const token = res.headers.authorization.split(" ")[1];
        const useremail = JSON.parse(atob(token.split(".")[1])).USER_NAME;
        const nickname = JSON.parse(atob(token.split(".")[1])).NICKNAME;
        const userId = JSON.parse(atob(token.split(".")[1])).USER_ID;

        sessionStorage.setItem("jwt_token", token);
        setClient(token);
        dispatch(
          logIn({
            useremail: useremail,
            nickname: nickname,
            userId: userId,
          })
        );
      })
      .catch((err) => console.log(err.response));
  };
};

const LoginCheckSP = (token) => {
  return function (dispatch, getState) {
    axios
      .post(
        `http://52.79.228.83:8080/api/user/info`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const useremail = res.data.username;
        const nickname = res.data.nickname;
        const userId = res.data.userId;
        dispatch(
          logIn({
            useremail: useremail,
            nickname: nickname,
            userId: userId,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const LogOutSP = () => {
  return function (dispatch) {
    getApi("/user/logout")
      .then((res) => {
        console.log(res);
        sessionStorage.removeItem("jwt_token");
        setClient("");
        dispatch(logOut());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = {};
      }),
  },
  initialState
);

const actionCreators = {
  SignUpSP,
  LoginSP,
  LoginCheckSP,
  LogOutSP,
};
export { actionCreators };
