import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost as createPostApi } from "../../services/apiUser";
import toast from "react-hot-toast";
export function useCreatePost() {
  const queryClient = useQueryClient();
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: (formData) => createPostApi(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allUserPosts"]); // Invalidate specific query
      toast.success(`${data.msg}`);
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { createPost, isPending };
}
