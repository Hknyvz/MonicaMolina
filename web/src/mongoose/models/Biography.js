import mongoose from "mongoose";

const BiographySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
    Text: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Biography ||
  mongoose.model("Biography", BiographySchema);
