import {
  sleep,
  pressAndRelease,
  timeout,
  parseHp,
  secondsToTimeString,
  antiAFK,
  pressAndReleaseWithDelay,
  getBboxCenter,
} from "./helper.js";
import events from "events";
import {
  screen,
  Region,
  FileType,
  Key,
  RGBA,
  Point,
  mouse,
} from "@nut-tree/nut-js";
import { Worker } from "worker_threads";
import { createWorker } from "tesseract.js";
import enemies from "./enemies.js";

// Constants
const HP_REGION = new Region(135, 8, 100, 18);
const DELAY = 200;
const ENEMIES = enemies;

const status = {
  runtime: process.uptime(),
  status: "",
  hp: { currHp: 0, maxHp: 0 },
};

async function checkEnemy() {
  const ENEMY_INDICATOR_POINT = new Point(815, 25);
  const ENEMY_DETECTED_RGB = new RGBA(255, 206, 93, 255);

  const color = await screen.colorAt(ENEMY_INDICATOR_POINT);

  return Object.values(color)
    .map((value, index) => {
      return value === Object.values(ENEMY_DETECTED_RGB)[index];
    })
    .every((value) => value);
}

// Events setup
const emitter = new events.EventEmitter();

const enemyDetectedHandler = async () => {
  status.status = "Attacking...";
  await sleep(pressAndReleaseWithDelay, 0, Key.Num1);
  await timeout(DELAY);
  await sleep(pressAndReleaseWithDelay, 0, Key.Num2);
  await timeout(DELAY);
  await sleep(pressAndReleaseWithDelay, 0, Key.Num3);
  await timeout(DELAY);
  await sleep(pressAndReleaseWithDelay, 0, Key.Num4);
};

const enemyNotDetectedHandler = async () => {
  status.status = "Finding enemy...";

  await sleep(pressAndRelease, 0, Key.Z);

  if (await checkEnemy()) {
    status.status = "Found enemy...";
    return;
  }

  // status.status = "Locating enemy...";

  // await screen.capture("findEnemy", FileType.JPG, "./screenshots");

  // const worker = await createWorker("eng");
  // const res = await worker.recognize("./screenshots/findEnemy.jpg");
  // const lines = res.data.lines;

  // let detected = false;
  // let detectedEnemy = null;

  // for (const line of lines) {
  //   if (detected) {
  //     break;
  //   }

  //   const words = line.words;

  //   for (const word of words) {
  //     if (detected) {
  //       break;
  //     }

  //     for (const enemy of ENEMIES) {
  //       if (word.text.toLowerCase().includes(enemy)) {
  //         detectedEnemy = word.bbox;
  //         detected = true;
  //         break;
  //       }
  //     }
  //   }
  // }

  // const centerPoint = getBboxCenter(detectedEnemy);

  // if (
  //   !!centerPoint[0] ||
  //   !!centerPoint[1] ||
  //   centerPoint[0] < 100 ||
  //   centerPoint[1] < 100
  // ) {
  //   return;
  // }

  // status.status = "Moving to enemy...";

  // await mouse.setPosition(new Point(centerPoint[0], centerPoint[1]));
  // await mouse.leftClick();
};

const hpDiff700 = async () => {
  status.status = "Healing...";
  await sleep(pressAndRelease, 0, Key.Equal);
};

const hpDiff1500 = async () => {
  status.status = "Healing...";
  await sleep(pressAndRelease, 0, Key.Equal);
  await sleep(pressAndReleaseWithDelay, 0, Key.Minus);
};

const hpDiff3000 = async () => {
  status.status = "Healing...";
  await sleep(pressAndRelease, 0, Key.Equal);
  await sleep(pressAndReleaseWithDelay, 0, Key.Num9);
  await sleep(pressAndReleaseWithDelay, 0, Key.Num0);
};

// Listener setup
emitter.on("enemydetected", enemyDetectedHandler);
emitter.on("enemynotdetected", enemyNotDetectedHandler);
emitter.on("hpdiff700", hpDiff700);
emitter.on("hpdiff1500", hpDiff1500);
emitter.on("hpdiff3000", hpDiff3000);

// Auto-loot
const loot = new Worker("./loot.js");
loot.on("message", (message) => {
  status.status = message;
});

// Loop
while (true) {
  await timeout(DELAY);

  // Normalize uptime
  const normalizedUptime = Math.floor(process.uptime());

  // Show status
  console.clear();
  process.stdout.write(`Time elapsed: ${secondsToTimeString(status.runtime)}`);
  process.stdout.write("\n");
  process.stdout.write(`Status: ${status.status}`);
  process.stdout.write("\n");
  process.stdout.write(`HP: ${status.hp.currHp} / ${status.hp.maxHp}`);

  // Buffs
  if (normalizedUptime % 3690 === 0) {
    await sleep(pressAndReleaseWithDelay, 0, Key.Num6);
  } else if (normalizedUptime % 150 === 0) {
    await sleep(pressAndReleaseWithDelay, 0, Key.Num7);
  } else if (normalizedUptime % 180 === 0) {
    await sleep(pressAndReleaseWithDelay, 0, Key.Num8);
  }

  // Attacking
  if (await checkEnemy()) {
    emitter.emit("enemydetected");
  } else {
    emitter.emit("enemynotdetected");
  }

  // Healing
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

  status.hp.currHp = hp.currHp;
  status.hp.maxHp = hp.maxHp;

  const diff = hp.maxHp - hp.currHp;

  await timeout(DELAY);

  if (diff >= 3000) {
    emitter.emit("hpdiff3000");
  } else if (diff >= 1500) {
    emitter.emit("hpdiff1500");
  } else if (diff >= 700) {
    emitter.emit("hpdiff700");
  }

  // Anti-verification
  if (normalizedUptime % 400 === 0) {
    await antiAFK();
  }

  await timeout(DELAY);

  // Update runtime
  status.runtime = normalizedUptime;
}
