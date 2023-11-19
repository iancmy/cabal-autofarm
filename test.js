import { antiAFK, getBboxCenter, parseHp } from "./helper.js";
import {
  screen,
  Region,
  FileType,
  Key,
  clipboard,
  Point,
  mouse,
  RGBA,
} from "@nut-tree/nut-js";
import { createWorker } from "tesseract.js";

const HP_REGION = new Region(135, 8, 100, 18);
const worker = await createWorker("eng");

await screen.captureRegion(
  "currentHp",
  HP_REGION,
  FileType.JPG,
  "./screenshots"
);

const ret = await worker.recognize("./screenshots/currentHp.jpg");
const hp = parseHp(ret.data.text);
await worker.terminate();

console.log(hp);

const diff = hp.maxHp - hp.currHp;
