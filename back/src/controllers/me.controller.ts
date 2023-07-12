import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error';
import * as meServices from '../service/me.service';
import * as userServices from '../service/user.service';
import { CustomRequest } from '../middleware/auth';

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    const tokenStirng = (typeof token === "string") ? token : token?.username;
    const foundConfig = await meServices.getConfig(tokenStirng);
    res.status(200).send(foundConfig);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const patchMe = async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    const tokenStirng = (typeof token === "string") ? token : token?.username;
    console.log(req.body);
    await meServices.patchConfig(tokenStirng, req.body);
    res.status(200).send("Success");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}
