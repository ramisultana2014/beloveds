import { useMutation } from "@tanstack/react-query";
import { forgetPassword as forgetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useForgetPassword() {
  const navigate = useNavigate();

  const { mutate: forgetPassword, isPending } = useMutation({
    mutationFn: (Obj) => forgetPasswordApi(Obj),
    onSuccess: () => {
      //console.log(data);
      toast.success(`password updated successfully`);
      navigate("/homepage", { replace: true });
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { forgetPassword, isPending };
}
