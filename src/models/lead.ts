import mongoose, { Schema, model, models } from "mongoose";

interface ILead extends mongoose.Document {
  name: string;
  email: string;
  message: string;
}

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Lead =
  (models && (models.Lead as mongoose.Model<ILead>)) ||
  model<ILead>("Lead", LeadSchema);

export default Lead;
