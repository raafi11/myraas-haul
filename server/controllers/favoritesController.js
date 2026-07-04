import { v4 as uuid } from "uuid";
import { readJson, writeJson } from "../utils/jsonDb.js";

export async function getFavorites(req, res) {
  const favorites = await readJson("favorites.json");
  res.json(favorites);
}

export async function addFavorite(req, res) {
  const favorites = await readJson("favorites.json");

  const item = {
    id: uuid(),
    ...req.body,
  };

  favorites.push(item);

  await writeJson("favorites.json", favorites);

  res.status(201).json(item);
}

export async function deleteFavorite(req, res) {
  const favorites = await readJson("favorites.json");

  const updated = favorites.filter(
    (item) => item.id !== req.params.id
  );

  await writeJson("favorites.json", updated);

  res.json({ success: true });
}