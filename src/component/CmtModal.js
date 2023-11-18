import React, { useState, useEffect } from "react";
import Modal from "react-modal/lib/components/Modal";
import PostInput from "../elements/PostInput";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const CmtModal = (props) => {
  console.log(props.idx);
  const { isOpen, setIsOpen, commentInfo } = props;
  const [comment, setComment] = useState();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwt_token");
  const update = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        style={{
          overlay: { margin: "auto" },
          content: {
            width: "820px",
            height: "400px",
            margin: "auto",
            border: "2px solid black",
          },
        }}
      >
        <Grid
          // border={"1px solid black"}
          width={"660px"}
          height={"150px"}
          margin={"60px auto -20px auto"}
        >
          <PostInput
            onChange={update}
            defaultValue={commentInfo?.comment}
            width={"600px"}
            height={"80px"}
            margin={"auto"}
          >
            {commentInfo?.userInfo?.nickname}
          </PostInput>
        </Grid>
        <Grid is_flex width={"300px"} margin={"0 auto"}>
          <Button
            bg={"#0D6EFD"}
            onClick={() => {
              console.log({ ...commentInfo, comment: comment });
              dispatch(
                commentActions.updateCommentSP(
                  { ...commentInfo, comment: comment },
                  token,
                  props.idx
                )
              );
              setIsOpen(false);
            }}
          >
            수정
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            bg={"#0D6EFD"}
          >
            취소
          </Button>
        </Grid>
      </Modal>
    </>
  );
};

export default CmtModal;
