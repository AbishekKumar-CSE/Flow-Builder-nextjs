import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  value: String,
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
