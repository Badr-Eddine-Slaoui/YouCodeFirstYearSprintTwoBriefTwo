export const LoadingScreen = (): HTMLElement => {
    const loadingScreen = document.createElement("div") as HTMLDivElement;
    loadingScreen.className = "flex justify-center items-center w-screen h-screen";

    const spinnerContainer = document.createElement("div") as HTMLDivElement;
    spinnerContainer.className = "relative w-[8vh] h-[8vh] bg-card rounded-full";
    loadingScreen.append(spinnerContainer);

    const spinnerIcon = document.createElement("i") as HTMLDivElement;
    spinnerIcon.className = "w-full h-full rounded-full flex justify-center items-center text-[5rem] text-purple-600 fa-solid fa-gamepad";
    spinnerContainer.append(spinnerIcon);

    const spinnerBorder = document.createElement("div") as HTMLDivElement;
    spinnerBorder.className = "absolute top-0 left-0 w-full h-full rounded-full bg-transparent border-4 border-dashed border-purple-600 animate-spin-slow";
    spinnerContainer.append(spinnerBorder);

    return loadingScreen;
}