'use strict';
/**
 * 시작 -> 화면에 틱택토 판 보여줌 ( 3X3 )
 * 판 내 블럭 클릭 -> myChoice 변수에 위치 저장 (e.g. [0][1] 가장 위 가운데) 해당 지점에 O를 그린다.
 * 다음 차례는 상대 편 변수를 otherChoice로 바꾸어 클릭한 위치 저장. 해당지점에 X를 그린다.
 * 한줄, 대각선 이 완성되는 쪽이 승리 : 점수 획득 (카운트)
 *
 * Destructuring :
 * const arr = [1,2,3,4,5];
 * const [one, two, three, four, five] = arr (특정요소 비선택시 빈칸으로)
 *  */
// == const body = document.body : 구조분해할당 (Destructuring)
// 어떤 객체의 속성 명이 같은 변수를 선언할 떄 사용
const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

// 승리 조건 :
//요소의 i 값이 전부 다르고, j값의 차가 1인 경우
// i의 값이 전부 다르고, j 값이 같을 경우
// i의 값이 같고 j의 차가 1인 경우

const checkWinner = (target) => {
  const rowIdx = target.parentNode.rowIndex;
  const cellIdx = target.cellIndex;
  let isWinner = false;
  // 열 검사
  if (
    rows[rowIdx][0].textContent === turn &&
    rows[rowIdx][1].textContent === turn &&
    rows[rowIdx][2].textContent === turn
  ) {
    isWinner = true;
    // 행 검사
  } else if (
    rows[0][cellIdx].textContent == turn &&
    rows[1][cellIdx].textContent === turn &&
    rows[2][cellIdx].textContent === turn
  ) {
    isWinner = true;
    // 대각선 검사
  } else if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    isWinner = true;
  } else if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    isWinner = true;
  }
  return isWinner;
};

const winOrDraw = (target) => {
  const win = checkWinner(target);
  if (win) {
    $result.textContent = `${turn} Wins`;
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
/** 컴퓨터 턴
 * 플레이어가 클릭 시 다음 턴은 자동으로 컴퓨터의 턴
 * => 빈칸이라면 랜덥으로 설정해서 'X'를 turn 변수에 저장
 * => 화면에 표기하고 대기
 *
 */

// 각 칸을 클릭 이벤트 발생 시
const shiftOX = (event) => {
  // 클릭한 칸이 차 있다면 (removeEventlistener를 사용하면 실수 확률 => 조건으로 처리)
  if (event.target.textContent !== '') {
    return;
  }
  // turn 이 바뀔 때 마다 O 와 X를 교차
  event.target.textContent = turn;
  winOrDraw(event.target);
  // 무승부 판정
  // 삼항연산자로 축약
  // 턴 돌리기

  if (turn === 'X') {
    // 나머지 빈칸을 상수에 저장
    const emptyCells = rows.flat().filter((v) => !v.textContent);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'X';
    winOrDraw(event.target);
  }
};

// 체커판 생성
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 1; j <= 3; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    $tr.appendChild($td);
  }
  rows.push(cells);
  $table.appendChild($tr);
}

//event bubbling: 자식 태그에서 발생한 이벤트는 부모 태그에서도 반응하는 HTML의 특성이용.
$table.addEventListener('click', shiftOX);
body.append($table);
body.append($result);
