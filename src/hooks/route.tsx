import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import IncomeDetails from "../pages/Income";
import ExpenseDetails from "../pages/Expense";
import User from "../pages/User";
import LoginForm from "../pages/LoginFrom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuNav from "../components/Navbar/MenuNav";
import Signout from "../pages/Signout";

const NavRoute = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const AuthRoutes = [
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/income",
      component: IncomeDetails,
    },
    {
      path: "/expense",
      component: ExpenseDetails,
    },
    {
      path: "/user",
      component: User,
    },
    {
      path: "/signout",
      component: Signout,
    },
  ];

  const UnAuthRoutes = [
    {
      path: "/",
      component: LoginForm,
    },
  ];

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  return (
    <>
      {token && <MenuNav />}
      <Routes>
        {token
          ? AuthRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))
          : UnAuthRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
      </Routes>
    </>
  );
};

export default NavRoute;
