import { Schema, model, models, Document } from "mongoose";

export interface IMessage extends Document {
  name:      string;
  email:     string;
  message:   string;
  ip?:       string;
  read:      boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name:    { type: String, required: true, trim: true, maxlength: 120 },
    email:   { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, maxlength: 2000 },
    ip:      { type: String },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ read: 1, createdAt: -1 });

export const Message = models.Message ?? model<IMessage>("Message", MessageSchema);