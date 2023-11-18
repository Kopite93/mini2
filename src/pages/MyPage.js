import React, { useEffect } from "react";
import Grid from "../elements/Grid";
import MainPost from "../component/MainPost";
import { myPostDB, myLikedDB } from "./../redux/modules/mypage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const MyPage = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const token = sessionStorage.getItem("jwt_token");

  const myPost = useSelector((state) => state.mypage.boardList);
  console.log(myPost);

  useEffect(() => {
    dispatch(myPostDB(id.userId, 1, token));
  }, []);

  return (
    <>
      <p
        style={{
          width: "885px",
          fontSize: "1.6em",
          // border: "1px solid black",
          margin: "20px auto",
        }}
      >
        내가 쓴 글
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          minWidth: "885px",
          maxWidth: "70%",
          margin: "20px auto",
          flexWrap: "wrap",
          // border: "1px solid black",
        }}
      >
        <div>
          <Grid is_flex>
            {myPost?.map((cur, idx) => {
              return (
                <>
                  {console.log(cur)}
                  <MainPost key={cur?.boardId} {...cur} />
                </>
              );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
};
export default MyPage;
