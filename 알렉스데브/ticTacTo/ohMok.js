const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

const checkWinner = (target) => {
  const rowIdx = target.parentNode.rowIndex;
  const cellIdx = target.cellIndex;
  let isWinner = false;
  // 열 검사
  if (
    rows[rowIdx][0].textContent === turn &&
    rows[rowIdx][1].textContent === turn &&
    rows[rowIdx][2].textContent === turn &&
    rows[rowIdx][3].textContent === turn &&
    rows[rowIdx][4].textContent === turn
  ) {
    isWinner = true;
    // 행 검사
  } else if (
    rows[0][cellIdx].textContent == turn &&
    rows[1][cellIdx].textContent === turn &&
    rows[2][cellIdx].textContent === turn &&
    rows[3][cellIdx].textContent === turn &&
    rows[4][cellIdx].textContent === turn
  ) {
    isWinner = true;
    // 대각선 검사
  } else if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn &&
    rows[3][3].textContent === turn &&
    rows[4][4].textContent === turn
  ) {
    isWinner = true;
  } else if (
    rows[0][4].textContent === turn &&
    rows[1][3].textContent === turn &&
    rows[2][2].textContent === turn &&
    rows[3][1].textContent === turn &&
    rows[4][0].textContent === turn
  ) {
    isWinner = true;
  }
  return isWinner;
};

const winOrDraw = (target) => {
  const win = checkWinner(target);
  if (win) {
    $result.textContent = `${turn} Wins`;
    $table.removeEventListener('click', shiftOX);
    return;
  }
  // 하나도 빠짐없이 조건을 충족할 경우 true != some(하나라도 충족)과 반대
  // rows 이차원배열의 모든 요소가 텍스트 컨텐트를 가질 경우 true
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = 'Draw';
    return;
  }
  turn = turn === 'X' ? 'O' : 'X';
};

let clickable = true;
// 각 칸을 클릭 이벤트 발생 시
const shiftOX = (event) => {
  if (!clickable) {
    return;
  }
  if (event.target.textContent !== '') {
    return;
  }
  event.target.textContent = turn;
  winOrDraw(event.target);

  if (turn === 'X') {
    const emptyCells = rows.flat().filter((v) => !v.textContent);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    clickable = false;
    setTimeout(() => {
      randomCell.textContent = 'X';
      winOrDraw(event.target);
      clickable = true;
    }, 500);
  }
};

for (let i = 0; i < 5; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 1; j <= 5; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    $tr.appendChild($td);
  }
  rows.push(cells);
  $table.appendChild($tr);
}

$table.addEventListener('click', shiftOX);
body.append($table);
body.append($result);
