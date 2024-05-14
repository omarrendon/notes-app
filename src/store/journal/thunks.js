import { FirebaseDB } from "../../firebase/config";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNote,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const doc = await addDoc(
      collection(FirebaseDB, `${uid}`, "journal/notes"),
      {
        ...newNote,
      }
    );
    newNote.id = doc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const notes = await loadNotes(uid);
    dispatch(setNote(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    if (!note.url) {
      delete noteToFireStore.url;
    }
    const firestoreDoc = doc(
      FirebaseDB,
      `${uid}`,
      "journal",
      "notes",
      `${note.id}`
    );
    await setDoc(firestoreDoc, noteToFireStore);
    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async dispatch => {
    dispatch(setSaving());

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const response = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(response));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    console.log({ noteRef });
    await deleteDoc(noteRef);

    dispatch(deleteNoteById(note.id));
  };
};
