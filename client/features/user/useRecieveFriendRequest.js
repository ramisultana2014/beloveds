import { useQuery } from "@tanstack/react-query";
import { recieveFriendRequestApi } from "../../services/apiUser";

export function useRecieveFriendRequest() {
  const {
    isLoading,
    data: request,
    error,
  } = useQuery({
    queryKey: ["friendsRequests"],
    queryFn: () => recieveFriendRequestApi(),
  });
  return { request, isLoading, error };
}
