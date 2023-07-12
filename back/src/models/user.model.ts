import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 8;

export interface IUserDoc {
  username: string;
  name: string;
  surname: string;
  lastname: string;
  password: string;
  avatar: string;
}

export interface I_UserDocument extends IUserDoc, mongoose.Document {
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String, unique: false },
  surname: { type: String, unique: false },
  lastname: { type: String, unique: false },
  avatar: { type: String, unique: false },
  password: { type: String, unique: false },
});

UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});


const UserModel = mongoose.model<I_UserDocument>('User', UserSchema);
export default UserModel;
