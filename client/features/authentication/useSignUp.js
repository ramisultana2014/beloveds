import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useSignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (signupObj) => signupApi(signupObj),
    onSuccess: (data) => {
      //console.log(data);
      toast.success(`please check your email`);
      queryClient.setQueryData(["user"], data.newUser);
      navigate("/emailauth", { replace: true });
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { signUp, isPending };
}
