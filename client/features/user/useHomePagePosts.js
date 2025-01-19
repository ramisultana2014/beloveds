import { useQuery } from "@tanstack/react-query";
import { HomePagePostsApi } from "../../services/apiUser";
export function useHomePagePosts() {
  const {
    isLoading,
    data: homePagePosts,
    error,
  } = useQuery({
    queryKey: ["homepage"],
    queryFn: () => HomePagePostsApi(),
  });
  return { homePagePosts, isLoading, error };
}
