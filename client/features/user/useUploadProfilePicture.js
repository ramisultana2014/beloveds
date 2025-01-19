import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfilePicture as uploadProfilePictureApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../../src/context/userSlice";

export function useUploadProfilePicture() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: uploadProfilePicture, isPending } = useMutation({
    mutationFn: (imageObj) => uploadProfilePictureApi(imageObj),
    onSuccess: (data) => {
      //console.log(data);
      queryClient.setQueryData(["user"], data.data.updatedUser);
      dispatch(loggedInUser(data.data.updatedUser));
      toast.success(`${data.msg}`);
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { uploadProfilePicture, isPending };
}
