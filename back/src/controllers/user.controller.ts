import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error';
import * as userServices from '../service/user.service';
import { CustomRequest } from '../middleware/auth';

export const loginOne = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);
    res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    const tokenStirng = (typeof token === "string") ? token : token?._id;
    const foundUser = await userServices.getUser(tokenStirng);
    res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const registerOne = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
    res.status(200).send('Inserted successfully');
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};


