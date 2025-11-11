export const Error = (callback: () => void, msg?: string): HTMLElement => {
    const el = document.createElement("div") as HTMLDivElement;
    el.className =
      "p-5 text-center h-[50vh] order-2 w-full flex flex-col gap-y-5 justify-center items-center 2xs:gap-y-6 xs:gap-y-8 sm:gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16 sm:col-span-2 md:col-span-3 xl:col-span-4 2xs:h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh]";
    el.innerHTML = `
                <h1 class="font-extrabold text-purple-600 text-lg 2xs:text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">${
                  msg ? msg : "Something went wrong"
                }</h1>
                <button id="try-again" class="bg-purple-400 bg-opacity-30 text-white px-8 py-2 rounded-md hover:bg-purple-700 transition duration-300 text-sm 2xs:text-lg xs:text-xl sm:text-2xl md:text-3xl md:py-3 lg:py-4 xl:py-5">Try Again</button>
        `;
  
    const button = el.querySelector("#try-again") as HTMLButtonElement;
    button.addEventListener("click", () => {
      callback();
    });
    return el;
};