import { router } from "../main";

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

export const Card = (game: any): HTMLElement => {
  const card = document.createElement("div") as HTMLDivElement;
  card.className =
    "h-[40vh] w-full bg-card rounded-[10px] overflow-hidden xs:h-[45vh] lg:h-[55vh] xl:h-[65vh]" +
    " text-[0.8rem] 2xs:text-[1rem] xs:text-[1.2rem] sm:text-[1.4rem] md:text-[1.1rem] lg:text-[1.5rem] xl:text-[1.6rem]";

  card.dataset.id = game.id.toString();
  card.dataset.game = JSON.stringify(game);

  const render = (): void => {
    card.innerHTML = "";

    const imgContainer = document.createElement("div") as HTMLDivElement;
    imgContainer.className = "h-3/5 relative";
    card.append(imgContainer);

    const overlay = document.createElement("div") as HTMLDivElement;
    overlay.className =
      "absolute top-0 left-0 w-full h-full bg-black opacity-25 hover:opacity-0 transition duration-300 ease-in-out";
    imgContainer.append(overlay);

    const icon = document.createElement("i") as HTMLDivElement;
    icon.className =
      "absolute top-2 right-2 transform z-[1] bg-card p-2 rounded-full w-[4vh] h-[4vh] flex items-center justify-center bg-opacity-50 cursor-pointer" +
      " xs:w-[5vh] xs:h-[5vh] xs:p-4 xs:top-3 xs:right-3 lg:w-[6vh] lg:h-[6vh] lg:p-6 lg:top-4 lg:right-4";

    if (isFavorite(game)) {
      icon.classList.add("text-red-500", "fa-solid", "fa-heart");
      icon.addEventListener("click", (e) => {
        e.stopPropagation();
        removeFromFavorites(game);
        render();
      });
    } else {
      icon.classList.add("text-primary", "fa-regular", "fa-heart");
      icon.addEventListener("click", (e) => {
        e.stopPropagation();
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
    content.className =
      "h-2/5 p-4 flex flex-col justify-between 2xs:p-6 xs:p-4 lg:p-7";
    card.append(content);

    const title = document.createElement("h3") as HTMLHeadingElement;
    title.className = "font-extrabold w-82 truncate";
    title.textContent = game.name;
    content.append(title);

    const genre = document.createElement("p") as HTMLParagraphElement;
    genre.className = "text-secondary w-82 truncate";
    genre.textContent = game.genres.map((genre: any) => genre.name).join(", ");
    content.append(genre);

    const ratingContainer = document.createElement("div") as HTMLDivElement;
    ratingContainer.className = "flex items-center justify-between";
    content.append(ratingContainer);

    const rating = document.createElement("p") as HTMLParagraphElement;
    rating.className = "text-secondary";
    rating.innerHTML = `<i class="fa-regular fa-star text-yellow-400"></i> ${game.rating}`;
    ratingContainer.append(rating);

    const releaseDate = document.createElement("p") as HTMLParagraphElement;
    releaseDate.className = "text-secondary";
    releaseDate.textContent = `${game.released}`;
    ratingContainer.append(releaseDate);

    card.setAttribute("draggable", "true");

    card.addEventListener("dragstart", (e) => {
      const draggedCard = e.currentTarget as HTMLDivElement;

      e.dataTransfer?.setData(
        "draggedCardId",
        draggedCard?.dataset?.id as string
      );

      const favorite = document.getElementById("favorites") as HTMLDivElement;

      const isInFavorites = favoriterGames.find(
        (g: any) => g.id === parseInt(draggedCard?.dataset?.id as string)
      );

      if (isInFavorites) {
        favorite.children[0].classList.remove("fa-heart");
        favorite.children[0].classList.add("fa-trash-can");
      }else{
        favorite.children[0].classList.remove("fa-trash-can");
        favorite.children[0].classList.add("fa-heart");
      }

      const ghostCard = card.cloneNode(true) as HTMLDivElement;
      ghostCard.style.width = `${card.offsetWidth / 2}px`;
      ghostCard.style.height = `${card.offsetHeight / 2}px`;
      ghostCard.style.fontSize = `${
        parseFloat(getComputedStyle(card).fontSize) / 2
      }px`;
      ghostCard.querySelector("i.fa-heart")?.remove();

      document.body.appendChild(ghostCard);

      e.dataTransfer?.setDragImage(
        ghostCard,
        ghostCard.offsetWidth / 2,
        ghostCard.offsetHeight / 2
      );

      setTimeout(() => {
        document.body.removeChild(ghostCard);
      }, 0);

      card.classList.add("opacity-50", "cursor-grabbing");
    });

    card.addEventListener("drag", (e) => {
      
      const current = e.currentTarget as HTMLDivElement;

      card.classList.add(
        "opacity-50",
        "scale-[0.5]",
        "cursor-grabbing",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );

      if (e.clientY < current.offsetTop - 400 || e.clientY > current.offsetTop + 400) {
        window.scrollBy({
          top: e.clientY - current.offsetTop,
          behavior: "smooth",
        });
      }
    });

    card.addEventListener("dragover", (e) => {
       e.preventDefault();

       const container = card.parentElement as HTMLDivElement;
       const rect = container.getBoundingClientRect();
       const scrollSpeed = 10;

       if (e.clientY < rect.top + 50) {
         container.scrollBy({ top: -scrollSpeed, behavior: "smooth" });
       } else if (e.clientY > rect.bottom - 50) {
         container.scrollBy({ top: scrollSpeed, behavior: "smooth" });
       }

      card.classList.add(
        "opacity-50",
        "scale-[0.5]",
        "cursor-grabbing",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    });

    card.addEventListener("dragend", (e) => {
      e.preventDefault();
      const card = e.currentTarget as HTMLDivElement;
      card.classList.remove(
        "opacity-50",
        "scale-[0.5]",
        "cursor-grabbing",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove(
        "opacity-50",
        "scale-[0.5]",
        "cursor-grabbing",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    });

    card.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedCardId = e.dataTransfer?.getData("draggedCardId");
      const draggedCard = document.querySelector(
        `[data-id="${draggedCardId}"]`
      ) as HTMLDivElement;

      const draggedOverCard = e.currentTarget as HTMLDivElement;
      const container = draggedOverCard.parentElement as HTMLDivElement;

      const nextSibling = draggedCard.nextElementSibling as HTMLDivElement;

      draggedOverCard.classList.remove(
        "opacity-50",
        "scale-[0.5]",
        "cursor-grabbing",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );

      container.insertBefore(draggedCard, draggedOverCard);
      container.insertBefore(draggedOverCard, nextSibling);
    });

    const favorite = document.getElementById("favorites") as HTMLDivElement;
    favorite.ondragover = (e) => {
      e.preventDefault();
    };
    favorite.ondrop =  (e) => {
      e.preventDefault();
      const draggedCardId = e.dataTransfer?.getData("draggedCardId") as string;
      const draggedCard = document.querySelector(
        `[data-id="${draggedCardId}"]`
      ) as HTMLDivElement;

      const currentGame = JSON.parse(draggedCard.dataset.game as string);
      
      const isInFavorites = favoriterGames.find((g: any) => g.id === parseInt(draggedCardId));

      if (isInFavorites) {
        removeFromFavorites(currentGame);
        if(window.location.pathname === "/favorites") draggedCard.remove();
      } else {
        addToFavorites(currentGame);
      }
      favorite.children[0].classList.remove("fa-trash-can");
      favorite.children[0].classList.add("fa-heart");
      const cardComponent = Card(currentGame);
      draggedCard.replaceWith(cardComponent);
    };
  };

  render();

  card.addEventListener("click", () => {
    router.navigate(`/game/${game.id}`);
  });

  return card;
};
