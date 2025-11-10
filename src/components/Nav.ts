import { makeState } from "../core";

export const Nav = (
  currentPath: ReturnType<typeof makeState<string>>,
  navigate: (path: string) => void
): HTMLElement => {
  const header = document.createElement("header") as HTMLDivElement;
  header.id = "header";
  header.className =
    "bg-inherit flex justify-between items-center fixed top-0 left-0 z-20 w-full border-b border-card " +
    "p-3 h-[6vh] text-[.8rem] " +
    "2xs:p-4 2xs:h-[8vh] 2xs:text-[1rem] " +
    "xs:p-6 xs:h-[9vh] xs:text-[1.2rem] " +
    "sm:p-8 sm:h-[10vh] sm:text-[1.4rem] " +
    "md:p-8 md:h-[12vh] md:text-[1.6rem] " +
    "lg:p-10 lg:h-[14vh] lg:text-[1.8rem] " +
    "xl:p-12 xl:h-[16vh] xl:text-[2rem] " +
    "transition-all duration-300 ease-in-out";

  const logoContainer = document.createElement("div") as HTMLDivElement;
  logoContainer.className =
    "flex items-center h-full w-[15%] min-w-[100px] ml-2 sm:ml-4";
  header.appendChild(logoContainer);

  const logo = document.createElement("img") as HTMLImageElement;
  logo.src = "/images/logo.png";
  logo.alt = "logo";
  logo.className =
    "w-full cursor-pointer hover:opacity-80 transition duration-300";
  logo.addEventListener("click", () => navigate("/"));
  logoContainer.appendChild(logo);

  const nav = document.createElement("nav") as HTMLDivElement;
  nav.className = "flex items-center h-full gap-x-6 sm:gap-x-8 md:gap-x-10";
  header.appendChild(nav);

  const path: string = "/favorites";

  const a = document.createElement("a") as HTMLAnchorElement;
  a.id = "favorites";
  a.href = path;
  a.innerHTML = `<i class="fa-regular fa-heart"></i>`;
  a.className =
    "hover:text-purple-600 transition-colors duration-300 cursor-pointer";

  if (path === currentPath.get()) {
    a.classList.add("text-purple-600");
  }

  a.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    navigate(path);
  });

  currentPath.subscribe((p: string) => {
    if (p === path) a.classList.add("text-purple-600");
    else a.classList.remove("text-purple-600");
  });

  nav.appendChild(a);

  const themeSwitcher = document.createElement("i") as HTMLDivElement;
  themeSwitcher.innerHTML = `<i class="fa-regular fa-sun cursor-pointer hover:text-purple-600 transition-colors duration-300"></i>`;
  nav.appendChild(themeSwitcher);

  return header;
};
