import { config } from '../config';
import mongoose, { Schema, model, connect } from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
  name: string;
  surname: string;
  lastname: string;
  password: string;
  tokens: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  tokens: { type: String, required: true },
  avatar: String
});

userSchema.pre('save', async function(next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({ _id: user._id }, config.JWT_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (username, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Invalid login credentials')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials')
  }
  return user
}

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/users');

  const user = new User({
    username: "BigCubeCat",
    name: 'Егор',
    surname: 'Биточкин',
    lastname: 'Иванович',
    password: "password",
    tokens: "",
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  await user.save();

  console.log(user); // 'bill@initech.com'
}

