import React, { useContext, useState } from "react";
import noteContext from "../../store/notes/NoteContext";

const CreateNote = () => {
  const context = useContext(noteContext);
  const {
    AddNotes,
    title,
    tag,
    desc,
    setdesc,
    settag,
    settitle,
    EDIT,
    setEDIT,
    EditID,
    setEditID,
    EditNote,
  } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const onClick = (e) => {
    if (EDIT === false) {
      const newNote = {
        title: title,
        description: desc,
        tags: tag,
      };
      setnote(newNote);
      AddNotes(newNote);
    } else {
      EditNote(EditID, title, desc, tag);
      setEDIT(false);
    }
    settag("");
    settitle("");
    setdesc("");
  };

  return (
    <div className="CreateNote">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Title
      </label>
      <input
        className="form-control textBox"
        onChange={(event) => settitle(event.target.value)}
        value={title}
        type="text"
        id="title"
        name="title"
        placeholder="Enter Title"
        aria-label="default input example"
      ></input>

      <div className="mb-3 Description">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          onChange={(event) => setdesc(event.target.value)}
          value={desc}
          className="form-control textBox"
          id="description"
          name="description"
          rows="3"
        ></textarea>
      </div>

      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Tags
      </label>
      <input
        onChange={(event) => settag(event.target.value)}
        value={tag}
        className="form-control textBox"
        type="text"
        id="tags"
        name="tags"
        placeholder="Enter Tag"
        aria-label="default input example"
      ></input>

      <button
        type="submit"
        className="btn btn-primary my-3 Edit-btn"
        onClick={onClick}
      >
        Save
      </button>
    </div>
  );
};

export default CreateNote;
