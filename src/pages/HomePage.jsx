import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../context/AppContext";

const HomePage = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) navigate(`/dashboard/${currentUser.role}`);
    else navigate("/login");
  }, [currentUser, navigate]);
  return <div>Loading...</div>;
};

export default HomePage;
