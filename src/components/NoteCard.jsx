import React, { useContext } from "react";
import { MdEdit } from "react-icons/md";
import noteContext from "../../store/notes/NoteContext";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note }) => {
  const context = useContext(noteContext);
  const { DeleteNotes, setdesc, settag, settitle, setEDIT, EditID, setEditID } =
    context;

  const navigate = useNavigate();

  const EditBTNPress = () => {
    navigate("/CreateNote");
    settitle(note.title);
    setdesc(note.description);
    settag(note.tags);
    setEDIT(true);
    setEditID(note._id);
  };

  return (
    <div className="card NoteCard">
      <div className="container">
        <button
          type="button"
          className="btn-close crossBtn"
          aria-label="Close"
          onClick={() => {
            DeleteNotes(note._id);
          }}
        ></button>
      </div>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <p className="card-text">{note.tags}</p>
        <a href="#" className="btn btn-primary Edit-btn" onClick={EditBTNPress}>
          Edit <MdEdit></MdEdit>
        </a>
      </div>
    </div>
  );
};

export default NoteCard;
