import { Request, Response } from "express";
import { getErrorMessage } from "../utils/error";
import * as meServices from "../service/me.service";
import { getStringToken } from "../utils/auth";

export const getMe = async (req: Request, res: Response) => {
  try {
    const foundConfig = await meServices.getConfig(getStringToken(req));
    res.status(200).send(foundConfig);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const patchMe = async (req: Request, res: Response) => {
  try {
    await meServices.patchConfig(getStringToken(req), req.body);
    res.status(200).send("Success");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
