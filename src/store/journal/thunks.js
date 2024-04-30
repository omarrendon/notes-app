import { FirebaseDB } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./";

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
