import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"];
    valid: boolean;
    createdAt: Date;
    updatedAt: Date;
    userAgent: string;
}

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId , ref: 'User'},
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
}, {
    timestamps: true
});

const SessisonModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessisonModel;
