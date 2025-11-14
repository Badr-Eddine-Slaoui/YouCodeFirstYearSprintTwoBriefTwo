export const NotFound = (): HTMLElement => {
  const el = document.createElement("div") as HTMLDivElement;
  el.className = "p-20 text-center h-[92vh] flex justify-center items-center";
  el.innerHTML = `
        <h1 class="font-bold text-purple-600 mb-4 2xs:text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">404 Not Found</h1>
    `;
  return el;
};
