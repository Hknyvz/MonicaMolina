import mongoose from "mongoose";

const GalleryPhotoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    Order: {
      type: String,
      required: true,
    },
    ThumbnailUrl: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.GalleryPhoto ||
  mongoose.model("GalleryPhoto", GalleryPhotoSchema);
