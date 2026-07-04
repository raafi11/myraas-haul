import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.resolve("data");

export async function readJson(fileName) {
  const filePath = path.join(DATA_DIR, fileName);

  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeJson(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);

  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}