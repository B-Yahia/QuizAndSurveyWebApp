import { Alert } from "@mui/material";
import React from "react";

function WarningMessage({ msg }) {
  return <Alert severity="warning">{msg}</Alert>;
}

export default WarningMessage;
