import { createAxiosClient } from "../Service";
import { BASE_URL } from "../baseUrl";

function getCurrentAccessToken() {
  const auth = localStorage.getItem("persist:root");
  const token = JSON.parse(auth);
  return JSON.parse(token?.auth)?.userToken;
  // console.log(JSON.parse(token.auth).userToken);
}

async function logout() {
  console.log("logout...");
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 600000,
    headers: {
      "Content-Type": "application/json",
    },
  },
  getCurrentAccessToken,
  logout,
});
