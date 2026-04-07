#!/usr/bin/env node
import { execSync } from "node:child_process";

function isNonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function findMatchingProcesses() {
  try {
    const output = execSync("ps -axo pid=,command=", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    return output
      .split("\n")
      .map((line) => line.trim())
      .filter(isNonEmpty)
      .filter((line) =>
        /(next dev|next-server \(v|node .*next\/dist\/bin\/next dev)/.test(line),
      );
  } catch {
    return [];
  }
}

const matches = findMatchingProcesses();

if (matches.length > 0) {
  console.error("\nBuild blocked: an active Next.js dev process was detected.\n");
  console.error("Stop dev first, then run build again.");
  console.error("Example: pkill -f \"next dev\"\n");
  console.error("Detected process(es):");
  for (const match of matches.slice(0, 5)) {
    console.error(`- ${match}`);
  }
  if (matches.length > 5) {
    console.error(`- ...and ${matches.length - 5} more`);
  }
  process.exit(1);
}
