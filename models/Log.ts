import { Schema, model, models, Document } from 'mongoose';

export interface ILog extends Document {
  title:     string;
  slug:      string;
  excerpt:   string;
  content:   string;
  tags:      string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LogSchema = new Schema<ILog>(
  {
    title:     { type: String, required: true, trim: true },
    slug:      { type: String, required: true, unique: true },
    excerpt:   { type: String, required: true, maxlength: 300 },
    content:   { type: String, required: true },
    tags:      [{ type: String }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

LogSchema.index({ createdAt: -1 });
LogSchema.index({ published: 1, createdAt: -1 });

export const Log = models.Log ?? model<ILog>('Log', LogSchema);