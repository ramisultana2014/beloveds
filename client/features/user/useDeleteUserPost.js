import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserPost as deleteUserPostApi } from "../../services/apiUser";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useDeleteUserPost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteUserPost, isPending } = useMutation({
    //in ConfirmDelete.jsx  because we pass value (post._id) not object we can write it like this way
    mutationFn: deleteUserPostApi,
    onSuccess: (data) => {
      toast.success(`${data.msg}`);

      queryClient.invalidateQueries({
        queryKey: ["allUserPosts"],
      });
      navigate("/personalpage", { replace: true });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { deleteUserPost, isPending };
}
