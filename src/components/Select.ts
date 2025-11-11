import { updateUrl, type makeState } from "../core";

const getCurrentOption = (key: string): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key.toLowerCase()) || "";
};

export const Select = (
  url: ReturnType<typeof makeState<string>>,
  options: Array<string>
): HTMLElement => {
  const container = document.createElement("div") as HTMLDivElement;
  container.className =
    "relative min-h-[4vh] border border-card text-light-primary dark:text-primary rounded-[10px] 2xs:rounded-[12px] xs:rounded-[16px] sm:rounded-[18px] md:rounded-[22px] lg:rounded-[24px] xl:rounded-[30px] bg-light-card dark:bg-card transition duration-300 ease-in-out";

  const content = document.createElement("div") as HTMLDivElement;
  content.className =
    "flex items-center justify-between gap-x-2 min-h-[4vh] px-4 2xs:py-2 xs:py-4 sm:px-5 lg:px-4 cursor-pointer select-none";

  const label = document.createElement("span") as HTMLSpanElement;
  label.className = "truncate max-w-[12rem] sm:max-w-[16rem]";
  label.textContent = options[0];
  content.append(label);

  const icon = document.createElement("i") as HTMLDivElement;
  icon.className = "fa-solid fa-chevron-down";
  content.append(icon);

  container.append(content);

  const dropdown = document.createElement("div") as HTMLDivElement;
  dropdown.className =
    "absolute z-10 max-h-[30vh] overflow-y-auto top-full left-0 bg-light-card border border-card dark:bg-card mt-2 rounded-[10px] 2xs:rounded-[12px] xs:rounded-[16px] sm:rounded-[18px] md:rounded-[22px] lg:rounded-[26px] xl:rounded-[30px] hidden flex-col gap-y-2 shadow-lg";
  container.append(dropdown);

  let placeholder: HTMLDivElement | null = null;

  options.forEach((option) => {
    const optionElement = document.createElement("div") as HTMLDivElement;
    optionElement.className =
      "px-6 py-3 cursor-pointer hover:bg-light-card dark:bg-card transition-colors truncate";
    optionElement.textContent = option;

    if (option === label.textContent) {
      placeholder = optionElement;
      optionElement.classList.add(
        "text-light-primary", "dark:text-primary",
        "bg-opacity-10"
      );
    }

    if (option.toLowerCase() === getCurrentOption(options[0].toLowerCase())) {
      optionElement.classList.add(
        "text-light-primary", "dark:text-primary",
        "bg-opacity-10"
      );
      placeholder?.classList.remove(
        "text-light-primary", "dark:text-primary",
        "bg-opacity-10"
      );
      label.textContent = option;
    }

    dropdown.append(optionElement);
  });

  container.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
    const clicked = event.target as HTMLElement;
    if (!clicked) return;

    dropdown.querySelectorAll("div").forEach((el) => {
      el.classList.remove(
        "text-light-primary", "dark:text-primary",
        "bg-opacity-10"
      );
    });

    clicked.classList.add(
      "text-light-primary", "dark:text-primary",
      "bg-opacity-10"
    );

    const key = options[0].toLowerCase();
    updateUrl(url, key, clicked.textContent?.toLowerCase() || "");

    label.textContent = clicked.textContent || "";
    dropdown.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target as Node)) {
      dropdown.classList.add("hidden");
    }
  });

  return container;
};
