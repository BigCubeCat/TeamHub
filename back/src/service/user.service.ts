import UserModel, { I_UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { env } from '../utils/config';

export async function register(user: I_UserDocument) {
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function login(user: { username: string, password: string }) {
  try {
    const foundUser = await UserModel.findOne({ username: user.username });
    console.log(foundUser)
    if (!foundUser) {
      throw new Error('Name of user is not correct');
    }
    const isMatch = bcrypt.compareSync(user.password, foundUser.password);
    if (isMatch) {
      const token = jwt.sign({ _id: foundUser._id?.toString(), username: foundUser.username }, env.JWT_SECRET, {
        expiresIn: '20 days',
      });

      return {
        user: {
          name: foundUser.name,
          surname: foundUser.surname,
          lastname: foundUser.lastname,
          username: foundUser.username,
        }, token: token
      };
    } else {
      throw new Error('Password is not correct');
    }

  } catch (error) {
    throw error;
  }
}

export async function getUser(_id: string) {
  try {
    const foundUser = await UserModel.findOne({ _id });
    if (!foundUser) {
      throw new Error("User incorrect");
    }
    return foundUser;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getOtherUser(username: string) {
  try {
    const foundUser = await UserModel.findOne({ username });
    if (!foundUser) {
      throw new Error("User incorrect");
    }
    return foundUser;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function patchUser(_id: string, newData: any) {
  try {
    const foundUser = await UserModel.findOneAndUpdate({ _id }, newData, { upsert: true });
    if (!foundUser) {
      throw new Error("Error");
    }
    return foundUser;
  } catch (error) {
    console.log(error)
    throw error;
  }
}


