import { makeState } from "../core";

export const Nav = (
  currentPath: ReturnType<typeof makeState<string>>,
  navigate: (path: string) => void
): HTMLElement => {
  const el = document.createElement("nav") as HTMLDivElement;
  el.className =
    "flex gap-6 justify-center items-center py-4 bg-white shadow-sm fixed top-0 w-full h-[8vh]";

  const links: { path: string; label: string }[] = [
    { path: "/", label: "Home" },
    { path: "/about/1", label: "About" },
    { path: "/user/1/Tofa7iTS", label: "User" },
  ];

  links.forEach((link: { path: string; label: string }) => {
    const a = document.createElement("a") as HTMLAnchorElement;
    a.href = link.path;
    a.textContent = link.label;
    a.className =
      "text-gray-600 hover:text-purple-600 transition font-medium cursor-pointer";

    if (link.path === currentPath.get()) {
      a.classList.add("text-purple-600", "font-semibold");
    }

    a.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      navigate(link.path);
    });

    currentPath.subscribe((p: string) => {
      if (p === link.path) {
        a.classList.add("text-purple-600", "font-semibold");
      } else {
        a.classList.remove("text-purple-600", "font-semibold");
      }
    });

    el.appendChild(a);
  });

  return el;
};
