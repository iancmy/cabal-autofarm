import { Key } from "@nut-tree/nut-js";
import { sleep, pressAndRelease, timeout } from "./helper.js";
import { parentPort } from "worker_threads";

while (true) {
  timeout(5000);
  await sleep(pressAndRelease, 0, Key.Space);
  await sleep(pressAndRelease, 0, Key.Space);
  await sleep(pressAndRelease, 0, Key.Space);
  await sleep(pressAndRelease, 0, Key.Space);
  await sleep(pressAndRelease, 0, Key.Space);
  parentPort.postMessage("Looting...");
}
