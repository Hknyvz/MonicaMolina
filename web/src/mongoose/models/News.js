import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Text: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
    ThumbnailUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.News || mongoose.model("News", NewsSchema);
