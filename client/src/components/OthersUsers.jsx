import { FaRegUserCircle } from "react-icons/fa";
import { useSendFriendRequest } from "../../features/user/useSendFriendRequest";

function OthersUsers({ user }) {
  //console.log(user);
  const { sendFriendRequest, isPending } = useSendFriendRequest();
  function handleSendFriendRequest() {
    sendFriendRequest({ friendRequestToID: user._id });
  }
  return (
    <div className="info">
      {user?.profilePicture ? (
        <img src={user?.profilePicture} alt={user?.name} />
      ) : (
        <FaRegUserCircle />
      )}
      <p>{user?.name}</p>

      <button
        className="accept"
        onClick={handleSendFriendRequest}
        disabled={isPending}
      >
        send request
      </button>
    </div>
  );
}

export default OthersUsers;
