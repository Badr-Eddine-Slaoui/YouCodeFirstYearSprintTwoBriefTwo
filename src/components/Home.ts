import { makeState, makeEffect, makeQueryParams, makeTitle } from "../core";

makeTitle("Tofa7iTS - Home");

const effectDeps = new WeakMap<HTMLElement, any[]>(); 

export const Home = (): HTMLElement => {
  const counter: ReturnType<typeof makeState<number>> = makeState(0);
  const queryParams : ReturnType<typeof makeQueryParams> = makeQueryParams();

  const increment = (): void => {
    counter.set(counter.get() + 1);
  };

  const decrement = (): void => {
    counter.set(counter.get() - 1);
  };

  const container = document.createElement("div") as HTMLDivElement;

  const render = (): void => {
    container.innerHTML = "";

    const el = document.createElement("div") as HTMLDivElement;
    el.className = "p-20 text-center";
    el.innerHTML = `
    <h1 class="text-3xl font-bold text-purple-600 mb-4">Home</h1>
    <p class="text-gray-700">Welcome to Tofa7iTS mini framework</p>
    <p class="text-gray-700 counter">Counter: ${counter.get()}</p>
    <button class="inc bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Increment</button>
    <button class="dec bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Decrement</button>
  `;

    el.querySelector(".inc")?.addEventListener("click", increment);
    el.querySelector(".dec")?.addEventListener("click", decrement);

    container.append(el);

    makeEffect(
      () => {
        console.log("Query Params:", queryParams);
      },
      [counter.get()],
      container,
      effectDeps
    );
  };

  counter.subscribe(render);

  render();

  return container;
};
