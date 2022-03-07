import asyncHandler from "express-async-handler"
import Note from "../model/note-model.js"

const allNotes = asyncHandler(async (req, res) => {
  const { user: { id } } = req
  const note = await Note.find({ user: id })
  res.json(note)
})

const createNote = asyncHandler(async (req, res) => {
  const { body: { title, body }, user: { id }  } = req

  if (body.trim() && title.trim()) {
    const note = await Note.create({
      title,
      body,
      user: id
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
  const { params: { noteId }, user } = req
  const note = await Note.findById(noteId)

  if (note.user.toString() !== user.id) {
    res.status(401)
    throw new Error("you cannot update this")
  }

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
  const { params: { noteId }, user } = req
  const note = await Note.findById(noteId)

  if (!note) {
    res.status(400)
    throw new Error("not found note with this id")
  }

  if (note.user.toString() !== user.id) {
    res.status(401)
    throw new Error("you cannot delete this")
  }
  
  note.remove()

  res.status(200).json({ id: noteId })
})

export {
  allNotes,
  createNote,
  singleNote,
  updateNote,
  deleteNote
}