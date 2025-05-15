const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

const { body, validationResult } = require("express-validator");

//
//
//Fetch all notes by a user
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "notes data laane men garbar hai" });
  }
});
//
//
//
//make a note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter some word").isLength({ min: 2 }),
    body("description", "Description cannot be blank").isLength({ min: 2 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors occur, send them as a response
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tags } = req.body;
      const note = new Notes({
        user: req.user.id,
        title,
        description,
        tags,
      });
      const savedNote = await note.save();
      res.json(savedNote);
      //
      //
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "note banane men garbar hai" });
    }
  }
);
//
//
//
//updating an existing note from a user
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If validation errors occur, send them as a response
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, tags } = req.body;
    const Newnote = {};
    if (title) {
      Newnote.title = title;
    }
    if (description) {
      Newnote.description = description;
    }
    if (tags) {
      Newnote.tags = tags;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: Newnote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "notes data laane men garbar hai" });
  }
});
//
//
//
//Delete note by a user
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If validation errors occur, send them as a response
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json(note);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "notes data laane men garbar hai" });
  }
});

module.exports = router;
