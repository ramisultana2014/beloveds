import { useSelector } from "react-redux";
import Wrapper from "../assets/wrapper/searchForFriends";
import HandleEachFriendRequest from "../components/HandleEachFriendRequest";
function HandleFriendRequest() {
  const frequests = useSelector((store) => store.user.requests);
  //console.log(frequests[0]);

  return (
    <Wrapper>
      {frequests[0]?.map((request) => (
        <HandleEachFriendRequest key={request._id} request={request} />
      ))}
    </Wrapper>
  );
}

export default HandleFriendRequest;
