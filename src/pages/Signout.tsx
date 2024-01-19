import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();
  const token = localStorage.removeItem("token");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("./");
    }
  }, [token]);

  return (
    <>
      <h1>Signout</h1>
    </>
  );
};

export default Signout;
