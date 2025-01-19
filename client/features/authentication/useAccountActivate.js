import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateUserAccount as activateUserAccountApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useAccountActivate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: accountActivate, isLoading } = useMutation({
    mutationFn: (obj) => activateUserAccountApi(obj),
    onSuccess: (data) => {
      toast.success(`${data.user.name} your account is  activate`);
      queryClient.setQueryData(["user"], data.user);
      navigate("/homepage", { replace: true });
    },
    onError: (err) => {
      toast.error("please request new code");
    },
  });
  return { accountActivate, isLoading };
}
