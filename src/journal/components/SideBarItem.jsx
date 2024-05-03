import React, { useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return note.title.length > 17
      ? note.title.substring(0, 17) + "..."
      : note.title;
  }, [note.title]);

  const onSelectActiveNote = note => {
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem disablePadding onClick={() => onSelectActiveNote(note)}>
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
