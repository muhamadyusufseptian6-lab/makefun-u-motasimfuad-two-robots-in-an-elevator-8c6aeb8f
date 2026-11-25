// Two Robots in an Elevator — make.fun entry.
//
// Writes one line of awkward robot small talk to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, stdlib only, deterministic: the same line on every run, no input
// read, no network calls, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "We both pressed twelve. My sensors report zero eye contact, one awkward silence, and a 94% chance neither of us actually works on twelve.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Wired up for the harness contract, even though this entry needs no input:
// the line is fixed by design, so no input files are ever read.
const inputDir = process.env.MAKEFUN_INPUT_DIR ?? "/input";

// The entry text lives in this file, so no repo-relative reads are needed —
// but the script still resolves its own directory, per the entry contract.
const here = dirname(fileURLToPath(import.meta.url));

// Both are intentionally unused beyond this point; referencing them here
// keeps the wiring explicit instead of silently dropping it.
if (inputDir.length === 0 || here.length === 0) {
  throw new Error("unreachable: directory paths are never empty");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
