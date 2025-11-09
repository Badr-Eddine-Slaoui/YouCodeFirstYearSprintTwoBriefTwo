import { makeEffect, makeQueryParams, makeState } from "../core";
import { Card } from "./Card";

const fetchGames = async (url: string): Promise<any> => {
  const res = await fetch(url);
  const data = await res.json();
  return [data.results, data.next];
};

export const Games = (
  queryParams: ReturnType<typeof makeQueryParams>,
  url: ReturnType<typeof makeState<string>>
): HTMLElement => {
  const gamecontainer = document.createElement("div") as HTMLDivElement;
  gamecontainer.className = "grid grid-cols-2 gap-y-10 gap-x-8 p-4 my-10";
  const render = (): void => {
      let page = 1;
      let nextPage = false;
    gamecontainer.innerHTML = "";
    const gameContainerEnd = document.createElement("div") as HTMLDivElement;
    gamecontainer.append(gameContainerEnd);

    const observer = new IntersectionObserver(async (entries) => {
        if (nextPage) {
          if (entries[0].isIntersecting) {
            queryParams.set(makeQueryParams().get());
            const [games, next] = await fetchGames(
              `https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=12&${queryParams.toString()}`
            );
              
            if (!next) nextPage = false;

            games.forEach((game: any) => {
              gamecontainer.insertBefore(Card(game), gameContainerEnd);
            });
            page++;
          }
      }
    });

    makeEffect(async () => {
      const [games, next] = await fetchGames(url.get());
      games.forEach((game: any) => {
        gamecontainer.insertBefore(Card(game), gameContainerEnd);
      });
      if (next) nextPage = true;
      page++;
      observer.observe(gameContainerEnd);
    });
  };

  url.subscribe(render);

  render();

  return gamecontainer;
};
