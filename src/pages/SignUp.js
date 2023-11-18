import React, { useState } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { emailCheck, pwCheck } from "../shared/ValidCheck";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserID] = useState();
  const [nickname, setNickname] = useState();
  const [pw, setPw] = useState();
  const [checkPw, setCheckPw] = useState();

  const signup = () => {
    if (!userId || !nickname || !pw || !checkPw) {
      return window.alert("공백을 채워주세요");
    }
    if (!emailCheck.test(userId)) {
      return window.alert("이메일 형식을 지켜주세요");
    }
    // if (!pwCheck.test(pw)) {
    //   return window.alert("비밀번호 형식을 지켜주세요");
    // }
    if (pw != checkPw) {
      return window.alert("비밀번호 확인을 해주세요");
    } else {
      dispatch(userActions.SignUpSP(userId, nickname, pw, checkPw));
      window.alert("회원가입 완료!");
      navigate("/login");
    }
  };

  console.log(Boolean(userId));
  return (
    <Grid
      width={"660px"}
      border={"2px solid #0D6EFD"}
      margin={"200px auto"}
      height={"600px"}
      bor_radius
    >
      <Grid
        width={"100%"}
        border={"px solid black"}
        margin={"100px auto 100px auto"}
      >
        <Grid
          width={"300px"}
          // border={"1px solid black"}
          height={"30px"}
          margin={"50px auto"}
        >
          <p>이메일</p>
          <Input
            width={"300px"}
            onChange={(e) => setUserID(e.target.value)}
          ></Input>
        </Grid>
        <Grid
          width={"300px"}
          // border={"1px solid black"}
          height={"30px"}
          margin={"50px auto"}
        >
          <p>닉네임</p>
          <Input
            width={"300px"}
            onChange={(e) => setNickname(e.target.value)}
          ></Input>
        </Grid>
        <Grid
          width={"300px"}
          // border={"1px solid black"}
          height={"30px"}
          margin={"50px auto"}
        >
          <p>비밀번호</p>
          <Input
            type={"password"}
            width={"300px"}
            onChange={(e) => setPw(e.target.value)}
          ></Input>
        </Grid>
        <Grid
          width={"300px"}
          type={"password"}
          // border={"1px solid black"}
          height={"30px"}
          margin={"50px auto"}
        >
          <p>비밀번호확인</p>
          <Input
            type={"password"}
            width={"300px"}
            onChange={(e) => setCheckPw(e.target.value)}
          ></Input>
        </Grid>
      </Grid>
      <Button
        bg={"#0D6EFD"}
        width={"55%"}
        margin={"50px auto"}
        onClick={signup}
      >
        회원가입
      </Button>
    </Grid>
  );
};

const InputBox = styled.div`
  margin: -1px auto 0 auto;
  border: 1px solid black;
  width: 55%;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  box-sizing: border-box;
`;

export default SignUp;
