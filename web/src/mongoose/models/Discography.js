import mongoose from "mongoose";

const DiscographySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
    Year: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Discography ||
  mongoose.model("Discography", DiscographySchema);
