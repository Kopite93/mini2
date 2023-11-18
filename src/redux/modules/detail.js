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

const GETDETAIL = "GETDETAIL";

const getDetial = createAction(GETDETAIL, (detail) => ({ detail }));

const initialState = {};


const getDetailDB = (userId, boardId, token) => {
  return function (dispatch, getState) {
    console.log(userId, boardId, token);
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




export default handleActions(
  {
    [GETDETAIL]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.detail);
        draft.detail = action.payload.detail;
      }),
  },
  initialState
);

const actionCreators = {
  getDetailDB,
};

export { actionCreators };
