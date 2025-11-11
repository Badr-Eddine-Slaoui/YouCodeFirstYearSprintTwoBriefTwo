import { updateUrl, makeState } from "../core";

const queryParams = new URLSearchParams(window.location.search);
const inputValue: ReturnType<typeof makeState<string>> = makeState<string>(
  queryParams.get("search") || ""
);

export const Search = (
  url: ReturnType<typeof makeState<string>>
): HTMLElement => {
  const container = document.createElement("div") as HTMLDivElement;
  container.className =
    "relative w-full h-[5vh] 2xs:h-[7vh] xs:h-[8vh] sm:h-[9vh] md:h-[10vh] lg:h-[8vh] xl:h-[10vh]" +
    " flex items-center justify-center px-4 text-[0.8rem] 2xs:text-[1rem] xs:text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.4rem] xl:text-[1.6rem]" +
    " lg:w-[45%]";

  const button = document.createElement("button") as HTMLButtonElement;
  button.className =
    "absolute left-4 top-1/2 -translate-y-1/2 " +
    "text-light-primary dark:text-primary border-r-2 border-primary " +
    "flex items-center justify-center " +
    "w-[12%] sm:w-[10%] md:w-[8%] lg:w-[15%] h-[70%] " +
    "bg-inherit rounded-l-[10px] 2xs:rounded-l-[12px] xs:rounded-l-[16px] sm:rounded-l-[18px] md:rounded-l-[22px] lg:rounded-l-[20px] xl:rounded-l-[30px] transition-all duration-300 ease-in-out hover:text-purple-400";
  button.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  container.append(button);

  const input = document.createElement("input") as HTMLInputElement;
  input.className =
    "w-full h-full border-2 border-primary rounded-[10px] 2xs:rounded-[12px] xs:rounded-[16px] sm:rounded-[18px] md:rounded-[22px] lg:rounded-[20px] xl:rounded-[30px] bg-light-card dark:bg-card " +
    "pl-[18%] sm:pl-[14%] md:pl-[10%] lg:pl-[18%] " +
    "text-light-primary dark:text-primary placeholder:text-light-secondary dark:text-secondary " +
    "transition-all duration-300 ease-in-out " +
    "focus:outline-none focus:border-purple-500";
  input.placeholder = "Search for a game...";
  input.value = inputValue.get();

  input.addEventListener("focus", () => {
    button.classList.remove(
      "border-primary",
      "text-light-primary", "dark:text-primary"
    );
    button.classList.add("border-purple-500", "text-purple-500");
  });

  input.addEventListener("blur", () => {
    button.classList.remove("border-purple-500", "text-purple-500");
    button.classList.add(
      "border-primary",
      "text-light-primary", "dark:text-primary"
    );
  });

  input.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    inputValue.set(target.value);
    updateUrl(url, "search", inputValue.get() || "");
  });

  container.append(input);
  return container;
};
