import mongoose, { Schema } from 'mongoose';

export interface IRequest {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  category: string;
  projectTitle: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedProfessional?: mongoose.Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema = new Schema<IRequest>({
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  clientPhone: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  timeline: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  assignedProfessional: {
    type: Schema.Types.ObjectId,
    ref: 'Professional',
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp on save
RequestSchema.pre('save', function () {
  this.updatedAt = new Date();
});

export default mongoose.models.Request || mongoose.model<IRequest>('Request', RequestSchema);
