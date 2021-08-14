import store from "./store.js";

class Pawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = "../../public/images/figures/pawn-black.png";
        this.name = "pawn";
    }

    showPlayablePositions() {
        const state = store.getState(); // use the state to check if the positions is available for play

        const playPositions = [];

        playPositions.push({
            x: this.x,
            y: this.y + 1
        });

        if (this.y === 1) {
            playPositions.push({
                x: this.x,
                y: this.y + 2
            });
        }

        store.dispatch({
            type: "SHOW_PLAYABLE_POSITIONS",
            playPositions
        });
    }

    render() {
        const figureWrapper = document.createElement("div");
        figureWrapper.className = "figure-wrapper";

        figureWrapper.addEventListener(
            "click",
            this.showPlayablePositions.bind(this)
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
