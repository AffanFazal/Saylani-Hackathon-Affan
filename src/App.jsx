import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import { url } from "./utils/url.js";
import axios from "axios";
import Signup from "./Pages/Signup/Signup.jsx";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/Slices/userSlice.jsx";
import VerifyUser from "./Pages/VerifyUser/VerifyUser.jsx";
import ChangePassword from "./Pages/ChangePassword/ChangePassword.jsx";
import UserDashboard from "./Pages/UserDashboard/UserDashboard.jsx";
import LoanRequest from "./Pages/LoanRequest/LoanRequest.jsx";

const api = axios.create({
  baseURL: url,
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const res = await api.get("auth/isUserLoggedIn", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      console.log(res);
      if (res?.data?.message === "User is logged in") {
        dispatch(loginSuccess(res?.data?.data));
      }
    };
    isUserLoggedIn();
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/otp" element={<VerifyUser />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user/dashboard"
            element={
              <UserDashboard
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              setIsSidebarOpen={setIsSidebarOpen}
              />
            } />
            <Route path="/user/loan-req" element={<LoanRequest isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;







// mongodb url mongodb+srv://Affan-admin:<db_password>@cluster0.sfp3i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0