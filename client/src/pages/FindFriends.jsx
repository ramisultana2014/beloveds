import styled from "styled-components";
import { useSearchForFriends } from "../../features/user/useSearchForFriends";
import { Spinner, OthersUsers, UserFriends } from "../components";
import Wrapper from "../assets/wrapper/searchForFriends";

function FindFriends() {
  const { isLoading, data, error } = useSearchForFriends();
  if (isLoading) return <Spinner />;
  //console.log(data.others);
  if (error) return <p> {error.message}</p>;
  return (
    <Wrapper>
      <div>
        {data.friends.map((user) => (
          <UserFriends key={user._id} friend={user} />
        ))}
      </div>
      <div>
        {data.others.map((user) => (
          <OthersUsers key={user._id} user={user} />
        ))}
      </div>
    </Wrapper>
  );
}

export default FindFriends;
