require.register(
    "Figures",
    ["Pawn", "Rook", "Bishop", "Knight"],
    (Pawn, Rook, Bishop, Knight) => {
        return {
            Pawn,
            Rook,
            Bishop,
            Knight
        };
    }
);
