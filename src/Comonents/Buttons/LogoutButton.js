import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  const logoutFunction = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <Button variant="outlined" onClick={logoutFunction}>
      Logout
    </Button>
  );
}

export default LogoutButton;
