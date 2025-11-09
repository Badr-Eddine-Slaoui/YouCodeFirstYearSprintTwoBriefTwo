import { makeEffect } from "../core";
import { router } from '../main';

let favoriterGames = JSON.parse(localStorage.getItem("favoriterGames") || "[]");

const addToFavorites = (game: any) => {
  favoriterGames.push(game);
  localStorage.setItem("favoriterGames", JSON.stringify(favoriterGames));
};

const removeFromFavorites = (game: any) => {
  favoriterGames = favoriterGames.filter((g: any) => g.id !== game.id);
  localStorage.setItem("favoriterGames", JSON.stringify(favoriterGames));
};

const isFavorite = (game: any) => {
  return favoriterGames.find((g: any) => g.id === game.id);
};

export const GameDetails = (params?: Record<string, string>): HTMLElement => {
    const { id } = params as { id: string };
    let game: any = {};

    const container = document.createElement("div") as HTMLDivElement;
    const header = document.getElementById("header") as HTMLDivElement;
    header.classList.add("hidden");

    const detailsHeader = document.createElement("div") as HTMLDivElement;
    detailsHeader.id = "details-header";
    detailsHeader.className =
      "bg-inherit flex justify-between items-center py-4 px-8 fixed z-20 top-0 w-full h-[6vh] border-b border-card text-[2.5rem]";

    document.body.prepend(detailsHeader);

    const back = document.createElement("i") as HTMLDivElement;
    back.className = "fa-solid fa-arrow-left text-4xl cursor-pointer";
    back.addEventListener("click", () => {
        history.back();
    });
    detailsHeader.append(back);

    const title = document.createElement("h1") as HTMLDivElement;
    title.className = "text-4xl font-bold";
    title.textContent = "Game Details";
    detailsHeader.append(title);

    const themeSwitcher = document.createElement("i") as HTMLDivElement;
    themeSwitcher.innerHTML = `<i class="fa-regular fa-sun cursor-pointer hover:text-purple-600"></i>`;
    detailsHeader.appendChild(themeSwitcher);

    let favoriteBtn = document.createElement("button") as HTMLButtonElement;

    const render = (): void => {
        container.innerHTML = "";
        container.className = "py-16";
        const imageContainer = document.createElement("div") as HTMLDivElement;
        imageContainer.className = "flex w-full h-[30vh] items-center justify-center";

        const image = document.createElement("img") as HTMLImageElement;
        image.src = game.background_image;
        image.alt = game.name;
        image.className = "w-full h-full object-cover";

        imageContainer.append(image);
        container.append(imageContainer);

        const gameDetails = document.createElement("div") as HTMLDivElement;
        gameDetails.className = "p-8 w-[90%] mx-auto relative top-[-8vh] min-h-[30vh] bg-card rounded-[30px] bg-opacity-80 z-[1]";
        container.append(gameDetails);

        const title = document.createElement("h1") as HTMLDivElement;
        title.className = "text-[4rem] font-extrabold mb-6";
        title.textContent = game.name;
        gameDetails.append(title);

        const genresContainer = document.createElement("div") as HTMLDivElement;
        genresContainer.className = "flex flex-wrap gap-16 my-10";
        gameDetails.append(genresContainer);

        game.genres.forEach((genre: any) => {
            const genreEl = document.createElement("span") as HTMLDivElement;
            genreEl.className = "text-[2.5rem] bg-primary text-bold text-card px-6 py-4 min-w-48 rounded-full text-center bg-opacity-30";
            genreEl.textContent = genre.name;
            if (genre.name === "Action") {
                genreEl.classList.add("bg-purple-500", "text-purple-600");
            }
            if (genre.name === "Adventure") {
                genreEl.classList.add("bg-blue-500", "text-blue-600");
            }
            if (genre.name === "Racing") {
                genreEl.classList.add("bg-yellow-500", "text-yellow-600");
            }
            if (genre.name === "Strategy") {
                genreEl.classList.add("bg-green-500", "text-green-600");
            }
            if (genre.name === "Sports") {
                genreEl.classList.add("bg-red-500", "text-red-600");
            }
            if (genre.name === "Shooter") {
                genreEl.classList.add("bg-pink-500", "text-pink-600");
            }
            if (genre.name === "Simulation") {
                genreEl.classList.add("bg-indigo-500", "text-indigo-600");
            }
            if (genre.name === "Puzzle") {
                genreEl.classList.add("bg-orange-500", "text-orange-600");
            }
            if (genre.name === "Indie") {
                genreEl.classList.add("bg-gray-500", "text-black");
            }

            genreEl.textContent = genre.name;
            genresContainer.append(genreEl);
        });

        const platformsContainer = document.createElement("div") as HTMLDivElement;
        platformsContainer.className = "flex flex-wrap gap-16 my-20";
        gameDetails.append(platformsContainer);

        const ratingContainer = document.createElement("div") as HTMLDivElement;
        ratingContainer.className = "flex flex-col justify-start gap-y-4 items-center max-w-44 text-center";
        platformsContainer.append(ratingContainer);

        const ratingIcon = document.createElement("i") as HTMLImageElement;
        ratingIcon.className = "w-[4vh] h-[4vh] text-[3rem] text-primary bg-card rounded-full flex items-center justify-center";
        ratingIcon.classList.add("fa-regular", "fa-star");
        ratingContainer.append(ratingIcon);

        const rating = document.createElement("span") as HTMLDivElement;
        rating.className = "text-[2.5rem] font-bold";
        rating.textContent = game.rating;
        ratingContainer.append(rating);
        
        const releaseDateContainer = document.createElement("div") as HTMLDivElement;
        releaseDateContainer.className = "flex flex-col justify-start gap-y-4 items-center max-w-44 text-center";
        platformsContainer.append(releaseDateContainer);

        const releaseDateIcon = document.createElement("i") as HTMLImageElement;
        releaseDateIcon.className = "w-[4vh] h-[4vh] text-[3rem] text-primary bg-card rounded-full flex items-center justify-center";
        releaseDateIcon.classList.add("fa-regular", "fa-calendar");
        releaseDateContainer.append(releaseDateIcon);

        const releaseDate = document.createElement("span") as HTMLDivElement;
        releaseDate.className = "text-[2.5rem] font-bold";
        releaseDate.textContent = game.released;
        releaseDateContainer.append(releaseDate);

        game.platforms.forEach(({platform}: any) => {
            const platformEl = document.createElement("div") as HTMLDivElement;
            platformEl.className = "flex flex-col justify-start gap-y-4 items-center max-w-40 text-center";
            platformsContainer.append(platformEl);

            const platformIcon = document.createElement("i") as HTMLImageElement;
            platformIcon.className = "w-[4vh] h-[4vh] text-[3rem] text-primary bg-card rounded-full flex items-center justify-center";
            if (platform.name === "PC") {
                platformIcon.classList.add("fa-brands", "fa-windows");
            }else if (platform.name.includes("PlayStation")) {
                platformIcon.classList.add("fa-brands", "fa-playstation");
            }else if (platform.name.includes("Xbox")) {
                platformIcon.classList.add("fa-brands", "fa-xbox");
            }else if (platform.name.includes("iOS") || platform.name.includes("macOS")) {
                platformIcon.classList.add("fa-brands", "fa-apple");
            }else if (platform.name.includes("Android")) {
                platformIcon.classList.add("fa-brands", "fa-android");
            }else if (platform.name.includes("Linux")) {
                platformIcon.classList.add("fa-brands", "fa-linux");
            }else {
                platformIcon.classList.add("fa-solid", "fa-gamepad");
            }
            platformEl.append(platformIcon);

            const platformName = document.createElement("span") as HTMLDivElement;
            platformName.className = "text-[2.5rem] font-bold";
            platformName.textContent = platform.name;
            platformEl.append(platformName);
        });

        const gameAbout = document.createElement("div") as HTMLDivElement;
        gameAbout.className = "p-8 w-[90%] mx-auto relative top-[-4vh] min-h-[30vh] bg-card rounded-[30px] bg-opacity-80";
        container.append(gameAbout);

        const aboutTitle = document.createElement("h2") as HTMLDivElement;
        aboutTitle.className = "text-[4rem] font-extrabold mb-6";
        aboutTitle.textContent = "About";
        gameAbout.append(aboutTitle);

        const aboutText = document.createElement("p") as HTMLDivElement;
        aboutText.className = "text-[2.5rem] font-bold text-secondary";
        aboutText.textContent = game.description;
        gameAbout.append(aboutText);
        
        const infos = document.createElement("div") as HTMLDivElement;
        infos.className = "p-8 w-[90%] mx-auto min-h-[10vh] bg-card rounded-[30px] bg-opacity-80";
        container.append(infos);

        const infosTitle = document.createElement("h2") as HTMLDivElement;
        infosTitle.className = "text-[4rem] font-extrabold mb-6";
        infosTitle.textContent = "Infos";
        infos.append(infosTitle);

        const publishersContainer = document.createElement("div") as HTMLDivElement;
        publishersContainer.className = "flex justify-between items-center my-10";
        infos.append(publishersContainer);

        const publishersText = document.createElement("span") as HTMLDivElement;
        publishersText.className = "text-[2.5rem] font-bold text-secondary";
        publishersText.textContent = "Publishers";
        publishersContainer.append(publishersText);

        const publishers = document.createElement("span") as HTMLDivElement;
        publishers.className = "text-[2.5rem] font-bold text-primary";
        publishers.textContent = game.publishers.map((publisher: any) => publisher.name).join(", ");
        publishersContainer.append(publishers);

        const developersContainer = document.createElement("div") as HTMLDivElement;
        developersContainer.className = "flex justify-between items-center";
        infos.append(developersContainer);

        const developersText = document.createElement("span") as HTMLDivElement;
        developersText.className = "text-[2.5rem] font-bold text-secondary";
        developersText.textContent = "Developers";
        developersContainer.append(developersText);

        const developers = document.createElement("span") as HTMLDivElement;
        developers.className = "text-[2.5rem] font-bold text-primary";
        developers.textContent = game.developers.map((developer: any) => developer.name).join(", ");
        developersContainer.append(developers);
        
        container.append(favoriteBtn);
    };

    const renderFavoritesBtn = (): void => {
        favoriteBtn.innerHTML = "";
        favoriteBtn.className = "w-[90%] mx-auto my-[4vh] flex justify-center items-center px-24 py-6 text-[2.5rem] font-bold text-primary bg-blue-500 rounded-[30px]";

        const favoriteIcon = document.createElement("i") as HTMLDivElement;
        favoriteIcon.className = "mr-4";
        if(isFavorite(game)) {
            favoriteIcon.classList.add("fa-solid", "fa-heart", "text-red-500");
        }else {
            favoriteIcon.classList.add("fa-regular", "fa-heart", "text-primary");
        }
        favoriteBtn.append(favoriteIcon);

        const favoritesText = document.createElement("span") as HTMLDivElement;
        favoritesText.textContent = isFavorite(game) ? "Remove from favorites" : "Add to favorites";
        favoriteBtn.append(favoritesText);

        favoriteBtn.onclick = () => {
          if (isFavorite(game)) {
            removeFromFavorites(game);
          } else {
            addToFavorites(game);
          }
          renderFavoritesBtn();
        };
        container.append(favoriteBtn);
    };
    
    makeEffect(async() => {
        const response = await fetch(`https://debuggers-games-api.duckdns.org/api/games/${id}`);
        game = await response.json();
        render();
        renderFavoritesBtn();
    }, []);
    

    return container;
}