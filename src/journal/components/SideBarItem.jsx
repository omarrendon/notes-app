import React, { useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const SideBarItem = ({ note }) => {
  const newTitle = useMemo(() => {
    return note.title.length > 17
      ? note.title.substring(0, 17) + "..."
      : note.title;
  }, [note.title]);

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
