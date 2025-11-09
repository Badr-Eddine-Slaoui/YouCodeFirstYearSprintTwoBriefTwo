import type { makeState } from "../core";
import { Select } from "./Select";

const api = "https://debuggers-games-api.duckdns.org";

export const Filters = async (url: ReturnType<typeof makeState<string>>): Promise<HTMLElement> => {
  const [{ genres }, { platforms }] = await Promise.all([
    fetch(`${api}/api/genres`).then((res) => res.json()),
    fetch(`${api}/api/platforms`).then((res) => res.json()),
  ]);

  const container = document.createElement("div") as HTMLDivElement;
  container.className =
    "flex h-[4vh] gap-4 justify-start items-center px-4 text-[2.5rem]";

  container.append(Select(url, ["Genre", ...genres]));
  container.append(Select(url, ["Platform", ...platforms]));
  container.append(Select(url, ["Rating", "1", "2", "3", "4", "5"]));

  return container;
};