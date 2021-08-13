let lottoBalls = [];
let numbers = [];
let bonusNum = 0;

const $btn = document.querySelector('#push');
const $ballScreen = document.querySelector('#ballScreen');
const $bonusBall = document.querySelector('#bonusBall');
const $resetBtn = document.querySelector('#resetBtn');

function generateNum() {
  numbers = Array(45)
    .fill(0)
    .map((element, i) => {
      return i + 1;
    });

  while (numbers.length > 39) {
    let tmp = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
    lottoBalls.push(tmp);
  }
  bonusNum = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];

  // for (let i = numbers.length; i > 0; i--) {
  //   const random = Math.floor(Math.random() * i);
  //   const spliceArray = numbers.splice(random, i);
  //   const value = spliceArray[0];
  //   lottoBalls.push(value);
  // }

  //원본이 바뀌는 메서드를 사용할 경우, .slice() 메서드를 중간에 사용하면 원본이 복사된 값에 적용하기 때문에
  // 원본이 바뀌지 않음.
  lottoBalls = lottoBalls.sort((a, b) => {
    return a - b;
  });

  $btn.classList.add('invisible');
  $ballScreen.classList.add('visible');
  $bonusBall.classList.add('visible');
  $resetBtn.classList.remove('invisible');

  for (let i = 0; i < lottoBalls.length; i++) {
    setTimeout(() => {
      const $ball = document.createElement('div');
      $ball.className = 'ball';
      $ball.textContent = lottoBalls[i];
      $ballScreen.appendChild($ball);
    }, 1000 * (i + 1));
  }

  setTimeout(() => {
    const $bonusNum = document.createElement('div');
    $bonusNum.className = 'ball';
    $bonusNum.textContent = bonusNum;
    $bonusBall.appendChild($bonusNum);
  }, 7000);

  console.log(lottoBalls);
  console.log(bonusNum);
  console.log(numbers);
}

function reset() {
  location.reload();
}

$btn.addEventListener('click', generateNum);
$resetBtn.addEventListener('click', reset);
