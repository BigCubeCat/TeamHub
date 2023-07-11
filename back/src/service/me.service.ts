import MeModel, { I_MeDocument } from "../models/me.model";

export async function createConfig(config: I_MeDocument): Promise<void> {
  try {
    await MeModel.create(config);
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
