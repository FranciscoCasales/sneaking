const matrixToDivList = (row: number[]): (HTMLDivElement | null)[] => {
  return row.map((cell, i) => {
    const signCell = document.createElement('div') as HTMLDivElement;
    signCell.style.setProperty('--slot-number', `${i + 1}`);
    if (cell === 1) {
      signCell.classList.add('filled-slot');
      return signCell;
    }
    if (cell === 5) {
      signCell.classList.add('empty-slot');
      return signCell;
    }
    return null;
  });
};

function isNotNull<Div>(value: Div | null): value is Div {
  return value !== null;
}

const buildSign = (signMatrix: number[][]): HTMLDivElement[] => {
  return signMatrix
    .map(matrixToDivList)
    .flat()
    .filter(isNotNull);
}

// 0 = null, 1 = filled slot, 5 = empty slot
const GAME_OVER_SIGN: HTMLDivElement[] = buildSign([
  [1, 1, 1, 1, 5, 0, 1, 1, 0, 5, 1, 0, 0, 1, 5, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
]);

const PAUSE_SIGN: HTMLDivElement[] = buildSign([
  [1, 1, 1, 1, 5, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 1, 5, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 5, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
]);

export { GAME_OVER_SIGN, PAUSE_SIGN };