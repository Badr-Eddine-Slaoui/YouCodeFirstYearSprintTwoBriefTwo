import { makeEffect, makeQueryParams, makeState } from "../core";
import { Error } from "../errors/Error";
import { Card } from "./Card";
import { LoadingScreen } from "./LoadingScreen";
import { NoGames } from "./NoGames";

const fetchGames = async (url: string): Promise<any> => {
  const res = await fetch(url);
  const data = await res.json();
  return [data.results, data.next];
};

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const card = entry.target as HTMLDivElement;
      if (entry.isIntersecting) {
        card.classList.remove("opacity-0", "scale-[.5]");
        card.classList.add("opacity-100", "scale-[1]");
      } else {
        card.classList.remove("opacity-100", "scale-[1]");
        card.classList.add("opacity-0", "scale-[.5]");
      }
    });
  }
);

export const Games = (
  queryParams: ReturnType<typeof makeQueryParams>,
  url: ReturnType<typeof makeState<string>>
): HTMLElement => {
  const gamecontainer = document.createElement("div") as HTMLDivElement;
  gamecontainer.className = "grid grid-cols-1 gap-y-5 p-4 my-4 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4 lg:my-8";

  const loadingScreen = LoadingScreen();

  const render = (): void => {
      let page = 1;
      let nextPage = false;
    gamecontainer.innerHTML = "";
    const gameContainerEnd = document.createElement("div") as HTMLDivElement;
    gamecontainer.append(gameContainerEnd);

    const observer = new IntersectionObserver(async (entries) => {
      if (nextPage) {
        loadingScreen.classList.remove("h-screen");
        loadingScreen.classList.add("h-[10vh]", "sm:col-span-2", "md:col-span-3", "xl:col-span-4");
          gamecontainer.append(loadingScreen);
          if (entries[0].isIntersecting) {
            try {
              queryParams.set(makeQueryParams().get());
              const [games, next] = await fetchGames(
                `https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=24&${queryParams.toString()}`
              );
                
              if (!next) nextPage = false;

              loadingScreen.remove();

              games.forEach((game: any) => {
                const card = Card(game);
                gamecontainer.insertBefore(card, gameContainerEnd);
                requestAnimationFrame(() => cardObserver.observe(card));
              });
              page++;
            } catch (error) {
              gamecontainer.innerHTML = "";
              gamecontainer.append(Error(render));
            }
          }
      }
    });

    makeEffect(async () => {
      loadingScreen.classList.add("sm:col-span-2", "md:col-span-3", "xl:col-span-4");
      gamecontainer.append(loadingScreen);
      try {
        const [games, next] = await fetchGames(url.get());
        if (games.length === 0) {
          gamecontainer.append(NoGames("No Games Found"));
          loadingScreen.remove();
          return;
        }
        games.forEach((game: any) => {
          const card = Card(game);
          gamecontainer.insertBefore(card, gameContainerEnd);
          requestAnimationFrame(() => cardObserver.observe(card));
        });

        if (next) nextPage = true;

        page++;
        observer.observe(gameContainerEnd);
        loadingScreen.remove();
      } catch (error) {
        gamecontainer.innerHTML = "";
        gamecontainer.append(Error(render));
      }
    }, []);
  };

  url.subscribe(render);

  render();

  return gamecontainer;
};
