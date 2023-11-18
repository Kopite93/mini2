import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const MYPOST = "MYPOST";
const MYLIKED = "MYLIKED";

const myPost = createAction(MYPOST, (boardList) => ({ boardList }));
const myLiked = createAction(MYLIKED, () => ({}));

export const myPostDB = (userId, page, token) => {
  return function (dispatch, getState) {
    axios
      .get(`http://52.79.228.83:8080/api/board/myboard/${userId}/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.boardList);
        dispatch(myPost(res.data.boardList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const myLikedDB = (postInfo, token) => {
  return function (dispatch, getState) {
    axios
      .get(
        `http://52.79.228.83:8080/api/board/favoriteboard/${postInfo.userId}/${postInfo.page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [MYPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.boardList = action.payload.boardList;
      }),
    [MYLIKED]: (state, action) => produce(state, (draft) => {}),
  },
  {}
);
