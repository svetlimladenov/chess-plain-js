(() => {
    const $ = require.resolve("$");
    const Board = require.resolve("Board");

    const app = $("#app");

    const board = Object.create(Board); // create an empty object, which has the Board object as its [[Prototype]]
    board.setup(8, "board");
    // init(..) is taken from the [[Prototype]] chain, and is setting this.size to 8,
    // in this case 'this' is bound to tthe const board object. implicit binding
    board.build(app);
})();
