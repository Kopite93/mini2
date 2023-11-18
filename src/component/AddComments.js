import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostInput from "../elements/PostInput";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import { useParams } from "react-router";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useNavigate } from "react-router-dom";

const AddComments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const userinfo = useSelector((state) => state.user.userInfo);

  const [comment, setComment] = useState();

  const info = {
    boardId: id,
    comment: comment,
    userId: userinfo.userId,
    userInfo: {
      nickname: userinfo.nickname,
      username: userinfo.useremail,
    },
  };

  const addComment = () => {
    dispatch(
      commentActions.addCommentSP(info, sessionStorage.getItem("jwt_token"))
    );
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px auto",
        border: "1px solid black",
        borderRadius: "10px",
        width: "780px",
      }}
    >
      <PostInput
        width={"500px"}
        height={"100px"}
        margin={"0 0 0 10px"}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></PostInput>
      <Button bg={"#0D6EFD"} onClick={addComment}>
        작성하기
      </Button>
    </div>
  );
};

export default AddComments;
