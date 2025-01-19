import { FaRegUserCircle } from "react-icons/fa";

function CommentDetails({ comment }) {
  return (
    <div className="commentdetails">
      {comment?.commentOwnerID?.profilePicture ? (
        <img
          src={comment?.commentOwnerID?.profilePicture}
          alt={comment.commentOwnerID?.name}
        />
      ) : (
        <FaRegUserCircle />
      )}
      <div className="text">
        <p>{comment.commentOwnerID.name}</p>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}

export default CommentDetails;
// comment
// :
// "hi"
// commentOwnerID
// :
// id
// :
// "6788f60e614c82270c4528d4"
// name
// :
// "carol"
// _id
// :
// "6788f60e614c
