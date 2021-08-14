import chessReducer from "./chess-reducer.js";
import createStore from "./create-store.js";

const store = createStore(chessReducer);

export default store;
