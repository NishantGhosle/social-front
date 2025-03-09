import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
    throw error;
  }
};

export const addComment = (id, commentData) => async (dispatch) => {
  dispatch({ type: "COMMENT_START" });
  try {
    const { data } = await PostsApi.addComment(id, commentData);
    dispatch({ type: "COMMENT_SUCCESS", data: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "COMMENT_FAIL" });
    throw error;
  }
};

export const updatePost = (id, postData) => async (dispatch) => {
  dispatch({ type: "UPDATE_START" });
  try {
    const { data } = await PostsApi.updatePost(id, postData);
    dispatch({ type: "UPDATE_SUCCESS", data: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATE_FAIL" });
    throw error;
  }
};

export const deletePost = (id, userId) => async (dispatch) => {
  dispatch({ type: "DELETE_START" });
  try {
    await PostsApi.deletePost(id, userId);
    dispatch({ type: "DELETE_SUCCESS", id: id });
    return true;
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETE_FAIL" });
    throw error;
  }
};