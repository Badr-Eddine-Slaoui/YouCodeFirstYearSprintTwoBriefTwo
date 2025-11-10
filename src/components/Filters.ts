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
    "flex flex-wrap min-h-[4vh] gap-4 justify-start items-center px-4 text-[0.8rem] 2xs:text-[1rem] xs:text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.4rem] xl:text-[1.6rem]";

  container.append(Select(url, ["Genre", ...genres]));
  container.append(Select(url, ["Platform", ...platforms]));
  container.append(Select(url, ["Rating", "1", "2", "3", "4", "5"]));

  return container;
};