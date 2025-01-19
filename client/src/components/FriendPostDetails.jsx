import { useState } from "react";
import Wrapper from "../assets/wrapper/FriendPostDetails";
import { useCreatcommment } from "../../features/user/useCreatComment";
import CommentDetails from "./CommentDetails";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";

function FriendPostDetails({ post }) {
  const user = useSelector((store) => store.user.user);
  //console.log(post);

  const { createComent, isPending } = useCreatcommment();
  const [comment, setComment] = useState("");
  const [tempComment, setTemComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  function handleComment(e) {
    e.preventDefault();
    //console.log(comment);
    if (comment.length < 2) return;
    const commentObJ = {
      postID: post._id,

      comment,
    };
    createComent(commentObJ);
    setTemComment(comment);
    setComment("");
  }
  return (
    <Wrapper>
      <h3>{post.title}</h3>
      <img loading="lazy" src={post.postImageUrl} alt={post.title} />

      <form onSubmit={handleComment}>
        <input
          name="comment"
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          disabled={isPending}
        />
        <button disabled={isPending} className="btn">
          Comment
        </button>
      </form>
      {post?.postComments?.length > 0 && (
        <button className="btn view" onClick={() => setShowComments((s) => !s)}>
          {showComments ? "hide" : "view comments"}
        </button>
      )}
      {post?.postComments?.length > 0 && showComments ? (
        post.postComments.map((comment) => (
          <CommentDetails key={comment._id} comment={comment} />
        ))
      ) : (
        <></>
      )}
      {tempComment && (
        <div className="commentdetails">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              fetchpriority="high"
            />
          ) : (
            <MdOutlineAccountCircle className="svg" />
          )}
          <div className="text">
            <p>{user?.name}</p>
            <p>{tempComment} </p>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default FriendPostDetails;
