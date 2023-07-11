import UserModel, { I_UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { env } from '../utils/config';

export async function register(user: I_UserDocument): Promise<void> {
  try {
    await UserModel.create(user);
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function login(user: I_UserDocument) {
  try {
    const foundUser = await UserModel.findOne({ username: user.username });

    if (!foundUser) {
      throw new Error('Name of user is not correct');
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, env.JWT_SECRET, {
        expiresIn: '20 days',
      });

      return {
        user: {
          id: user._id,
          name: user.name,
          surname: user.surname,
          lastname: user.lastname,
          username: user.username,
        }, token: token
      };
    } else {
      throw new Error('Password is not correct');
    }

  } catch (error) {
    throw error;
  }
}


