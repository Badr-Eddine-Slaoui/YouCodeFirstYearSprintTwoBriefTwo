export const LoadingScreen = (): HTMLElement => {
    const loadingScreen = document.createElement("div") as HTMLDivElement;
    loadingScreen.className = "flex justify-center items-center h-[50vh]";

    const spinnerContainer = document.createElement("div") as HTMLDivElement;
    spinnerContainer.className = "relative w-[8vh] h-[8vh] bg-card rounded-full 2xs:w-[10vh] 2xs:h-[10vh] xs:w-[12vh] xs:h-[12vh] sm:w-[14vh] sm:h-[14vh] md:w-[16vh] md:h-[16vh] xl:w-[18vh] xl:h-[18vh]";
    loadingScreen.append(spinnerContainer);

    const spinnerIcon = document.createElement("i") as HTMLDivElement;
    spinnerIcon.className = "w-full h-full rounded-full flex justify-center items-center text-purple-600 fa-solid fa-gamepad"
        + " text-[1.5rem] 2xs:text-[2rem] xs:text-[2.5rem] sm:text-[3rem] lg:text-[3.2rem] xl:text-[3.5rem]";
    spinnerContainer.append(spinnerIcon);

    const spinnerBorder = document.createElement("div") as HTMLDivElement;
    spinnerBorder.className = "absolute top-0 left-0 w-full h-full rounded-full bg-transparent border-4 border-dashed border-purple-600 animate-spin-slow";
    spinnerContainer.append(spinnerBorder);

    return loadingScreen;
}