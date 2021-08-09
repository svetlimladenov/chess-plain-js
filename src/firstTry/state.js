require.register("State", [], () => {
    let state = {
        board: {}, // its probably not a good idea to store it in an object, since the object does not guarantee ordering
        availablePlays: [],
        removedFigures: []
    };
    return state;
});
