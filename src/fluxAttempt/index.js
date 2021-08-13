import store from "./store.js";
import Chess from "./Chess.js";

store.dispatch({
    type: "INIT"
});

function render() {
    const state = store.getState();
    const chess = new Chess(state);
    const root = document.getElementById("root");
    if (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    root.appendChild(chess.render());
}

store.subscribe(render); // we rerender on every action, thats a problem which React solves, will not fix it here
render();
