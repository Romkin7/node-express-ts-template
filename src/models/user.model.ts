import { Schema, model, ObjectId } from 'mongoose';
import { IBaseLoggedInUser } from '../@types/user';

export interface UserDocument extends Document {
    email: string;
    name: string;
    password: string;
    roles: ObjectId[];
    getExportableUser: () => IBaseLoggedInUser;
    comparePasswords: (password: string) => boolean;
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
});

/** Set indexes */
UserSchema.index({ email: 1 }, { unique: true });
const User = model<UserDocument>('User', UserSchema);

export default User;
