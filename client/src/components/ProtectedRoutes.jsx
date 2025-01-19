import { useProtectRoute } from "../../features/authentication/useProtectRoute";
import { PageNotFound } from "../pages";
import Spinner from "./Spinner";

function ProtectedRoutes({ children }) {
  const { data, isPending, error } = useProtectRoute();
  if (isPending) return <Spinner />;

  if (error) {
    return <PageNotFound errorMessage={error.message} />;
  }

  if (data) return <>{children}</>;
  // Fallback case: nothing to render
  return null; // Renders nothing if no data, error, or loading state
}

export default ProtectedRoutes;
