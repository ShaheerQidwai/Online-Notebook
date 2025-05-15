import { createContext } from "react";

const noteContext = createContext({
  notes: [{}],
  AddNotes: () => {},
  DeleteNotes: () => {},
  EditNote: () => {},
  GetAllNotes: () => {},
  title: "",
  desc: "",
  tag: "",
  settitle: () => {},
  settag: () => {},
  setdesc: () => {},
  EDIT: false,
  setEDIT: () => {},
  EditID: "",
  setEditID: () => {},
  setNotes: () => {},
});

export default noteContext;
