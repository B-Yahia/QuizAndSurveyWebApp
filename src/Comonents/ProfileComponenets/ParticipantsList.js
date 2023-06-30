import { Stack } from "@mui/material";
import React from "react";

function ParticipantsList({ participants }) {
  return (
    <div>
      {participants.map((item, index) => (
        <Stack key={item.id}>
          <div>
            Name : {item.firstName} {item.lastName}
          </div>
          <div>Score : {item.score}</div>
        </Stack>
      ))}
    </div>
  );
}

export default ParticipantsList;
