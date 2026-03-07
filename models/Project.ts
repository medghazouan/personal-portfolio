import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IProject extends Document {
  title:       string;
  slug:        string;
  description: string;
  longDesc?:   string;
  thumbnail?:  string;  // kept for backward compat (first image fallback)
  images?:     string[];  // up to ~5 Cloudinary URLs
  tags:        string[];
  category:    "ai" | "fullstack" | "devops" | "research";
  status:      "locked" | "unlocked";
  liveUrl?:    string;
  sourceUrl?:  string;
  encryption?: string;      // e.g. "SHA-256", "AES-128" — shown on locked cards
  featured:    boolean;
  createdAt:   Date;
  updatedAt:   Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title:       { type: String, required: true },
    slug:        { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDesc:    { type: String },
    thumbnail:   { type: String },
    images:      [{ type: String }],
    tags:        [{ type: String }],
    category:    {
      type:    String,
      enum:    ["ai", "fullstack", "devops", "research"],
      required: true,
    },
    status:      { type: String, enum: ["locked", "unlocked"], default: "locked" },
    liveUrl:     { type: String },
    sourceUrl:   { type: String },
    encryption:  { type: String },
    featured:    { type: Boolean, default: false },
  },
  {
    timestamps: true,
    // Ensure these fields are indexed per PRD section 9.1
  }
);

// Indexes for fast queries (PRD 9.1)
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ featured: -1, createdAt: -1 });

// Prevent model re-registration during hot reload
export const Project = models.Project ?? model<IProject>("Project", ProjectSchema);