import { Key, keyboard, clipboard } from "@nut-tree/nut-js";

async function pressAndRelease(key) {
  await keyboard.pressKey(key);
  await keyboard.releaseKey(key);
}

async function pressAndReleaseWithDelay(key) {
  await keyboard.pressKey(key);
  await timeout(500);
  await keyboard.releaseKey(key);
}

async function pressAndReleaseCombo(key1, key2) {
  await keyboard.pressKey(key1);
  await keyboard.pressKey(key2);
  await keyboard.releaseKey(key1);
  await keyboard.releaseKey(key2);
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sleep(fn, ms, ...args) {
  await timeout(ms);
  return fn(...args);
}

function parseHp(rawText) {
  const [currHp, maxHp] = rawText.split("/");

  return {
    currHp: parseInt(currHp),
    maxHp: parseInt(maxHp),
  };
}

function secondsToTimeString(seconds) {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}

async function antiAFK() {
  const messages = [
    "hello",
    "kelan nagsspawn manticore?",
    "may alam kayong tips para mabilis magpalevel?",
    "saan mas madali makaipon ng alz?",
    "hi, sino pwede makasama sa FT B3F dungeon run?",
    "paano ba makakuha ng high-grade na upgrade core sa Volcanic Citadel?",
    "may party ba na need ng Wizard sa Undead Ground dungeon? Lvl 171 WI here.",
    "san okay mag-farm ng AXP para sa rank-up?",
    "mga ser, ano mga recommended na skills for FA sa PVP?",
    "LFM sa Bloody Ice, Chaos Arena later. Sino gusto sumali?",
    "may nakakaalam ba kung ano best set at accessories for wizard sa current patch?",
    "paano ba mag-farm ng honor points ng mabilis?",
    "LFM para sa Nation War mamaya, join tayo mga kasabayan!",
    "guys, anong strategy niyo sa Tower of the Dead B3F",
    "saan maganda mag-farm ng crafting materials para sa upgrade ng gear?",
    "LF Party sa Forgotten Temple (FT) B2F, Archer lvl 150 here.",
    "may alam ba kayo na effective na combo para sa Force Blader sa PVP?",
    "mga sir, saan magandang spot para sa AFK farming ng loot?",
    "ano bang magandang set na i-enchant para sa Blader sa current meta?",
    "paano magkaruon ng malaking critical rate ang Force Archer?",
    "may recommended ba kayong farming route sa Mutant Forest para sa mga low-level characters?",
  ];

  const random = Math.floor(Math.random() * messages.length);
  const message = messages[random];

  clipboard.setContent(message);

  await keyboard.pressKey(Key.Enter);
  await keyboard.releaseKey(Key.Enter);

  await keyboard.pressKey(Key.LeftControl);
  await keyboard.pressKey(Key.V);
  await keyboard.releaseKey(Key.LeftControl);
  await keyboard.releaseKey(Key.V);

  await keyboard.pressKey(Key.Enter);
  await keyboard.releaseKey(Key.Enter);
}

function getBboxCenter(bbox) {
  return [(bbox?.x0 + bbox?.x1) / 2, (bbox?.y0 + bbox?.y1) / 2];
}

export {
  getBboxCenter,
  pressAndRelease,
  pressAndReleaseCombo,
  timeout,
  sleep,
  parseHp,
  secondsToTimeString,
  antiAFK,
  pressAndReleaseWithDelay,
};
