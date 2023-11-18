import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

//액션 타입
const ADDCOMMENT = "ADDCOMMENT";
const GETCOMMENT = "GETCOMMENT";
const DELETE = "DELETE";
const UPDATE = "UPDATE";

// 액션 생성 함수
const addComment = createAction(ADDCOMMENT, (user) => ({ user }));
const getComment = createAction(GETCOMMENT, (comment) => ({ comment }));
const deleteComment = createAction(DELETE, (commentInfo) => ({ commentInfo }));
const updateComment = createAction(UPDATE, (commentInfo, idx) => ({
  commentInfo,
  idx,
}));

const initialState = { comment: [] };

// 미들웨어
const addCommentSP = (userinfo, token) => {
  return function (dispatch, getState) {
    console.log(userinfo);
    axios
      .post(
        "http://52.79.228.83:8080/api/comment/regist",
        {
            parentId: 0,
          userId: userinfo.userId,
          boardId: userinfo.boardId,
          comment: userinfo.comment,
          parentId: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // dispatch(addComment(userinfo));
      })
      .catch((err) => console.log(err));
  };
};

const getCommentSP = (boardId, token) => {
  return function (dispatch) {
    axios
      .get(`http://52.79.228.83:8080/api/comment/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const post = res.data;
        dispatch(getComment(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteCommentSP = (commentInfo, token) => {
  return function (dispatch) {
    axios
      .delete(`http://52.79.228.83:8080/api/comment/${commentInfo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(deleteComment(commentInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateCommentSP = (commentInfo, token, idx) => {
  return function (dispatch) {
    console.log(commentInfo);
    axios
      .put(
        `http://52.79.228.83:8080/api/comment/${commentInfo.id}`,
        {
          userId: commentInfo.userId,
          boardId: commentInfo.boardId,
          comment: commentInfo.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(updateComment(commentInfo, idx));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const initialComment = {};

// 리듀서
export default handleActions(
  {
    [ADDCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment.unshift(action.payload.user);
      }),
    [GETCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.comment);
        draft.comment = action.payload.comment;
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        console.log(state.comment);
        const index = state.comment.indexOf(action.payload.commentInfo);
        console.log(draft.comment);
        draft.comment.splice(index, 1);
      }),
    [UPDATE]: (state, action) =>
      produce(state, (draft) => {
        const upComment = action.payload.commentInfo;
        const idx = action.payload.idx;
        console.log(state.comment[idx]);
        draft.comment[idx] = upComment;
      }),
  },
  initialState
);

const actionCreators = {
  addCommentSP,
  getCommentSP,
  deleteCommentSP,
  updateCommentSP,
};

export { actionCreators };
