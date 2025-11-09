import { makeEffect, makeQueryParams, makeState } from "../core";
import { Card } from "./Card";

let favoriterGames = JSON.parse(localStorage.getItem("favoriterGames") || "[]");

const fetchGames = (url: string): any => {
    const params = new URLSearchParams(url);
    let games = favoriterGames;
    const page = parseInt(params.get("page") || "1");
    const limit = parseInt(params.get("limit") || "12");
    
    if (params.get("genre")) {
        const genre = params.get("genre") as string;
        games = games.filter((g: any) =>
          g.genres.map((g: any) => g.slug).includes(genre.toLowerCase())
        );
    }

    if (params.get("platform")) {
        const platform = params.get("platform") as string;
        games = games.filter((g : any) =>
          g.platforms
            .map((p : any) => p.platform.slug)
            .includes(platform.toLowerCase())
        );
    }

    if (params.get("rating")) {
        const rating = params.get("rating") as string;
        games = games.filter((g : any) => g.rating >= parseFloat(rating));
    }

    if (params.get("search")) {
        const search = params.get("search") as string;
        games = games.filter((g : any) =>
          g.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    return [
      games.slice((page - 1) * limit, page * limit),
      games.length > page * limit,
    ];

};

export const FavoriteGames = (
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

    const observer = new IntersectionObserver((entries) => {
        if (nextPage) {
          if (entries[0].isIntersecting) {
            queryParams.set(makeQueryParams().get());
            const [games, next] = fetchGames(
              `page=${page}&limit=12&${queryParams.toString()}`
            );
              
            if (!next) nextPage = false;

            games.forEach((game: any) => {
              gamecontainer.insertBefore(Card(game), gameContainerEnd);
            });
            page++;
          }
      }
    });

    makeEffect(() => {
      const [games, next] = fetchGames(url.get().split("?")[1]);
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
