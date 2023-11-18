import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../elements/Grid";
import { actionCreators as userActions } from "../redux/modules/user";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { setClient } from "../api/client";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo.userId);
  const token = sessionStorage.getItem("jwt_token") ? true : false;

  const logout = () => {
    dispatch(userActions.LogOutSP(sessionStorage.getItem("jwt_token")));
    window.alert("로그아웃 완료!");
    navigate("/");
  };

  useEffect(() => {
    dispatch(userActions.LoginCheckSP(sessionStorage.getItem("jwt_token")));
  }, [userInfo?.userId]);

  if (token && userInfo) {
    return (
      <Navbar
        bg="primary"
        variant="dark"
        style={{ width: "100%", height: "120px", fontSize: "1.4em" }}
      >
        <Container>
          <Grid width={"100%"} is_flex>
            <img src={"img/logo.png"} style={{ height: "120px" }} />
            <Grid is_flex>
              {/* <Navbar.Brand href="/">Hang 9</Navbar.Brand> */}
              <Nav className="me-auto">
                <Grid is_flex>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate(`/mypage/${userInfo?.userId}`);
                    }}
                  >
                    내 정보
                  </Nav.Link>
                  <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Grid>
              </Nav>
            </Grid>
          </Grid>
        </Container>
      </Navbar>
    );
  }
  return (
    <Navbar
      bg="primary"
      variant="dark"
      style={{ width: "100%", height: "120px", fontSize: "1.4em" }}
    >
      <Container>
        <Grid width={"100%"} is_flex>
          <img src={"img/logo.png"} style={{ height: "120px" }} />
          <Grid is_flex>
            {/* <Navbar.Brand href="/">Hang 9</Navbar.Brand> */}
            <Nav className="me-auto">
              <Grid is_flex>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/signup">회원가입</Nav.Link>
                <Nav.Link href="/login">로그인</Nav.Link>
              </Grid>
            </Nav>
          </Grid>
        </Grid>
      </Container>
    </Navbar>
  );
};

export default Header;
