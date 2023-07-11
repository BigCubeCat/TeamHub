import PocketBase from 'pocketbase';
import { config } from "../config";

const pb = new PocketBase();

export const f = async () => {
  const authData = await pb.collection('users').authWithPassword('YOUR_USERNAME_OR_EMAIL', '1234567890');
  console.log(authData)

  // after the above you can also access the auth data from the authStore
  // console.log(pb.authStore.isValid);
  // console.log(pb.authStore.token);
  // console.log(pb.authStore.model);
  //
  // // "logout" the last authenticated model
  // pb.authStore.clear();
}

export default pb;

