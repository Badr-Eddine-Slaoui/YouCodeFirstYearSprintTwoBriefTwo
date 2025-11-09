export const Card = (game : any) : HTMLElement =>{
    const card = document.createElement("div") as HTMLDivElement;
    card.className = "h-[30vh] w-full bg-card rounded-[30px] overflow-hidden";

    const imgContainer = document.createElement("div") as HTMLDivElement;
    imgContainer.className = "h-2/3 relative";
    card.append(imgContainer);

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
    genre.textContent = game.genres.map((genre: any) => genre.name).join(", ");
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

    return card;
}