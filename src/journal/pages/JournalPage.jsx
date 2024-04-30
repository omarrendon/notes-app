import React from "react";
import { JournalLayout } from "../layout/JournalLayout";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { NoteView, NothingSelectedView } from "../view/index";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving } = useSelector(state => state.journal);
  console.log({ isSaving });

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      <NothingSelectedView />
      {/* <NoteView /> */}
      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined />
      </IconButton>
    </JournalLayout>
  );
};
