import { makeTitle } from "../core";

makeTitle("Tofa7iTS - About");

export const About = (params?: Record<string, string>): HTMLElement => {
  const { id } = params || ({} as Record<string, string>);
  const el = document.createElement("div") as HTMLDivElement;
  el.className = "p-20 text-center";
  el.innerHTML = `
    <h1 class="text-3xl font-bold text-purple-600 mb-4">About ${id}</h1>
    <p class="text-gray-700">Tofa7iTS is a mini framework created by ME and run on Vite with Typescript</p>
  `;
  return el;
};
