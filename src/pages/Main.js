import React, { useEffect } from "react";
import Grid from "../elements/Grid";
import ContentsList from "./ContentsList";
import Permit from "../shared/Permit";
import Button from "../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myLikeDB, disLikeDB } from "./../redux/modules/like";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwt_token");

  return (
    <Grid width={"70%"} margin={"0 auto"}>
      <ContentsList />

      <div style={{ display: "flex", float: "right" }}>
        <Permit>
          <Button
            onClick={() => {
              navigate("/write");
            }}
          >
            글쓰기
          </Button>
        </Permit>
      </div>
    </Grid>
  );
};

export default Main;
