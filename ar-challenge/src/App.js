import Header from "./components/Header";
import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

const ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

// Retrieves notes from the API.
async function getNotes() {
  // GET /posts
  return fetch(ENDPOINT).then((response) => response.json());
}

// Submits a new note to the API.
async function addNote(title, body) {
  // POST
  return fetch(ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((response) => response.json());
}

/* Note Form Component */
function NoteForm(props) {
  const { onNoteAdded } = props;
  const [formData, setForm] = useState({
    title: "",
    body: "",
  });

  const onChange = (e) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, body } = formData;
      const result = await addNote(title, body);
      console.log("Note added: ", result);
      onNoteAdded({
        id: result.id,
        title,
        body,
      });
      setForm({
        title: "",
        body: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add a note</h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
        />

        <br />

        <label>Body: </label>
        <input
          id="body"
          type="text"
          name="body"
          value={formData.body}
          onChange={onChange}
        />

        <br />
        <button type="submit">Add note</button>
      </form>
    </div>
  );
}

/* Get All Notes Component */
function GetAllNotes(props) {
  const { notes } = props;
  return (
    <div>
      <hr />
      <h2>All notes</h2>
      <ul>
        {notes.map((note) => (
          <li>
            {note.id}: {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log("react", React);

/*  Main NoteApp Component */
function NoteApp() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNotes();
      console.log("All Notes: ", result);
      setNotes(result);
    };
    fetchData();
  }, []);

  const onNoteAdded = (note) => {
    setNotes((notes) => [note, ...notes]);
  };

  return (
    <div>
      <Header />
      <NoteForm onNoteAdded={onNoteAdded} />
      <GetAllNotes notes={notes} />
    </div>
  );
}

export default NoteApp;
