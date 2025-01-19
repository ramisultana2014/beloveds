import { useQuery } from "@tanstack/react-query";
import { fetchAllUserPosts } from "../../services/apiUser";
export function useGetAllUserPosts() {
  const {
    isLoading,
    data: allUserPosts,
    error,
  } = useQuery({
    queryKey: ["allUserPosts"],
    queryFn: () => fetchAllUserPosts(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
  return { allUserPosts, isLoading, error };
}
