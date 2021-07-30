let numOne;
let numTwo;
let operator;
let answer;

let $numOne_txt = document.querySelector('#numOne_txt');
let $numTwo_txt = document.querySelector('#numTwo_txt');
let $operator_txt = document.querySelector('#operator_txt');
let $answer_txt = document.querySelector('#answer_txt');
let $btn = document.querySelectorAll('button');

function sum(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

function onClick(event) {
  // 누른버튼이 연산자일 경우
  if (isNaN(event.target.textContent) && event.target.textContent !== '=') {
    if (!numOne);
    else operator = event.target.textContent;
    $operator_txt.textContent = operator;

    // 누른 버튼이 '=' 이면
  } else if (event.target.textContent === '=') {
    if (operator === '+') {
      answer = sum(numOne, numTwo);
    } else if (operator === '-') {
      answer = sub(numOne, numTwo);
    } else if (operator === '*') {
      answer = mul(numOne, numTwo);
    } else if (operator === '/') {
      answer = div(numOne, numTwo);
    }
    $answer_txt.textContent = answer;
    numOne = '';
    numTwo = '';
    operator = '';

    // 누른 버튼이 number 라면
  } else if (typeof Number(event.target.textContent) === 'number') {
    // 연산자를 저장하는 변수 operator가 비어있는가?
    if (!operator) {
      $numOne_txt.textContent = numOne;
      $numTwo_txt.textContent = numTwo;
      $operator_txt.textContent = operator;

      // numOne이 비어있으면
      if (!numOne) {
        // numOne 변수는 눌려진 number 버튼의 text => 숫자로 형변환
        numOne = Number(event.target.textContent);

        // 비어있지 않으면
      } else {
        //이미 저장된 numOne에 number버튼의 text를 덧붙이고
        numOne += event.target.textContent;

        //numOne을 숫자로 형변환한다.
        numOne = Number(numOne);
      }

      //화면: 결과 표시창의 numOne의 text를 변수 numOne의 값으로 보여줌
      $numOne_txt.textContent = numOne;

      //operator 변수가 비어 있지 않다면 => 첫번째 숫자와 operator가 저장된 상태
    } else {
      // numTwo 변수가 비어있다면
      if (!numTwo) {
        // numTwo 변수에 눌린 버튼의 text를 저장
        numTwo = Number(event.target.textContent);
        // numTwo 변수가 비어 있지 않다면 => 숫자가 이미 입력된 상태
      } else {
        // 이미 입력된 numTwo의 숫자에 눌린 버튼의 text를 덧붙인다.
        numTwo += event.target.textContent;

        // numTwo에 저장된 text를 숫자형으로 형변환.
        numTwo = Number(numTwo);
      }

      //호면: 결과표시창 내 numTwo의 text를 변수 numTwo 변수 값으로 보여줌.
      $numTwo_txt.textContent = numTwo;
    }
  }
  console.log(numOne);
  console.log(operator);
  console.log(numTwo);
}

// $btn의 값을 querySelectorAll 함수로 iterate하기 위해 반복문 사용
for (let i = 0; i < $btn.length; i++) {
  // $btn의 i 인덱스를 순회하며 'click' 액션이 발생할 때 마다 onClick 함수 호출.
  $btn[i].addEventListener('click', onClick);
}
document.querySelector('#btn_clear').addEventListener('click', () => {
  numOne = '';
  $numOne_txt = '';
  numTwo = '';
  $numTwo_txt = '';
  operator = '';
  $operator_txt = '';
  answer = '';
  $answer_txt = '';
});
