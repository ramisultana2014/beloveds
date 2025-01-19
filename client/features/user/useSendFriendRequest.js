import { useMutation } from "@tanstack/react-query";
import { sendFriendRequestApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useSendFriendRequest() {
  const navigate = useNavigate();
  //const queryClient=useQueryClient()
  const { mutate: sendFriendRequest, isPending } = useMutation({
    mutationFn: (idObj) => sendFriendRequestApi(idObj),
    onSuccess: (data) => {
      //queryClient.setQueryData(['friendRequest'])
      toast.success(`${data.msg}`);
      navigate("/homepage");
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { sendFriendRequest, isPending };
}
