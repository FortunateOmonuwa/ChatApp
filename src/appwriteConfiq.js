import { Client, Databases } from "appwrite";
const client = new Client();

export const databases = new Databases(client);
export const Project_ID = "65c65de79031bdc5c714";
export const Database_ID = "65c65f58990f774eacf2";
export const Collection_ID_Messages = "65c65f65d3ea78c91f9d";
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65c65de79031bdc5c714");

// const promise = databases.listDocuments(Database_ID, Collection_ID_Messages);
// promise
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
export default client;
