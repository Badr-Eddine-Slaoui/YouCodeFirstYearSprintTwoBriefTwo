export const ComponentSwitcher = (): HTMLElement => {
  const el = document.createElement("div") as HTMLDivElement;
  el.className =
    "w-screen h-screen fixed top-0 left-0 bg-black opacity-0 animate-switch-component";
  return el;
};
