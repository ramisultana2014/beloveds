import { FaRegUserCircle } from "react-icons/fa";
import { useAnswerFriendRequest } from "../../features/user/useAnswerFriendRequest";

function HandleEachFriendRequest({ request }) {
  const { answer, isPending } = useAnswerFriendRequest();
  //console.log(request);
  const { friendRequestFromID } = request;
  //console.log(friendRequestFromID);

  function handleAccept() {
    answer({ RequestFromID: friendRequestFromID._id, requestId: request._id });
  }
  function handleDecline() {
    answer({ requestId: request._id });
  }
  return (
    <div className="info">
      {friendRequestFromID?.profilePicture ? (
        <img
          src={friendRequestFromID?.profilePicture}
          alt={friendRequestFromID?.name}
        />
      ) : (
        <FaRegUserCircle />
      )}
      <p className="infop">{friendRequestFromID?.name}</p>
      <div className="btns">
        <button onClick={handleAccept} disabled={isPending} className="accept">
          Accept
        </button>
        <button
          onClick={handleDecline}
          disabled={isPending}
          className="decline"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default HandleEachFriendRequest;
