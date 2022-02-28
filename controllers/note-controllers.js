import asyncHandler from "express-async-handler"
import Note from "../model/note-model.js"

const allNotes = asyncHandler(async (req, res) => {
  const note = await Note.find()
  res.json(note)
})

const createNote = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  if (name.trim() && description.trim()) {
    const note = await Note.create({
      name,
      description
    })
    res.status(201).json(note)
  } else {  
    res.status(400)
    throw new Error("all fields must not empty")
  }

})

const singleNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params
  const note = await Note.findById(noteId)

  if (!note) {
    res.status(400)
    throw new Error("note not found")
  }

  res.json(note)
})

const updateNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params
  const note = await Note.findById(noteId)

  if (!note) {
    res.status(400)
    throw new Error("note not found")
  }

  const updateNote = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true
  })

  res.status(201).json(updateNote)
}) 

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.noteId)

  if (!note) {
    res.status(400)
    throw new Error("not found note with this id")
  }

  note.remove()

  res.status(200).json({ message: "deleted successfully" })
})

export {
  allNotes,
  createNote,
  singleNote,
  updateNote,
  deleteNote
}