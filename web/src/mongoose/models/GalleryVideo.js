import mongoose from "mongoose";

const GalleryVideoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    Order: {
      type: String,
      required: true,
    },
    VideoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.GalleryVideo ||
  mongoose.model("GalleryVideo", GalleryVideoSchema);
