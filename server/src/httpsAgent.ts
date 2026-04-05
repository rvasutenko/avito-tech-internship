import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certPath = path.resolve(__dirname, "../certs/russiantrustedca.pem");

const ca = fs.readFileSync(certPath);

export const httpsAgent = new https.Agent({ ca });
