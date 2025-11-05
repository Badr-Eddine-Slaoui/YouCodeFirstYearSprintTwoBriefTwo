export const User = (params?: Record<string, string>) : HTMLElement => {
    const { id } = params || {} as Record<string, string>;
    const { name } = params || {} as Record<string, string>;
    const el = document.createElement("div") as HTMLDivElement;
    el.className = "p-20 text-center";
    el.innerHTML = `
        <h1 class="text-3xl font-bold text-purple-600 mb-4">User ${id}</h1>
        <p class="text-gray-700">${name} is a mini framework created by ME and run on Vite with Typescript</p>
    `;
    return el;
}