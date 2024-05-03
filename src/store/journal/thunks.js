import { FirebaseDB } from "../../firebase/config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNote,
  setSaving,
  updateNote,
} from "./";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
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
