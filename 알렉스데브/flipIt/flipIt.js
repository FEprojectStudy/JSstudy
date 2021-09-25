const $wrapper = document.querySelector("#wrapper");
const $btn = document.querySelector("#btn");
const $wrapper = document.querySelector('#wrapper');
const $wrapper = document.querySelector('#wrapper');

//12개의 카드 2쌍 -> 6가지 색상 배열에 저장(파스텔 톤)
const colors = [
  '#FF968A',
  '#FFC8A2',
  '#FFFFB5',
  '#CCE2CB',
  '#D4C6AA',
  '#FEE1EB',
];

// 색카드 2쌍을 합친 배열: colors 뒤에 다시 colors를 붙인 형태. 원본을 수정하지 않고 새로운 배열을 만든다.
let colorCopy = colors.concat(colors);

// 섞은 카드를 저장하는 배열
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = true;
let startTime = new Date();

const total = colorCopy.length;

// 피셔에이츠 셔플
function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    // 카드 개수(12개)의 수 중 랜덤으로 저장.
    const randomIdx = Math.floor(Math.random() * colorCopy.length);
    // 랜덤 인덱스 추출
    const spliced = colorCopy.splice(randomIdx, 1);
    shuffled.push(spliced[0]); // concat 메서드의 경우, 매개변수 1차원 배열 까지는 flat하여 배열을 만든다.

    // 랜덤 인덱스 추출
    const spliced = colorCopy.splice(randomIdx, 1);
    shuffled.push(spliced[0]); //concat 메서드의 경우, 매개변수 1차원 배열 까지는 flat하여 배열을 만든다.
    //shuffled = shuffled.concat(colorCopy.splice(randomIdx, 1));
  }
}
console.log(shuffled);

// 카드 생성 함수 (게임 시작과 동시에 호출)
function createCard(i) {
  $btn.classList.add("invisible");
  //div.card > div.card-inner (div.card-front + div.card-back);
  const card = document.createElement('div');
  card.className = 'card';

  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';

  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

// 카드 클릭 이벤트 함수
function onClickCard() {
  //function에서 this => 클릭한 카드 객체
  this.classList.toggle("flipped");
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  const firstCard =
    clicked[0].querySelector(".card-back").style.backgroundColor;
  const secondCard =
    clicked[1].querySelector(".card-back").style.backgroundColor;
  if (firstCard === secondCard) {
    completed.push(clicked[0]); //완성 카드 배열에 넣는다.
    completed.push(clicked[1]); //완성 카드 배열에 넣음.
    clicked = []; //클릭한 카드 초기화
    if (completed.length >= total) {
      let endTime = new Date();
      setTimeout(() => {
        alert(
          `${(endTime - startTime) / 1000} 초 만에 모든 카드를 맞추셨습니다!`
        );
        $btn.classList.remove("invisible");
        $btn.textContent = "Restart";
      }, 1000);
    }
    //completed = completed.concat(clicked);
    return;
  }
  // 만약 오답이면
  setTimeout(() => {
    clicked[0].classList.remove("flipped"); // 카드를 다시 뒤집는다.
    clicked[1].classList.remove("flipped"); // 카드를 다시 뒤집는다.
    clicked = []; //클릭한 카드 초기화
  }, 800);
}

// 게임 시작 함수
function startGame() {
  let clickable = false;
  // 카드를 섞고
  shuffle();

  // 총 개수 만큼 카드 생성 => wrapper div에 넣는다.
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }

  // 모든 카드 카드 뒤집은 상태로 전환하기.
  document.querySelectorAll('.card').forEach((card, idx) => {
    setTimeout(() => {
      card.classList.add('flipped');
      // 첫번째 카드 1s, 2~12 1.1*n s 초까지 뒤집는다.좌르륵 뒤집히는 효과
    }, 1000 + 100 * idx);
  });

  // 카드 찾기
  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped");
    // 카드 찾기
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    // 카드 찾기
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
    clickable = true;
  }, 5000);
}

$btn.addEventListener("click", startGame);
startGame();

// 카드 클릭 이벤트 함수
function onClickCard() {
  //function에서 this => 클릭한 카드 객체
  this.classList.toggle('flipped');
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  const firstBackColor =
    clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector('.card-back').style.backgroundColor;
  if (firstBackColor === secondBackColor) {
    completed.push(clicked[0]); // 완성 카드 배열에 넣는다.
    completed.push(clicked[1]); // 완성 카드 배열에 넣음.
    clicked = []; //  클릭한 카드 초기화 => 이 세 코드를 아래 한 코드로 가능
    // completed = completed.concat(clicked);
    return;
  }
  // 만약 오답이면
  clicked[0].classList.remove('flipped'); // 카드를 다시 뒤집는다.
  clicked[1].classList.remove('flipped'); // 카드를 다시 뒤집는다.
  clicked = []; //클릭한 카드 초기화
}
