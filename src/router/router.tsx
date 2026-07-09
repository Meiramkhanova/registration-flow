import Profile from "@/pages/Profile";
import Step0Phone from "@/pages/Step0Phone";
import Step1Role from "@/pages/Step1Role";
import Step2Otp from "@/pages/Step2Otp";
import Step3Form from "@/pages/Step3Form";
import ProtectedRoute from "@/router/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/", element: <Step0Phone /> },
  { path: "/role", element: <Step1Role /> },

  {
    element: <ProtectedRoute condition={(s) => !!s.phone} redirectTo="/" />,
    children: [{ path: "/otp", element: <Step2Otp /> }],
  },

  {
    element: <ProtectedRoute condition={(s) => s.otpVerified} redirectTo="/" />,
    children: [{ path: "/profile-form", element: <Step3Form /> }],
  },

  {
    element: <ProtectedRoute condition={(s) => !!s.email} redirectTo="/" />,
    children: [{ path: "/profile", element: <Profile /> }],
  },
]);
