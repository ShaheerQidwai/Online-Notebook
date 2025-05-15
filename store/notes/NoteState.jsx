import React, { useState, useContext, useEffect } from "react";
import noteContext from "./NoteContext";
import AuthContext from "./User/AuthContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const itoken = localStorage.getItem("auth-token");
  const { token } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [alert, setalert] = useState(false);

  useEffect(() => {
    if (!token) {
      setNotes([]); // ✅ Clear notes when user logs out
    }
  }, [token]);
  //
  //Get All noyes
  const GetAllNotes = async () => {
    //Todo API
    const uri = `${host}/api/notes/fetchnotes`;
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": itoken,
      },
    });
    const json = await response.json();
    setNotes(json);
  }; //
  //
  //
  //
  //Add notes
  const AddNotes = async (INNotes) => {
    //Todo API

    const uri = `${host}/api/notes/addnote`;
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": itoken,
      },
      body: JSON.stringify(INNotes),
    });
    const json = await response.json();

    const NewNote = {
      _id: json._id,
      user: json.user,
      title: INNotes.title,
      description: INNotes.description,
      tags: INNotes.tags,
      date: json.date,
      __v: 0,
    };
    setNotes(notes.concat(NewNote));
  };
  //
  //
  //
  //
  //Delete Notes
  const DeleteNotes = async (id) => {
    const uri = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": itoken,
      },
    });

    const NewNote = notes.filter((item) => item._id !== id);
    setNotes(NewNote);
    setalert(true);
    setTimeout(() => {
      setalert(false);
    }, 2000);
  };
  //
  //Edit Notes
  const EditNote = async (id, title, description, tag) => {
    const uri = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(uri, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": itoken,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tag;
      }
    }
    const jres = response.json();
  };

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [tag, settag] = useState("");
  const [EDIT, setEDIT] = useState(false);
  const [EditID, setEditID] = useState("");

  return (
    <noteContext.Provider
      value={{
        notes,
        AddNotes,
        DeleteNotes,
        EditNote,
        GetAllNotes,
        title,
        desc,
        tag,
        settag,
        setdesc,
        settitle,
        EDIT,
        setEDIT,
        EditID,
        setEditID,
        setNotes,
        alert,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
