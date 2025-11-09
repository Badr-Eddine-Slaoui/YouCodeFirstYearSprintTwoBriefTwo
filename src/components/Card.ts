import { router } from "../main";

let favoriterGames = JSON.parse(localStorage.getItem("favoriterGames") || "[]");


const addToFavorites = (game: any) => {
    favoriterGames.push(game);
    localStorage.setItem("favoriterGames", JSON.stringify(favoriterGames));
};

const removeFromFavorites = (game: any) => {
    favoriterGames = favoriterGames.filter((g : any) => g.id !== game.id);
    localStorage.setItem("favoriterGames", JSON.stringify(favoriterGames));
};

const isFavorite = (game: any) => {
    return favoriterGames.find((g : any) => g.id === game.id);
};

export const Card = (game: any): HTMLElement => {
    const card = document.createElement("div") as HTMLDivElement;
    card.className = "h-[30vh] w-full bg-card rounded-[30px] overflow-hidden";

    const render = (): void => {
        card.innerHTML = "";
        
        const imgContainer = document.createElement("div") as HTMLDivElement;
        imgContainer.className = "h-2/3 relative";
        card.append(imgContainer);

        const overlay = document.createElement("div") as HTMLDivElement;
        overlay.className =
          "absolute top-0 left-0 w-full h-full bg-black opacity-25 hover:opacity-0 transition duration-300 ease-in-out";
        imgContainer.append(overlay);

        const icon = document.createElement("i") as HTMLDivElement;
        icon.className =
          "absolute top-4 right-4 transform z-[1] bg-card p-4 rounded-full w-[4vh] h-[4vh] flex items-center justify-center text-[3rem] bg-opacity-50 cursor-pointer";

        if (isFavorite(game)) {
          icon.classList.add("text-red-500", "fa-solid", "fa-heart");
          icon.addEventListener("click", () => {
              removeFromFavorites(game);
              render();
          });
        } else {
          icon.classList.add("text-primary", "fa-regular", "fa-heart");
          icon.addEventListener("click", () => {
              addToFavorites(game);
              render();
          });
        }

        imgContainer.append(icon);

        const img = document.createElement("img") as HTMLImageElement;
        img.src = game.background_image;
        img.alt = game.name;
        img.className = "w-full h-full object-cover";
        imgContainer.append(img);

        const content = document.createElement("div") as HTMLDivElement;
        content.className = "h-1/3 p-8 flex flex-col justify-between";
        card.append(content);

        const title = document.createElement("h3") as HTMLHeadingElement;
        title.className = "text-[3rem] font-extrabold w-82 truncate";
        title.textContent = game.name;
        content.append(title);

        const genre = document.createElement("p") as HTMLParagraphElement;
        genre.className = "text-[2rem] text-secondary w-82 truncate";
        genre.textContent = game.genres
          .map((genre: any) => genre.name)
          .join(", ");
        content.append(genre);

        const ratingContainer = document.createElement("div") as HTMLDivElement;
        ratingContainer.className = "flex items-center justify-between";
        content.append(ratingContainer);

        const rating = document.createElement("p") as HTMLParagraphElement;
        rating.className = "text-[2rem] text-secondary";
        rating.innerHTML = `<i class="fa-regular fa-star text-yellow-400"></i> ${game.rating}`;
        ratingContainer.append(rating);

        const releaseDate = document.createElement("p") as HTMLParagraphElement;
        releaseDate.className = "text-[2rem] text-secondary";
        releaseDate.textContent = `${game.released}`;
        ratingContainer.append(releaseDate);
    }

  render();
  
    card.addEventListener("click", () => {
        router.navigate(`/game/${game.id}`);
    });

    return card;
}