import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    UserName: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
