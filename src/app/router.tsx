import { createBrowserRouter } from "react-router-dom";
import Step0Phone from "../pages/Step0Phone";
import Step1Role from "../pages/Step1Role";
import Step2Otp from "../pages/Step2Otp";
import Step3Form from "../pages/Step3Form";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  { path: "/", element: <Step0Phone /> },
  { path: "/role", element: <Step1Role /> },
  { path: "/otp", element: <Step2Otp /> },
  { path: "/profile-form", element: <Step3Form /> },
  { path: "/profile", element: <Profile /> },
]);
