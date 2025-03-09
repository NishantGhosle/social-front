const postReducer = (
  state = { posts: null, loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    // Existing cases...
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    
    // New cases for comment, update, and delete
    case "COMMENT_START":
      return { ...state, loading: true, error: false };
    case "COMMENT_SUCCESS":
      return { 
        ...state, 
        posts: state.posts.map(post => 
          post._id === action.data._id ? action.data : post
        ),
        loading: false, 
        error: false 
      };
    case "COMMENT_FAIL":
      return { ...state, loading: false, error: true };
    
    case "UPDATE_START":
      return { ...state, loading: true, error: false };
    case "UPDATE_SUCCESS":
      return { ...state, loading: false, error: false };
    case "UPDATE_FAIL":
      return { ...state, loading: false, error: true };
    
    case "DELETE_START":
      return { ...state, loading: true, error: false };
    case "DELETE_SUCCESS":
      return { 
        ...state, 
        posts: state.posts.filter(post => post._id !== action.postId),
        loading: false, 
        error: false 
      };
    case "DELETE_FAIL":
      return { ...state, loading: false, error: true };
    
    default:
      return state;
  }
};

export default postReducer;