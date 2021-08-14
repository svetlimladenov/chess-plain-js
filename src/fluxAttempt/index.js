import store from "./store.js";
import Chess from "./chess.js";

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

// currently we are in a pretty good "state" with our flow, with adapting the FLUX pattern

// But the rendering layer is still a little bit different, currently we re-render the whole DOM, which is not what we really want,
// Thats where React comes to save the day
