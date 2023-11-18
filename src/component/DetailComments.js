import React, { useState, useEffect } from "react";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useNavigate } from "react-router-dom";
import CmtModal from "./CmtModal";

const DetailComments = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [upComment, setUpComment] = useState();
  const [idx, setIdx] = useState();
  const comment = useSelector((state) => state.comment.comment);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const nickname = useSelector((state) => state.user.userInfo.nickname);

  useEffect(() => {
    dispatch(
      commentActions.getCommentSP(id, sessionStorage.getItem("jwt_token"))
    );
  }, []);

  return (
    <>
      {comment.map((cur, idx) => (
        <Grid
          is_flex
          border={"1px solid black"}
          bor_radius
          width={"780px"}
          padding={"20px"}
          height={"120px"}
          margin={"0 auto 20px auto"}
          key={cur.id}
        >
          <Grid>
            <span>{cur.userInfo.nickname}</span>
            <p>{cur.comment}</p>
          </Grid>
          <Grid is_flex width={"280px"}>
            <Button
              width={"120px"}
              bg={"#0D6EFD"}
              visibility={
                nickname === cur.userInfo.nickname ? "visible" : "hidden"
              }
              onClick={() => {
                dispatch(
                  commentActions.deleteCommentSP(
                    cur,
                    sessionStorage.getItem("jwt_token")
                  )
                );
              }}
            >
              삭제
            </Button>
            <Button
              bg={"#0D6EFD"}
              visibility={
                nickname === cur.userInfo.nickname ? "visible" : "hidden"
              }
              onClick={() => {
                setUpComment(cur);
                setIdx(idx);
                setIsOpen(true);
              }}
            >
              수정
            </Button>
          </Grid>
        </Grid>
      ))}

      <CmtModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        commentInfo={upComment}
        idx={idx}
      ></CmtModal>
    </>
  );
};

export default DetailComments;
