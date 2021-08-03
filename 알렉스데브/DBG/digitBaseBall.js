// 숫자 30이 넘어가면 CS 알고리즘으로 문제를 푸는 것이 더 효율적
// math.random은 암호학적으로 완전한 무작위가 아니기 때문에
// 보안과 관ㄹ현된 작업은 window.crypto.getRandomValues() 함수를 쓰는 편이 안전하다.

// Arrays : Digit Containers
const target = [];
const numbers = [];
const answer = [];
const tries = [];

// Tags
const $answer = document.querySelector('#answer');
const $form = document.querySelector('#form');
const $log = document.querySelector('#log');

for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}

for (let i = 0; i < 4; i++) {
  const idx = Math.floor(Math.random() * (numbers.length - i));
  target.push(numbers[idx]);
  numbers.splice(idx, 1);
}
console.log(target);

function chkInput(input) {
  // 길이 체크
  if (input.length !== 4) {
    return alert('4 Digits Only!'); // -> undefined
  }

  //숫자 체크
  if (isNaN(Number(input))) {
    return alert('Numbers Only!'); // -> undefined
  }
  // 중복 체크
  if (new Set(input).size !== 4) {
    return alert('No Duplicates!'); // -> undefined
  }
  // 중복 답안 체크
  if (tries.includes(input)) {
    return alert("You've Already Typed the Same Number!"); // -> undefined
  }
  return true;
}

function chkSnB(inputValue, target) {
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < target.length; i++) {
    // 일치하는 것이 없다면 -1, 있다면 0 이상
    const index = inputValue.indexOf(target[i]);
    //같은 숫자가 있는 경우
    if (index > -1) {
      // 인덱스가 일치하면
      if (index === i) {
        strike++;
      } else {
        ball++;
      }
    }
  }
  // append의 경우: createTextNode 함수를 써서 생성할 필요 없이 바로 문자열을 추가하고, 복수(태그 포함)를 추가할 수 있도록 발전.
  // 대부분의 경우 append를 활용.

  if (strike > 0 || ball > 0) {
    $log.append(
      `${inputValue}: ${strike} Strikes ${ball} Balls`,
      document.createElement('br')
    );
    //숫자를 하나도 못 맞출 경우: Out 게임 종료.
  } else {
    $log.append(`Out! The Answer was ${target.join('')}`);
  }
}

function onSubmit(event) {
  // 기본 동작 막기 :: 새로고침 방지 -> 대표적으로 form 태그나 a태그의 기본동작
  event.preventDefault();
  //event 객체 : event.target[idx]로 form 태그 내 태그를 특정.
  const inputValue = $answer.value;
  $answer.value = '';

  // 체크 성공 : 아닌 경우를 빠르게 리턴 (가독성을 위해 if~else문의 중첩을 피한다.)
  if (!chkInput(inputValue)) {
    return;
  }

  //자리 숫자 모두 잃치할 경우: 홈런
  if (target.join('') === inputValue) {
    $log.append(`HomeRun!: ${target.join('')}`);
    return;
  }

  //10번 시도를 초과할 경우: 패배
  if (tries.length >= 9) {
    // 새로 추가할 text 사항이 있을 때 마다 덧 붙일 수 있어 용이하다.
    const message = document.createTextNode(
      `You Lose: The answer was ${target.join('')}`
    );
    // appendChild의 경우: createTextNode로 노드를 만든 뒤 추가해야 함
    $log.appendChild(message);
    return;
  }
  // Check Strike and Ball
  chkSnB(inputValue, target);

  // 시도한 숫자 배열에 추가
  tries.push(inputValue);
  console.log(tries);
  //검사하는 코드 : 복잡한 것은 함수로 빼기 (리팩토링)
}

// 스트라이크 & 볼 체크

//form은 action이 일어나면 페이지가 새로고침된다.
$form.addEventListener('submit', onSubmit);

// textContent와 innerHTML 차이: textContent는 모든 글자를 문자열로 인식, innerHTML은 문자열 외 태그 또한 인식

// indexOf 와 includes: indexOf && includes = 배열이나 문자열에 원하는 값이 있는지 탐색하는 메서드.
// indexOf: 찾는 값이 있으면 해당 인덱스 반환, 없으면 -1 반환
// includes: 찾는 값이 있으면 true (찾는 값의 인덱스는 알려주지 않는다), 없으면 false

//document.createElement: 동적으로 태그 생성
//document.createTextNode: 동적으로 텍스트 생성
// 화면에 append를 하기 전까지는 보이지 않는다.
