import mongoose, { Schema, Model } from "mongoose";

export interface IProfessional {
  _id?: string;
  name: string;
  title?: string;
  bio: string;
  bioFr: string;
  skills: string[];
  languages?: string[];
  location: string;
  hourlyRate: number;
  avatar: string;
  rating: number;
  totalReviews: number;
  categories: string[];
  portfolio: {
    title: string;
    titleFr: string;
    image: string;
    description: string;
    descriptionFr: string;
  }[];
  reviews: {
    clientName: string;
    rating: number;
    comment: string;
    commentFr: string;
    date: Date;
  }[];
  isActive: boolean;
  createdAt: Date;
}

const ProfessionalSchema = new Schema<IProfessional>({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  bioFr: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  languages: [
    {
      type: String,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://i.pravatar.cc/150",
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  categories: [
    {
      type: String,
    },
  ],
  portfolio: [
    {
      title: String,
      titleFr: String,
      image: String,
      description: String,
      descriptionFr: String,
    },
  ],
  reviews: [
    {
      clientName: String,
      rating: Number,
      comment: String,
      commentFr: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Professional ||
  mongoose.model<IProfessional>("Professional", ProfessionalSchema);
