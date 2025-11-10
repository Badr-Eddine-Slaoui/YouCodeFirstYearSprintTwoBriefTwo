export const NoGames = (): HTMLElement => {
  const el = document.createElement("div") as HTMLDivElement;
  el.className = "p-20 text-center h-[50vh] flex justify-center items-center sm:col-span-2 md:col-span-3 xl:col-span-4";
  el.innerHTML = `
        <h1 class="font-bold text-purple-600 mb-4 text-lg 2xs:text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">No Games In Favorites</h1>
    `;
  return el;
};
