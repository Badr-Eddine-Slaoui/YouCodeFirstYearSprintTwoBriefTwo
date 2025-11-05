import "./style.css";
import { makeRouter } from "./core";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { User } from "./components/User";

const appRoot = document.getElementById("app") as HTMLDivElement;
const router = makeRouter(appRoot, [
  { path: "/", component: Home },
  { path: "/about/:id", component: About, paramTypes: { id: "number" } },
  {
    path: "/user/:id/:name",
    component: User,
    paramTypes: { id: "number", name: "string" },
  },
]);

document.body.prepend(Nav(router.currentPath, router.navigate));
