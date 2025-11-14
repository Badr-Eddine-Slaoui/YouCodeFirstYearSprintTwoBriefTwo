import type { makeState } from "../core";
import { Error } from "../errors/Error";
import { Select } from "./Select";

const api = "https://debuggers-games-api.duckdns.org";

export const Filters = (
  url: ReturnType<typeof makeState<string>>
): HTMLElement => {
  const container = document.createElement("div") as HTMLDivElement;
  container.className =
    "flex flex-wrap min-h-[4vh] gap-4 justify-start items-center px-4 text-[0.8rem] 2xs:text-[1rem] xs:text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.4rem] xl:text-[1.6rem]";

  const render = async (): Promise<void> => {
    try {
      container.innerHTML = "";
      container.classList.remove("justify-center", "w-full");
      container.classList.add("justify-start");
      const [{ genres }, { platforms }] = await Promise.all([
        fetch(`${api}/api/genres`).then((res) => res.json()),
        fetch(`${api}/api/platforms`).then((res) => res.json()),
      ]);
      container.append(Select(url, [{name:"Genres", slug:"genre"}, ...genres]));
      container.append(Select(url, [{name:"Platforms", slug:"platform"}, ...platforms]));
      container.append(Select(url, [{name:"Ratings", slug:"rating" }, {name:"1 Star", slug:"1"}, {name:"2 Stars", slug:"2"}, {name:"3 Stars", slug:"3"}, {name:"4 Stars", slug:"4"}, {name:"5 Stars", slug:"5"}]));
    } catch (error) {
      container.classList.remove("justify-start");
      container.classList.add("justify-center", "w-full");
      container.innerHTML = "";
      container.append(Error(render, "Error Loading Filters"));
    }
  };

  render();

  return container;
};
