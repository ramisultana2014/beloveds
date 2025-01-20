import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { creatCommentApi } from "../../services/apiUser";
export function useCreatcommment() {
  const queryClient = useQueryClient();
  const { mutate: createComent, isPending } = useMutation({
    mutationFn: (Obj) => creatCommentApi(Obj),
    onSuccess: (data) => {
      queryClient.setQueryData(["comments"], data);
      queryClient.invalidateQueries(["friendPosts"]);
      queryClient.invalidateQueries(["allUserPosts"]);
      toast.success(`success`);
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { createComent, isPending };
}
