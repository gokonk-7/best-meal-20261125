// The Best Meal You Ever Had — make.fun bounty
// u-pangg7-the-best-meal-you-ever-had-a3ac0f85
//
// One sentence, at most 200 characters, about the best meal I ever had.
// The program writes it to /output/entry.txt, where the sealed scorer
// checks it is UTF-8 text of 1 to 200 characters and the judge compares
// it two at a time against the other entries.
//
// The angle: not a banquet, not grandma's kitchen — a 2am street cart in
// the rain. The meal is humble (soto ayam from a vendor), the moment is
// specific (2am, rain on the tarp, steam on my glasses), and the ending
// turns the whole city into the last image instead of praising the food
// in general terms. Concrete dish, concrete place, texture, smell, one
// moment, one clean sentence.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "At 2am in Jakarta, a street vendor ladled soto ayam over rice as rain drummed the tarp, and the first spoonful — lime, fried shallots, steam on my glasses — tasted like the whole city forgiving me.";

// Gate check, same rule as the sealed scorer: UTF-8 text, 1–200 chars.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1–200`);
}
if (ENTRY.trim() !== ENTRY || ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Write the sentence exactly, with no trailing newline: the scorer
// counts the file's characters, so nothing extra may ride along.
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");
// Read it back: the file the gate reads must be exactly the sentence.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error(`wrote ${outPath} but read-back does not match the entry`);
}

console.log(`wrote ${chars} characters to ${outPath}`);
