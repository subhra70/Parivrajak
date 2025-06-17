import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Template from "./components/Template.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import OrgSignUp from "./components/OrgSignUp.jsx";
import OrgLogin from "./components/OrgLogin.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import UpdateProfile from "./components/updateForms/UpdateProfile.jsx";
import DestForm from "./components/destForm/DestForm.jsx";
import Explore from "./components/Explore.jsx";
import Details from "./components/card/Details.jsx";
import History from "./components/card/History.jsx";
import OtpInput from "./components/OtpInput.jsx";
import EditPost from "./components/updateForms/EditPost.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Template />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="orgSignup" element={<OrgSignUp />} />
      <Route path="orglogin" element={<OrgLogin />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="updateProfile" element={<UpdateProfile />} />
      <Route path="postcard" element={<DestForm />} />
      <Route path="postCreate" element={<DestForm />} />
      <Route path="explore" element={<Explore />} />
      <Route path="details/:id" element={<Details />} />
      <Route path="history" element={<History />} />
      <Route path="editPost/:id" element={<EditPost />} />
      <Route path="otp" element={<OtpInput />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
