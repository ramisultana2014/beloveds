import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logIn, isPending } = useMutation({
    mutationFn: (loginObj) => loginApi(loginObj),
    onSuccess: (data) => {
      //console.log(data.data.user);
      toast.success(`${data.msg}`);
      queryClient.setQueryData(["user"], data.data.user);
      navigate("/homepage", { replace: true });
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { logIn, isPending };
}
