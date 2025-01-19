import { useMutation } from "@tanstack/react-query";
import { requestnewcode as requestnewcodeApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useRequestNewCode() {
  const { mutate: requestNewCode } = useMutation({
    mutationFn: () => requestnewcodeApi(),
    onSuccess: (data) => {
      toast.success(`${data.msg} `);
    },
    onError: (err) => {
      const errorMessage = err.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { requestNewCode };
}
