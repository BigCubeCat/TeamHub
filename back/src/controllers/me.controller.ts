import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error';
import * as meServices from '../service/me.service';

export const getMe = async (req: Request, res: Response) => {
  try {
    const foundConfig = await meServices.getConfig(req.body.username);
    res.status(200).send(foundConfig);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};


export const createMe = async (req: Request, res: Response) => {
  try {
    await meServices.createConfig(req.body);
    res.status(200).send("Success");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
