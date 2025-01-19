import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchAllFriendPostsApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useGetAllFriendPosts() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: getAllFriendPosts, isPending } = useMutation({
    mutationFn: (friendObj) => fetchAllFriendPostsApi(friendObj),
    onSuccess: (data) => {
      //console.log(data);
      queryClient.setQueryData(["friendPosts"], data);
      navigate("/viewallfriendposts");
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { getAllFriendPosts, isPending };
}
