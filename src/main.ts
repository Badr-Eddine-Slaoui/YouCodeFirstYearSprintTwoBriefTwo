import "./style.css";
import { makeRouter } from "./core";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Favorites } from "./components/Favorites";
import { GameDetails } from "./components/GameDetails";

const appRoot = document.getElementById("app") as HTMLDivElement;
export const router = makeRouter(appRoot, [
  { path: "/", component: Home },
  { path: "/favorites", component: Favorites },
  { path: "/game/:id", component: GameDetails, paramTypes: { id: "number" } },
]);

document.body.prepend(Nav(router.currentPath, router.navigate));
