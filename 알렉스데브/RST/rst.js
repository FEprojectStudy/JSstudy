/*
파란화면으로 시작. 파란 화면을 클릭하면 빨간 화면으로 전환되고 타이머 시작.
랜덤한 시간에 타이머가 좀료되면서, 초록색 화면으로 전환. 2차 타이머 시작.
초록색 화면 클릭 시, 타이머 종료 => 종료 시간을 변수에 저장. 초록색 화면이 시작한 시간과 끝난 시간의 차를 표시
다시 파란색 화면으로 돌아감.

여러 개 데이터를 저장해야 할 경우: 배열(array) 혹은 객체(object) 사용.
배열 : 같은 종류 / 속성의 데이터를 저장할 때
객체 : 다른 종류 / 속성의 데이터를 저장할 때
*/

'use strict';

const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

// 함수는 실행이 끝난 후 함수 스코프 내의 변수 값을 지우기 때문에, 실행 종료되도 저장이 필요한 정보는 함수 밖에 둔다.
let startTime;
let endTime;
let records = [];
let timeOutId;

function onClick() {
  // JavaScript에서 class에 접근할 때는 className을 사용.
  // classList.contains(class) 해당 클래스가 있는 지 확인하고 있으면 true 아니면 false 반환

  // ready === blue
  if ($screen.classList.contains('ready')) {
    // set === red
    $screen.classList.replace('ready', 'set');
    $screen.textContent = `Wait for it`;
    // 타이머를 특정하기 위해 변수에 할당
    timeOutId = setTimeout(() => {
      $screen.classList.replace('set', 'go');
      $screen.textContent = 'Click to stop';

      //시작 시간 측정
      startTime = new Date();
    }, parseInt(Math.random() * 9000 + 1));
  } else if ($screen.classList.contains('set')) {
    //계속 작동하고 있는 타이머를 제거한다.
    $screen.textContent = 'Wait for Green! Click Again';
    clearTimeout(timeOutId);
    $screen.className = 'ready';
  } else if ($screen.classList.contains('go')) {
    // 종료 시간 측정
    endTime = new Date();
    const current = (endTime - startTime) / 1000;
    records.push(current);
    // reduce 누적 값 리턴 만능 메서드
    const avg = records.reduce((acc, curr) => acc + curr) / records.length;
    // 초록색 화면을 클릭한 시점이 빨간색 화면으로 전환되고 시작한 시간보다 뒤기 때문에, 걸린 시간이 연산됨.
    $result.textContent = `${records.length}차시 반응속도: ${current}초 | 평균 반응속도: ${avg}초 걸렸습니다.`;
    $screen.classList.replace('go', 'ready');
    $screen.textContent = 'Click to start';
  }
}

$screen.addEventListener('click', onClick);
