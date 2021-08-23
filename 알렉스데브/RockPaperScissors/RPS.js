'use strict';

const $computer = document.querySelector('#computer');
const $rock = document.querySelector('#rock');
const $paper = document.querySelector('#paper');
const $scissors = document.querySelector('#scissors');
const $score = document.querySelector('#score');
const $myHand = document.querySelector('#myHand');

// 서버 개발에서는 root경로(/)를 사용하는 경우가 많으나,
// 서버를 사용하지 않는 경우엔 상대 경로 (./)를 사용
const comHandImg_URL = './img/rpsComputer.png';
const myHandImg_URL = './img/rpsMe.png';

// image sprite: 한 이미지 내 보여 줄 부분을 나눔: 자를 부분을 픽셀로 조정
$computer.style.background = `url(${comHandImg_URL}) -180px 0`;
$computer.style.backgroundSize = 'auto 200px';

// 변수는 고유한 것, 묶을 수 있는 것은 객체로
const rspXcoord = {
  rock: '0',
  paper: '190',
  scissors: '-180',
};

let computerChoice = 'rock';

// 함수화??
const shiftHands = () => {
  if (computerChoice === 'rock') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'scissors';
  } else if (computerChoice === 'scissors') {
    computerChoice = 'rock';
  }
  // 객체의 값에 접근하려면 => 객체[키]로 접근해야 한다.
  $computer.style.background = `url(${comHandImg_URL}) ${rspXcoord[computerChoice]}px 0 / auto 200px`;
};

let intervalId = setInterval(shiftHands, 50);
// 플래그 변수 : 스위치 처럼 조건을 on / off 할 때 활용.
let clickability = true;

let score = 0;
let totalScore = [];

const scoreTable = {
  rock: 0,
  paper: -1,
  scissors: 1,
};
// clickBtn을 n번 호출하면, 1~n번 인터벌으로 id가 부여 -> 최종적으로는 n번이 id에 저장
// 다음 버튼을 클릭하면 clearInterval은 n번 인터벌만 취소 : 1~n-1 인터벌이 멈추지 않는다.
const clickBtn = (event) => {
  // 클릭하자 마자 실행
  if (clickability) {
    clearInterval(intervalId);
    clickability = false;
    const myChoice = event.target.value;
    $myHand.style.background = `url(${myHandImg_URL}) ${rspXcoord[myChoice]}px 0 / auto 200px`;
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;
    let message;
    // || 를 많이 사용하는 코드의 경우, 선택지를 배열로 교체
    // arr.includes(diff)

    // [2.-1] 승리 조건, [-2,1] 패배 조건, 그 외 무승부
    if ([2, -1].includes(diff)) {
      message = '승리';
      totalScore.push('승리');
      score++;
    } else if ([-2, 1].includes(diff)) {
      message = '패배';
      if ('승리' in totalScore) {
        totalScore.remove('승리');
      }
      totalScore.push('패배');
      score--;
    } else {
      if ('승리' in totalScore) {
        totalScore.remove('승리');
      }
      message = '무승부';
    }

    let numOfWin = totalScore.filter((x) => x === '승리').length;
    let numOfLose = totalScore.filter((x) => x === '패배').length;

    if (numOfWin >= 2) {
      alert(`삼세판 승리하셨습니다. : 최종 스코어 ${score}점`);
      totalScore = [];
      numOfWin = 0;
      score = 0;
    } else if (numOfLose >= 2) {
      alert(`삼세판 패배하셨습니다. : 최종 스코어 ${score}점`);
      totalScore = [];
      numOfLose = 0;
      score = 0;
    }
    setTimeout(() => {
      // 클릭 1초 후에 실행
      clickability = true;
      clearInterval(intervalId);
      intervalId = setInterval(shiftHands, 50);
      $myHand.style.background = '';
    }, 1000);

    $score.textContent = `${message}: 현재 스코어 ${score}점`;
  }
};

$rock.addEventListener('click', clickBtn);
$paper.addEventListener('click', clickBtn);
$scissors.addEventListener('click', clickBtn);

// 0.05초로 설정을 하였지만, 코드 실행시간이 더 걸릴 경우, 정확히 0.05초 간격으로 반복되지 않는다.
// 자바스크립트 문법 상 객체 : 객체, 배열, 함수 등을 비교할 떄에는 변수에 할당하여 비교해야 한다.
// 객체의 경우, 같아보이는 값이라도 선언하면 다른 메모리 주소에 저장되기 때문.
