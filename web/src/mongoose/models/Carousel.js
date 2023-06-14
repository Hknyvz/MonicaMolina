import mongoose from "mongoose";

const CarouselSchema = new mongoose.Schema(
  {
    Order: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
    ImageText: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Carousel ||
  mongoose.model("Carousel", CarouselSchema);
