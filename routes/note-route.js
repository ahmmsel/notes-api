import { Router } from "express"

import {
  allNotes,
  createNote,
  singleNote,
  updateNote,
  deleteNote
} from "../controllers/note-controllers.js"

const router = Router()
// get notes and create notes
router.route("/").get(allNotes).post(createNote)
// get single note and update or delete
router.route("/:noteId").get(singleNote).put(updateNote).delete(deleteNote)

export default router