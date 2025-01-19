import { useQuery } from "@tanstack/react-query";
import { searchFroFriendsApi } from "../../services/apiUser";
import { useParams } from "react-router-dom";

export function useSearchForFriends() {
  const { name } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["friendsSearch", name],
    queryFn: () => searchFroFriendsApi(name),
  });
  return { isLoading, data, error };
}
