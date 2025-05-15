import React, { useContext, useEffect } from "react";
import noteContext from "../../store/notes/NoteContext";
import NoteCard from "./NoteCard";
import MyAlert from "./MyAlert";
import AuthContext from "../../store/notes/User/AuthContext";

const Home = () => {
  const context = useContext(noteContext);
  const { notes, GetAllNotes, alert } = context;
  const { token } = useContext(AuthContext);

  useEffect(() => {
    GetAllNotes();
  }, []);

  return (
    <div className="back">
      <h2 className="mx-5 my-3">Notes</h2>
      {alert && <MyAlert message={"Note Deleted!"} type={"danger"}></MyAlert>}
      <div className="Page">
        {notes.map((item) => (
          <NoteCard note={item} key={item._id}></NoteCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
