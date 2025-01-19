import { useMutation, useQueryClient } from "@tanstack/react-query";
import { answerFriendRequestApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useAnswerFriendRequest() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: answer, isPending } = useMutation({
    mutationFn: (answerObj) => answerFriendRequestApi(answerObj),
    onSuccess: (data) => {
      //console.log(data);
      queryClient.invalidateQueries(["friendsRequests"]); // Invalidate all queries
      navigate("/homepage");
      toast.success(`success`);
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { answer, isPending };
}
