import { useQuery } from "@tanstack/react-query";
import { protectedRoutes } from "../../services/apiAuth";

export function useProtectRoute() {
  const { isPending, data, error } = useQuery({
    queryKey: ["rami"],
    queryFn: () => protectedRoutes(),
  });
  //console.log("data", data);
  return { data, isPending, error };
}
