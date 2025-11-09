import { updateUrl, type makeState } from "../core";

const getCurrentOption = (key: string): string => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key.toLowerCase()) || "";
}

export const Select = (url: ReturnType<typeof makeState<string>>, options: Array<string>): HTMLElement => {
  const container = document.createElement("div") as HTMLDivElement;
  container.className =
    "relative h-full text-primary rounded-[30px] bg-card transition duration-300 ease-in-out";

  const content = document.createElement("div") as HTMLDivElement;
  content.className =
    "flex items-center justify-center items-center gap-x-2 h-full px-5 cursor-pointer";
    const label = document.createElement("span") as HTMLSpanElement;
    label.className = "truncate min-w-36 max-w-48";
  label.textContent = options[0];
  content.append(label);

  const icon = document.createElement("i") as HTMLDivElement;
  icon.className = "fa-solid fa-chevron-down";
  content.append(icon);

  container.append(content);

  const dropdown = document.createElement("div") as HTMLDivElement;
  dropdown.className =
    "absolute z-10 max-h-[30vh] overflow-y-scroll top-full left-0 bg-card mt-2 rounded-[30px] overflow-hidden hidden flex flex-col gap-y-5";
  container.append(dropdown);

    let placeholder: HTMLDivElement;
  options.forEach((option) => {
    const optionElement = document.createElement("div") as HTMLDivElement;
    optionElement.className = "px-8 py-6 cursor-pointer hover:bg-card";
      if (option === label.textContent) {
        placeholder = optionElement;
        optionElement.classList.add("bg-primary", "bg-opacity-10");
    }
    if (option.toLowerCase() === getCurrentOption(options[0].toLowerCase())) {
        optionElement.classList.add("bg-primary", "bg-opacity-10");
        placeholder.classList.remove("bg-primary", "bg-opacity-10");
        label.textContent = option;
    }
    optionElement.textContent = option;
    dropdown.append(optionElement);
  });

  container.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });
    
  dropdown.addEventListener("click", (event) => {
    event.stopPropagation();

    const clicked = event.target as HTMLElement;

    dropdown.querySelectorAll("div").forEach((el) => {
      el.classList.remove("bg-primary", "bg-opacity-10");
    });
      
      clicked.classList.add("bg-primary", "bg-opacity-10");
      
      const key = options[0].toLowerCase();

    updateUrl(url, key, clicked.textContent.toLowerCase());
    
    label.textContent = clicked.textContent;

    dropdown.classList.add("hidden");
  });

  return container;
};
