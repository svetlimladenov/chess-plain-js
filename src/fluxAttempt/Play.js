import store from "./store.js";

class Play {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    playClicked() {
        store.dispatch({
            type: "PLAY_CLICKED",
            position: {
                x: this.x,
                y: this.y
            }
        });
    }

    render() {
        const playCircle = document.createElement("div");
        playCircle.classList.add("play");
        playCircle.addEventListener("click", this.playClicked.bind(this));
        return playCircle;
    }
}

export default Play;
