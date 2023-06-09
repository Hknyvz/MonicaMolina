import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CarouselSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    Order: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
    Link: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Carousel ||
  mongoose.model("Carousel", CarouselSchema);
