(() => {
    const $ = require.resolve("$");
    const Board = require.resolve("Board");

    const app = $("#app");

    const board = Object.create(Board); // create an empty object, which has the Board object as its [[Prototype]]
    board.setup(8, "board");
    board.build(app);
})();
