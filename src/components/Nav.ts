import { makeState } from "../core";

export const Nav = (
  currentPath: ReturnType<typeof makeState<string>>,
  navigate: (path: string) => void
): HTMLElement => {
  const header = document.createElement("header") as HTMLDivElement;
  header.className =
    "bg-inherit flex justify-between items-center p-4 fixed top-0 w-full h-[5vh] border-b border-card text-[2.5rem]";
  
  const logoContainer = document.createElement('div') as HTMLDivElement;
  logoContainer.className = "flex items-center ml-4 h-full w-1/4";
  header.appendChild(logoContainer);

  const logo = document.createElement('img') as HTMLImageElement;
  logo.src = '/images/logo.png';
  logo.alt = 'logo';
  logo.className = 'w-full cursor-pointer';
  logo.addEventListener('click', () => {
    navigate('/');
  });
  logoContainer.appendChild(logo);

  const nav = document.createElement('nav') as HTMLDivElement;
  nav.className = "flex items-center h-full gap-x-10";
  header.appendChild(nav);

  const path: string = "/favorites";

  const a = document.createElement("a") as HTMLAnchorElement;
  a.href = path;
  a.innerHTML = `<i class="fa-regular fa-heart"></i>`;
  a.className = "hover:text-purple-600 transition cursor-pointer";

  if (path === currentPath.get()) {
    a.classList.add("text-purple-600");
  }

  a.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    navigate(path);
  });

  currentPath.subscribe((p: string) => {
    if (p === path) {
      a.classList.add("text-purple-600");
    } else {
      a.classList.remove("text-purple-600");
    }
  });

  nav.appendChild(a);

  const themeSwitcher = document.createElement("i") as HTMLDivElement;
  themeSwitcher.innerHTML = `<i class="fa-regular fa-sun cursor-pointer hover:text-purple-600"></i>`;
  nav.appendChild(themeSwitcher);

  return header;
};
