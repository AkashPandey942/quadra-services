import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  testimonial: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  submittedAt: Date;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  testimonial: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  date: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
