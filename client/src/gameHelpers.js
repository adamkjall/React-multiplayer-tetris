export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// Array.from() creates a new, shallow-copied
// Array instance from an array-like or iterable
// object. Second argument is map function to call
// on every element of the array
export const createStage = () =>
  Array.from(new Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[0].length; x++) {

      // Check that we're on an actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        const isValidVerticalMove = stage[y + player.pos.y + moveY];
        const isValidHorizontalMove = isValidVerticalMove ? isValidVerticalMove[x + player.pos.x + moveX] : undefined;
        const isCellClear = isValidHorizontalMove ? isValidHorizontalMove[1] === "clear" : false;
        
        if(!isValidVerticalMove || !isValidHorizontalMove || !isCellClear) {
          return true;
        }
      }
    }
  }
};
