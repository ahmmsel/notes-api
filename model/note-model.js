import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
		ref: "Uesr"
  },
  title: {
    type: String,
    required: [true, "note title is required"]
  },
  body: {
    type: String,
    required: [true, "note body is required"]
  }
},{
  timestamps: true
})

export default mongoose.model("Note", noteSchema)