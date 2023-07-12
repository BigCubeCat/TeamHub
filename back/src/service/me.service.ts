import * as userServices from "./user.service";
import MeModel, { I_MeDocument } from "../models/me.model";
import { Error } from "mongoose";

export async function createConfig(config: I_MeDocument): Promise<void> {
  try {
    await MeModel.create(config);
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function patchConfig(username: string, config: any) {
  try {
    console.log(config)
    const foundConfig = await MeModel.findOneAndUpdate({ username }, config, { upsert: true });
    console.log(foundConfig)
    if (!foundConfig) {
      throw new Error("Error");
    }
    return foundConfig
  } catch (error) {
    console.log(error)
    throw error;
  }
}


export async function getConfig(username: string) {
  try {
    const foundConfig = await MeModel.findOne({ username });
    console.log(foundConfig);
    return foundConfig;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
