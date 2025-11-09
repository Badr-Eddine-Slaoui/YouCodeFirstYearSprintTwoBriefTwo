import "./style.css";
import { makeRouter } from "./core";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Favorites } from "./components/Favorites";

const appRoot = document.getElementById("app") as HTMLDivElement;
const router = makeRouter(appRoot, [
  { path: "/", component: Home },
  { path: "/favorites", component: Favorites }
]);

document.body.prepend(Nav(router.currentPath, router.navigate));
