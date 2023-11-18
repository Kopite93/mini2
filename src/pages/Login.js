import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserID] = useState(null);
  const [pw, setPw] = useState(null);

  const login = () => {
    dispatch(userActions.LoginSP(userId, pw));
    window.alert("로그인 성공!");
    navigate("/");
  };

  return (
    <Grid
      width={"660px"}
      border={"2px solid #0D6EFD"}
      margin={"200px auto"}
      height={"600px"}
      bor_radius
    >
      <Grid width={"250px"} margin={"127.5px auto"}>
        <Grid width={"250px"} margin={"25px auto"}>
          <p>이메일</p>
          <Input
            width={"250px"}
            onChange={(e) => {
              setUserID(e.target.value);
            }}
          ></Input>
        </Grid>
        <Grid width={"250px"} margin={"25px auto"}>
          <p>비밀번호</p>
          <Input
            width={"250px"}
            type={"password"}
            onChange={(e) => {
              setPw(e.target.value);
            }}
          ></Input>
        </Grid>
      </Grid>
      <Grid
        is_flex
        // border={"1px solid black"}
        width={"250px"}
        margin={"-50px auto 5px auto"}
      >
        <Button
          onClick={() => {
            navigate("/signup");
          }}
          bg={"#0D6EFD"}
        >
          회원가입
        </Button>
        <Button bg={"#0D6EFD"} onClick={login}>
          로그인
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
