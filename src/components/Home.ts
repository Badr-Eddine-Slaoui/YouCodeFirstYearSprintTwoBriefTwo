import { makeState, makeEffect, makeQueryParams, makeTitle } from "../core";
import { Filters } from "./Filters";
import { Search } from "./Search";

makeTitle("Tofa7iTS - Home");


export const Home = (): HTMLElement => {
  const queryParams: ReturnType<typeof makeQueryParams> = makeQueryParams();

  const container = document.createElement("div") as HTMLDivElement;
  container.className = "mt-[5vh]";

  const render = (): void => {
    container.innerHTML = "";

    const filterContainer = document.createElement("div") as HTMLDivElement;
    filterContainer.className = "grid grid-cols-1 gap-y-16";
    filterContainer.append(Search());
    Filters().then((res) => filterContainer.append(res));

    container.append(filterContainer);

    const el = document.createElement("div") as HTMLDivElement;
    el.className = "text-center";
    el.innerHTML = `<h1 class="text-3xl font-bold text-purple-600 mb-4">Home</h1>`

    container.append(el);
  };

  render();

  return container;
};
