import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost, addComment, updatePost, deletePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePosts } from "../../actions/PostsAction";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(data.likes?.includes(user._id));
  const [likes, setLikes] = useState(data.likes?.length || 0);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(data.desc || "");
  const [editedImage, setEditedImage] = useState(data.image || "");

  const handleLike = async () => {
    try {
      await likePost(data._id, user._id);
      setLiked((prev) => !prev);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (error) {
      console.log("Like failed:", error);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const commentData = {
        comment: comment.trim(),
        userId: user._id,
        username: `${user.firstname} ${user.lastname}`
      };
      
      dispatch(addComment(data._id, commentData))
        .then(() => {
          setComment("");
          // Refresh timeline posts to show the new comment
          dispatch(getTimelinePosts(user._id));
        })
        .catch((error) => {
          console.log("Comment failed:", error);
        });
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      const postData = {
        userId: user._id,
        desc: editedDesc,
        image: editedImage
      };
      
      dispatch(updatePost(data._id, postData))
        .then(() => {
          setIsEditing(false);
          dispatch(getTimelinePosts(user._id));
        })
        .catch((error) => {
          console.log("Edit failed:", error);
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(data._id, { userId: user._id }))
        .then(() => {
          dispatch(getTimelinePosts(user._id));
        })
        .catch((error) => {
          console.log("Delete failed:", error);
        });
    }
  };

  return (
    <div className="Post">
      {data.image && (
        <img
          src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
          alt=""
        />
      )}
      
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
            placeholder="Description"
            className="edit-input"
          />
          <input
            type="text"
            value={editedImage}
            onChange={(e) => setEditedImage(e.target.value)}
            placeholder="Image URL"
            className="edit-input"
          />
        </div>
      ) : (
        <div className="detail">
          <span><b>{data.name}</b></span>
          <span>{data.desc}</span>
        </div>
      )}

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" style={{ cursor: "pointer" }} />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      {data.userId === user._id && (
        <div className="post-actions">
          <button onClick={handleEdit} className="action-button">
            {isEditing ? "Save" : "Edit"}
          </button>
          <button onClick={handleDelete} className="action-button delete">
            Delete
          </button>
        </div>
      )}

      <div className="comments">
        {data.comments?.map((comment, index) => (
          <div key={index} className="comment">
            <b>{comment.username}: </b>
            <span>{comment.comment}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button type="submit" className="comment-button">
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;