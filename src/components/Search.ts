import { updateUrl, makeState } from '../core';

const queryParams = new URLSearchParams(window.location.search);
const inputValue: ReturnType<typeof makeState<string>> = makeState<string>(queryParams.get("search") || "");

export const Search = (url: ReturnType<typeof makeState<string>>) : HTMLElement => {
    const container = document.createElement("div") as HTMLDivElement;
    container.className = "w-full h-[4vh] text-center relative px-4 text-[2.5rem]";
    const button = document.createElement("button") as HTMLButtonElement;
    button.className =
      "absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-full w-[15%] flex items-center justify-center bg-inherit border-r-2 border-primary transition duration-300 ease-in-out";
    button.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    container.append(button);

    const input = document.createElement("input") as HTMLInputElement;
    input.className = "w-full h-full border-2 border-primary rounded-[30px] bg-card pl-[20%] transition duration-300 ease-in-out placeholder:text-secondary focus:outline-none focus:border-purple-500";
    input.placeholder = "Search for a game...";
    input.value = inputValue.get();

    input.addEventListener("focus", () => {
        button.classList.remove("border-primary", "text-primary")
        button.classList.add("border-purple-500", "text-purple-500");
    });

    input.addEventListener("blur", () => {
        button.classList.remove("border-purple-500", "text-purple-500")
        button.classList.add("border-primary", "text-primary");
    });

    input.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        inputValue.set(target.value);
        updateUrl(url, "search", inputValue.get() || "");
    });

    container.append(input);
    return container;
};