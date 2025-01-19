import { useQueryClient } from "@tanstack/react-query";
import { FriendPostDetails } from "../components";
import Wrapper from "../assets/wrapper/PersonalPage";

function ViewAllFriendPosts() {
  const queryClient = useQueryClient();
  const friendPosts = queryClient.getQueryData(["friendPosts"]);
  //console.log(friendPosts);
  return (
    <Wrapper>
      {friendPosts.map((post) => (
        <FriendPostDetails post={post} key={post._id} />
      ))}
    </Wrapper>
  );
}

export default ViewAllFriendPosts;
