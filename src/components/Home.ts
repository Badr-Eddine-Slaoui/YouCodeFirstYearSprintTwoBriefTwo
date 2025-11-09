import { makeState, makeEffect, makeQueryParams, makeTitle } from "../core";
import { Card } from "./Card";
import { Filters } from "./Filters";
import { Search } from "./Search";

makeTitle("Tofa7iTS - Home");

const fetchGames = async (url: string) : Promise<any> => {
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};


export const Home = (): HTMLElement => {
  const queryParams: ReturnType<typeof makeQueryParams> = makeQueryParams();

  const container = document.createElement("div") as HTMLDivElement;
  container.className = "mt-[5vh]";

  const render = (): void => {
    let page = 1;
    container.innerHTML = "";

    const filterContainer = document.createElement("div") as HTMLDivElement;
    filterContainer.className = "grid grid-cols-1 gap-y-16";
    filterContainer.append(Search());
    Filters().then((res) => filterContainer.append(res));

    container.append(filterContainer);

    const gamecontainer = document.createElement("div") as HTMLDivElement;
    gamecontainer.className = "grid grid-cols-2 gap-y-10 gap-x-8 p-4 my-10";

    const gameContainerEnd = document.createElement("div") as HTMLDivElement;
    gamecontainer.append(gameContainerEnd);

    makeEffect(async () => {
      const games = await fetchGames(`https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=12`);
      games.forEach((game: any) => {
        gamecontainer.insertBefore(Card(game), gameContainerEnd);
      });
      page++;
    });

    const observer = new IntersectionObserver(async(entries) => {
      if (entries[0].isIntersecting) {
        const games = await fetchGames(
          `https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=12`
        );
        games.forEach((game: any) => {
          gamecontainer.insertBefore(Card(game), gameContainerEnd);
        });
        page++;
      }
    });

    observer.observe(gameContainerEnd);

    container.append(gamecontainer);
  };

  render();

  return container;
};
