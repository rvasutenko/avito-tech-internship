import axios from "axios";
import { httpsAgent } from "./httpsAgent.ts";

let accessToken: string | null = null;
let expiresAt = 0;

export const getGigaChatToken = async () => {
  const now = Date.now();

  if (accessToken && now < expiresAt - 60_000) {
    return accessToken;
  }

  const response = await axios.post(
    "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
    { scope: "GIGACHAT_API_PERS" },
    {
      httpsAgent,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        RqUID: crypto.randomUUID(),
        Authorization: `Basic ${process.env.GIGACHAT_AUTHORIZATION_KEY}`,
      },
    }
  );

  accessToken = response.data.access_token;
  console.log(accessToken);

  expiresAt = response.data.expires_at;

  return accessToken;
};
