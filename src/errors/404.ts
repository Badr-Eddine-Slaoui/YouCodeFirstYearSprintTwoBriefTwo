export const NotFound = () : HTMLElement => {
    const el = document.createElement("div") as HTMLDivElement;
    el.className = "p-20 text-center h-[92vh] flex justify-center items-center";
    el.innerHTML = `
        <h1 class="text-5xl font-bold text-purple-600 mb-4">404 Not Found</h1>
    `;
    return el;
};