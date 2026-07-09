import { useRegistrationStore } from "@/store/registrationStore";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  condition: (
    state: ReturnType<typeof useRegistrationStore.getState>,
  ) => boolean;
  redirectTo: string;
}

export default function ProtectedRoute({
  condition,
  redirectTo,
}: ProtectedRouteProps) {
  const state = useRegistrationStore();
  const isAllowed = condition(state);

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
