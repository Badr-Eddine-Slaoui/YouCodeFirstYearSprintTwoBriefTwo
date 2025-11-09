import { ComponentSwitcher } from "./components/CoponentSwitcher";
import { NotFound } from "./errors/404";

const typeValidators: Record<string, RegExp> = {
  string: /^.+$/,
  number: /^\d+$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

export const makeState = <T>(initial: T): {
  get: () => T;
  set: (newValue: T) => void;
  subscribe: (listener: (v: T) => void) => void;
} => {
  let value: T = initial;
  const listeners: ((v: T) => void)[] = [];

  const get = () : T => value;
  const set = (newValue: T) : void => {
    value = newValue;
    listeners.forEach((l) => l(value));
  };
  const subscribe = (listener: (v: T) => void) : void => {
    listeners.push(listener);
  };

  return { get, set, subscribe };
}

type Route = {
  path: string;
  component: (params?: Record<string, string>) => HTMLElement;
  paramTypes?: Record<string, "string" | "number" | "uuid" | "slug">;
};

const matchRoute = (
  pathname: string,
  route: Route
): Record<string, string> | null =>{
  const routeParts : string[] = route.path.split("/").filter(Boolean);
  const pathParts : string[] = pathname.split("/").filter(Boolean);

  if (routeParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      const key : string = routeParts[i].slice(1);
      const value : string = decodeURIComponent(pathParts[i]);

      const typeName = route.paramTypes?.[key] || "string";
      const validator : RegExp = typeValidators[typeName];

      if (!validator.test(value)) return null;

      params[key] = value;
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

export const makeRouter = (root: HTMLElement, routes: Route[]) : {
  currentPath: ReturnType<typeof makeState<string>>;
  navigate: (path: string) => void;
} => {
  const currentPath : ReturnType<typeof makeState<string>> = makeState<string>(window.location.pathname || "/");

  const render = () : void => {
    const path : string = window.location.pathname || "/";
    currentPath.set(path);

    let matched: { route: Route; params: Record<string, string> } | null = null;

    for (const r of routes) {
      const params : Record<string, string> | null = matchRoute(path, r);
      if (params) {
        matched = { route: r, params };
        break;
      }
    }

    const componentSwitcher : HTMLElement = ComponentSwitcher();
    root.innerHTML = "";
    root.appendChild(componentSwitcher);

    setTimeout(() => {
      if (matched) root.appendChild(matched.route.component(matched.params));
      else root.appendChild(NotFound());
      setTimeout(() => componentSwitcher.remove(), 1100);
    }, 100);
  };

  window.addEventListener("popstate", render);

  const navigate = (path: string) : void => {
    if (!path.startsWith("/")) path = `/${path}`;
    window.history.pushState({}, "", path);
    render();
  };

  render();

  return { currentPath, navigate };
}

export const makeTitle = (title: string): void => {
  document.title = title;
}


export const makeEffect = (
  callback: () => void,
  deps?: any[],
  container?: HTMLElement,
  depsMap?: WeakMap<HTMLElement, any[]>
) => {
  if (!deps || !container || !depsMap) {
    callback();
    return;
  }

  const prevDeps = depsMap.get(container);

  let hasChanged = true;

  if (prevDeps) {
    hasChanged = deps.some((dep, i) => dep !== prevDeps[i]);
  }

  if (hasChanged) {
    callback();
    depsMap.set(container, deps);
  }
}

export const makeQueryParams = () : ReturnType<typeof makeState<Record<string, string>>> => {
  const params = new URLSearchParams(window.location.search);
  const query: ReturnType<typeof makeState<Record<string, string>>> = makeState<Record<string, string>>({});
  params.forEach((v, k) => (query.set({ ...query.get(), [k]: v })));
  query.toString = () => {
    return Object.entries(query.get())
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
  };
  return query;
}

export const updateUrl = (
  url: ReturnType<typeof makeState<string>>,
  key: string,
  value: string
): void => {
  const params = new URLSearchParams(window.location.search);
  params.delete(key);

  if (key && value && key !== value) params.set(key, value.replace(/\s+/g, "-").toLowerCase());

  const apiUrl = url.get().split("?")[0];
  const paramsStr = params.toString();
  url.set(`${apiUrl}?page=1&limit=12&${paramsStr}`);

  const currentPath = window.location.pathname;

  window.history.pushState({}, "", `${currentPath}${paramsStr ? `?${paramsStr}` : ""}`);
};
