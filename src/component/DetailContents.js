import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";
import DetailComments from "./DetailComments";
import AddComments from "./AddComments";
import Button from "./../elements/Button";

import { useNavigate } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/detail";
import { actionCreators as userActions } from "../redux/modules/post";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const DetailContents = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id, userId } = params;
  const token = sessionStorage.getItem("jwt_token");
  const userInfo = useSelector((state) => state.user.userInfo);
  const detail = useSelector((state) => state.post.detail);
  console.log(detail);

  const deletePost = () => {
    dispatch(userActions.deletePostSp(id, token, navigate));
  };

  useEffect(() => {
    dispatch(postActions.getDetailDB(userInfo.userId, id, token));
    console.log(userInfo.userId);
  }, [userInfo?.userId]);

  return (
    <HeadLine>
      <div
        style={{
          width: "1000px",
          margin: "0px auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <Text size={"1.2em"} margin={"60px 20px 0px auto"}>
            {detail?.userinfo?.nickname}
          </Text>
          <Text size={"1.2em"} margin={"60px auto"}>
            {detail?.createdAt}
          </Text>
        </div>
        <div>
          <Grid is_flex width={"200px"} height={"50px"} margin={"40px auto"}>
            <Button
              visibility={
                userInfo.userId === parseInt(userId) ? "visible" : "hidden"
              }
              width={"80px"}
              bg={"#0D6EFD"}
            >
              수정
            </Button>
            <Button
              visibility={
                userInfo.userId === parseInt(userId) ? "visible" : "hidden"
              }
              onClick={deletePost}
              width={"80px"}
              bg={"#0D6EFD"}
            >
              삭제
            </Button>
          </Grid>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid slateblue",
            width: "1000px",
            margin: "0 auto",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              width={"660px"}
              // border={"1px solid black"}
              src={detail?.url}
            />
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Text>
              {console.log(detail)}
              <p>모자 브랜드 : {detail?.headinfo ? detail.headinfo : "없음"}</p>
              <p>상의 브랜드 : {detail?.topinfo ? detail.topinfo : "없음"}</p>
              <p>
                하의 브랜드 : {detail?.bottominfo ? detail.bottominfo : "없음"}
              </p>
              <p>
                신발 브랜드 : {detail?.shoesinfo ? detail.shoesinfo : "없음"}
              </p>
              <p
                style={{
                  margin: "5px auto",
                  width: "300px",
                  wordWrap: "breakWord",
                }}
              >
                {detail?.content}
              </p>
            </Text>
          </div>
        </div>
        <div style={{ margin: "auto" }}>
          <Grid padding="16px">
            <AddComments />
            <DetailComments />
          </Grid>
        </div>
      </div>
    </HeadLine>
  );
};

export default DetailContents;

const HeadLine = styled.div`
  position: relative;
  margin: auto;
  max-width: 80%;
`;
