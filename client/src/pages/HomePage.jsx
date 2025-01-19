import { useHomePagePosts } from "../../features/user/useHomePagePosts";
import { FriendPostDetails, Spinner } from "../components";
import Wrapper from "../assets/wrapper/PersonalPage";
function HomePage() {
  const { homePagePosts, isLoading, error } = useHomePagePosts();
  if (isLoading) return <Spinner />;
  //console.log(error.message);
  if (error) return <p> {error.message}</p>;

  return (
    <Wrapper>
      {homePagePosts.map((post) => (
        <FriendPostDetails post={post} key={post._id} />
      ))}
    </Wrapper>
  );
}

export default HomePage;
