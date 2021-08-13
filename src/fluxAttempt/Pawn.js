class Pawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = "../../public/images/figures/pawn-black.png";
        this.name = "pawn";
    }

    render() {
        const figureWrapper = document.createElement("div");
        figureWrapper.className = "figure-wrapper";

        const figureImage = document.createElement("img");
        figureImage.src = this.image;
        figureImage.classList.add("figure");
        figureImage.classList.add(this.name);

        figureWrapper.appendChild(figureImage);
        return figureWrapper;
    }
}

export default Pawn;
