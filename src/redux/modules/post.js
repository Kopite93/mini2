import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import {
  deleteApi,
  getApi,
  postApi,
  putApi,
  setClient,
} from "../../api/client";
import axios from "axios";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const GETDETAIL = "GETDETAIL";
const DELETE = "DELETE";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const getDetial = createAction(GETDETAIL, (detail) => ({ detail }));
const deletePost = createAction(DELETE, (post) => ({ post }));

const initialState = {
  post: [],
  detail: null,
};

// const addPostSP = (data, image, navigate) => {
//     return function (dispatch, getState) {

//         postApi(
//             "/api/board/regist",
//             data
//         ).then((res) => {
//             console.log(res);
//             postApi('/api/board/photo', {
//                 boardId: res.data.boardId,
//                 file: image
//             }).catch((err) => {
//                 console.log(err)
//                 window.alert("이미지 업로드에 실패했습니다.");
//             })
//             dispatch(addPost(data));
//             navigate('/')
//         }).catch((err) => {
//             console.log(err);
//             window.alert("게시물 작성에 실패했습니다.");
//         });
//     };

const addPostSP = (data, token) => {
  // console.log(data);
  return function (dispatch, getState) {
    const frm = new FormData();

    frm.append("files", data.image, data.image.name);
    frm.append("title", data.title);
    frm.append("content", data.content);
    frm.append("userId", data.userId);
    frm.append("headinfo", data.headinfo);
    frm.append("topinfo", data.topinfo);
    frm.append("bottominfo", data.bottominfo);
    frm.append("shoesinfo", data.shoesinfo);
    for (let value of frm.values()) {
      console.log(data.image.name);
    }

    axios
      .post("http://52.79.228.83:8080/api/board/regist", frm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(
          addPost({ ...data, url: res.data.fileUrl, boardId: res.data.boardId })
        );
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        window.alert("게시물 작성에 실패했습니다.");
      });
    dispatch(addPost(data));
  };
};

const editPostSP = (data, boardId, navigate) => {
  return function (dispatch, getState) {
    const frm = new FormData();
    if (data.image) {
      frm.append("files", data.image, data.image.name);
    }
    frm.append("title", data.title);
    frm.append("content", data.content);
    frm.append("userId", data.userId);
    frm.append("headinfo", data.headinfo);
    frm.append("topinfo", data.topinfo);
    frm.append("bottominfo", data.bottominfo);
    frm.append("shoesinfo", data.shoesinfo);
    putApi(`/api/board/${boardId}`, frm, {
      "Content-Type": "multipart/form-data",
    })
      .then((res) => {
        console.log(res);
        const { post } = getState();
        const editedPostList = post.post.map((item) => {
          if (item.boardId === boardId) {
            return {
              ...item,
              ...res.data,
            };
          }
          return item;
        });
        dispatch(setPost(editedPostList));
        navigate(`/detail/${boardId}`);
      })
      .catch((err) => {
        console.error(err);
        window.alert("게시물 수정에 실패했습니다.");
      });
  };
};

const getPostSp = (userId, token) => {
  return function (dispatch, getState) {
    axios
      .get(`http://52.79.228.83:8080/api/board/1/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setPost(res.data.boardList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getDetailDB = (userId, boardId, token) => {
  return function (dispatch, getState) {
    axios
      .get(`http://52.79.228.83:8080/api/board/detail/${boardId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const detail = res.data;
        dispatch(getDetial(detail));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deletePostSp = (boardId, token, navigate) => {
  return function (dispatch, getState) {
    axios
      .delete(`http://52.79.228.83:8080/api/board/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(deletePost(boardId));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("게시물 삭제에 실패했습니다.");
      });
    dispatch(deletePost(boardId));
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        draft.post.unshift(action.payload.post);
      }),
    [GETDETAIL]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.detail);
        draft.detail = action.payload.detail;
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        console.log(typeof state.post[1].boardId);
        const boardId = action.payload.post;
        console.log(boardId);
        draft.post.filter((item) => item.boardId != boardId);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  addPostSP,
  editPostSP,
  getPostSp,
  getDetailDB,
  deletePostSp,
};

export { actionCreators };
