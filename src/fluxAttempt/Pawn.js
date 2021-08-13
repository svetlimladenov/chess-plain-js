import store from "./store.js";

class Pawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = "../../public/images/figures/pawn-black.png";
        this.name = "pawn";
    }

    getPlayPositions() {
        store.dispatch({
            type: "GET_PLAY_POSITIONS",
            position: {
                x: this.x,
                y: this.y
            }
        });
    }

    render() {
        const figureWrapper = document.createElement("div");
        figureWrapper.className = "figure-wrapper";

        figureWrapper.addEventListener(
            "click",
            this.getPlayPositions.bind(this)
        );

        const figureImage = document.createElement("img");
        figureImage.src = this.image;
        figureImage.classList.add("figure");
        figureImage.classList.add(this.name);

        figureWrapper.appendChild(figureImage);
        return figureWrapper;
    }
}

export default Pawn;
