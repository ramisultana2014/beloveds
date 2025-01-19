import { FaRegUserCircle } from "react-icons/fa";
import { useGetAllFriendPosts } from "../../features/user/useGetAllFriendPosts";

function UserFriends({ friend }) {
  //console.log("id", friend._id);
  const { getAllFriendPosts, isPending } = useGetAllFriendPosts();

  function handlegetAllFriendPosts() {
    getAllFriendPosts({ postOwnerID: friend._id });
  }
  return (
    <div className="info">
      {friend?.profilePicture ? (
        <img src={friend?.profilePicture} alt={friend?.name} />
      ) : (
        <FaRegUserCircle />
      )}
      <p>{friend?.name}</p>

      <button
        className="accept"
        onClick={handlegetAllFriendPosts}
        disabled={isPending}
      >
        View Profile
      </button>
    </div>
  );
}

export default UserFriends;
