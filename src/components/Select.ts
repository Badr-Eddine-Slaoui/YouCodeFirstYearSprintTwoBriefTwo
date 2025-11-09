export const Select = (options: Array<string>): HTMLElement => {
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
    "absolute max-h-[30vh] overflow-y-scroll top-full left-0 bg-card mt-2 rounded-[30px] overflow-hidden hidden flex flex-col gap-y-5";
  container.append(dropdown);

  options.forEach((option) => {
    const optionElement = document.createElement("div") as HTMLDivElement;
    optionElement.className = "px-8 py-6 cursor-pointer hover:bg-card";
    if (option === label.textContent) {
      optionElement.classList.add("bg-primary", "bg-opacity-10");
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

    label.textContent = clicked.textContent;

    dropdown.classList.add("hidden");
  });

  return container;
};
