import figuresData from "../figure/figuresData";

function generateStartBoard() {
  return Array(64)
    .fill(null)
    .map((box, idx) => {
      if (idx >= 8 && idx <= 15) {
        return figuresData.PAWN_BLACK.name;
      }

      if (idx === 0 || idx === 7) {
        return figuresData.ROOK_BLACK.name;
      }

      return box;
    });
}

function generateEmptyBoard() {
  return Array(64).fill(null);
}

export { generateStartBoard, generateEmptyBoard };
