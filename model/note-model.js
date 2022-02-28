import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
		ref: "Uesr"
  },
  name: {
    type: String,
    required: [true, "note name is required"]
  },
  description: {
    type: String,
    required: [true, "note name is required"]
  }
},{
  timestamps: true
})

export default mongoose.model("Note", noteSchema)