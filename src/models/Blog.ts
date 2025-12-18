import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: String,
    excerpt: String,
    content: String,
    slug: String,
  },
  { timestamps: true }
);

export default models.Blog || model("Blog", BlogSchema);
