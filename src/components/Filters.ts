import { Select } from "./Select";

const url = "https://debuggers-games-api.duckdns.org";

export const Filters = async (): Promise<HTMLElement> => {

    const [{ genres }, { platforms }] = await Promise.all([
        fetch(`${url}/api/genres`).then((res) => res.json()),
        fetch(`${url}/api/platforms`).then((res) => res.json())
    ]);

    const container = document.createElement("div") as HTMLDivElement;
    container.className = "flex h-[4vh] gap-4 justify-start items-center px-4 text-[2.5rem]";

    container.append(Select(["Genre", ...genres]));
    container.append(Select(["Platform", ...platforms]));
    container.append(Select(["Rating", "1", "2", "3", "4", "5"]));

    return container;
}