import { makeState, makeQueryParams, makeTitle } from "../core";
import { FavoriteGames } from "./FavoriteGames";
import { Filters } from "./Filters";
import { Search } from "./Search";

makeTitle("Tofa7iTS - Favorites");

export const Favorites = (): HTMLElement => {
  const queryParams: ReturnType<typeof makeQueryParams> = makeQueryParams();
  const url: ReturnType<typeof makeState<string>> = makeState(
    `page=1&limit=24&${queryParams.toString()}`
  );

  const header = document.getElementById("header") as HTMLDivElement;
  header.classList.remove("hidden");

  document.getElementById("details-header")?.remove();

  const container = document.createElement("div") as HTMLDivElement;
  container.className =
    "mt-[8vh] 2xs:mt-[10vh] xs:mt-[11vh] sm:mt-[12vh] md:mt-[15vh] lg:mt-[17vh] xl:mt-[20vh]";

  const render = (): void => {
    container.innerHTML = "";

    const filterContainer = document.createElement("div") as HTMLDivElement;
    filterContainer.className =
      "flex flex-col flex-wrap gap-y-6 2xs:gap-y-7 xs:gap-y-8 sm:gap-y-9 md:gap-y-10 lg:flex-row lg:gap-x-2 xl:justify-between";
    filterContainer.append(Search(url));
    filterContainer.append(Filters(url));

    container.append(filterContainer);

    const gamecontainer = FavoriteGames(queryParams, url);

    container.append(gamecontainer);
  };

  render();

  return container;
};
