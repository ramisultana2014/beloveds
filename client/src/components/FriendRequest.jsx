import { LiaUserFriendsSolid } from "react-icons/lia";
import { useRecieveFriendRequest } from "../../features/user/useRecieveFriendRequest";
import { useDispatch } from "react-redux";
import { frRequest } from "../context/userSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function FriendRequest() {
  const dispatch = useDispatch();
  const { request, isLoading, error } = useRecieveFriendRequest();
  // Dispatch the friend request data when it changes
  useEffect(() => {
    if (request) {
      dispatch(frRequest(request));
    }
  }, [request, dispatch]);

  if (isLoading) return <LiaUserFriendsSolid className="svg" />;
  if (error) return <LiaUserFriendsSolid className="svg" />;

  return request ? (
    <Link to="handlefriendrequest">
      <LiaUserFriendsSolid className="svg" />
      <span className="svgspan">{request?.length}</span>
    </Link>
  ) : (
    <LiaUserFriendsSolid className="svg" />
  );
}

export default FriendRequest;
