import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: String,
  password: String,
  role: { type: String, default: "admin" },
});

export default models.User || model("User", UserSchema);
