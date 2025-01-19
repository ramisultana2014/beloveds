import { useGetAllUserPosts } from "../../features/user/useGetAllUserPosts";
import Wrapper from "../assets/wrapper/PersonalPage";
import { Menus, PostDetails, Spinner } from "../components";
function PersonalPage() {
  const { allUserPosts, isLoading, error } = useGetAllUserPosts();
  if (isLoading) return <Spinner />;
  //console.log(error.message);
  if (error) return <p> {error.message}</p>;
  //console.log(allUserPosts);
  return (
    <Menus>
      <Wrapper>
        {allUserPosts.map((post) => (
          <PostDetails post={post} key={post._id} />
        ))}
      </Wrapper>
    </Menus>
  );
}

export default PersonalPage;
