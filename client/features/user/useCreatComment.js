import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { creatCommentApi } from "../../services/apiUser";
export function useCreatcommment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createComent, isPending } = useMutation({
    mutationFn: (Obj) => creatCommentApi(Obj),
    onSuccess: (data) => {
      queryClient.setQueryData(["comments"], data);
      queryClient.invalidateQueries(["friendPosts"]);

      queryClient.invalidateQueries(["allUserPosts"]);
      toast.success(`success`);
      navigate("/viewallfriendposts");
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { createComent, isPending };
}
