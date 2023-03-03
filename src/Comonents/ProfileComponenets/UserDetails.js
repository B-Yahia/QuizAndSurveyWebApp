import { Paper, Stack, Avatar, Chip } from "@mui/material";
import React from "react";

function UserDetails({ firstName, lastName, username, dob }) {
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  return (
    <Paper className="question">
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={1}
      >
        <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />

        <Chip label={firstName + " " + lastName} />
        <Chip label={"Username : " + username} />

        <Chip label={dob} />
      </Stack>
    </Paper>
  );
}

export default UserDetails;
