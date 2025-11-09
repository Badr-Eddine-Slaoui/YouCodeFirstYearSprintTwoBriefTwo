import { makeState, makeQueryParams, makeTitle } from "../core";
import { FavoriteGames } from "./FavoriteGames";
import { Filters } from "./Filters";
import { Search } from "./Search";

makeTitle("Tofa7iTS - Favorites");


export const Favorites = (): HTMLElement => {
  const queryParams: ReturnType<typeof makeQueryParams> = makeQueryParams();
  const url: ReturnType<typeof makeState<string>> = makeState(
    `page=1&limit=12&${queryParams.toString()}`
  );
  
  const header = document.getElementById("header") as HTMLDivElement;
  header.classList.remove("hidden");

  const container = document.createElement("div") as HTMLDivElement;
  container.className = "mt-[5vh]";

  const render = (): void => {
    container.innerHTML = "";

    const filterContainer = document.createElement("div") as HTMLDivElement;
    filterContainer.className = "grid grid-cols-1 gap-y-16";
    filterContainer.append(Search(url));
    Filters(url).then((res) => filterContainer.append(res));

    container.append(filterContainer);

    const gamecontainer = FavoriteGames(queryParams, url);

    container.append(gamecontainer);
  };

  render();

  return container;
};
