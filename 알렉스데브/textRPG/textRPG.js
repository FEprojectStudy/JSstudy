'use strict';

const $startScreen = document.querySelector('#start-screen');
const $heroStat = document.querySelector('#hero-stat');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtk = document.querySelector('#hero-atk');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtk = document.querySelector('#monster-atk');
const $battleMode = document.querySelector('#battle-mode');
const $monsterStat = document.querySelector('#monster-stat');
const $message = document.querySelector('#message');
const $normalMode = document.querySelector('#normal-mode');

const hero = {
  name: '',
  lv: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  atk: 10,

  // this : 객체 안의 this는 객체 자기 자신을 가리킨다. 여기서는 즉, hero의 hp
  attack(monster) {
    monster.hp -= this.atk;
    this.hp -= monster.atk;
  },

  // 화살표 함수를 사용하면 this의 의미는 브라우저의 윈도우(document의 부모, 브라우저 전체를 담당하는 객체)를 가리킨다.
  // 윈도우는 생략이 가능함. this를 사용하고자 할때는 화살표 함수안에 사용하지 말자
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.atk;
  },
};

let monster = null;
const monsterList = [
  { name: '슬라임', hp: 25, atk: 10, xp: 10 },
  { name: '스켈레톤', hp: 50, atk: 15, xp: 20 },
  { name: '마왕', hp: 150, atk: 35, xp: 50 },
];

function logOn(event) {
  event.preventDefault();

  // 플레이어 이름 데이터를 입력 받아 게임화면으로 전환한다.
  // event.target(startScreen)의 요소 중 name-input의 값에 접근
  // 이름에 특수문자가 들어가면 dot notation 사용 불가
  const player = event.target['name-input'].value;
  $startScreen.style.display = 'none';
  $normalMode.style.display = 'block';
  $heroName.textContent = player;
  $heroLevel.textContent = `Lv.${hero.lv}`;
  $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
  $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lv}`;
  $heroAtk.textContent = `ATK: ${hero.atk}`;
  hero.name = player;
}

function menuSelect(event) {
  event.preventDefault();
  const input = event.target['menu-input'].value;
  if (input === '1') {
    $normalMode.style.display = 'none';
    $battleMode.style.display = 'block';
    monster = JSON.parse(
      //간단한 깊은 복사: 이 코드의 경우, 성능 문제와 프로토타입에 반영이 되지 않는 단점 지님.
      JSON.stringify(
        monsterList[Math.floor(Math.random() * monsterList.length)]
      )
    );
    monster.maxHp = monster.hp;
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP:${monster.hp}/${monster.maxHp}`;
    $monsterAtk.textContent = `ATK:${monster.atk}`;

    // 참조가 아닌 깊은 복사: 전부 다 참조관계가 끊기고 복사됨 (복사의 경우, 하나를 수정해도 복사한 값에 영향을 주지 않음)
    const monster1 = JSON.parse(JSON.stringify(monsterList[0]));
    // 객체를 대입 => 참조 (대입하는 값이 바뀌면, 저장하는 변수 또한 바뀜 서로 연결관계)
    const monster2 = monsterList[0];
    // 객체 리터럴을 복사. 얕은 복사의 경우 겉 껍데기만 복사하고 내부는 참조가 된다.
    const monster3 = { ...monster[0] };

    monster1.name = '새 몬스터';
    console.log(monsterList[0].name);
    monster2.name = '새 몬스터';
    console.log(monsterList[0].name);
    console.log(monsterList[0] === monster1);
    console.log(monsterList[0] === monster2);
  } else if (input === '2') {
    //휴식
    hero.hp = hero.maxHp;
  } else if (input === '3') {
    //종료
  }

  $battleMode.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if (input === '1') {
      // 공격
      hero.attack(monster);
      $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
      $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
      $message.textContent = `${hero.atk}의 데미지를 주고, ${monster.atk}의 데미지를 받았다.`;
    } else if (input === '2') {
      hero.heal(monster);
      $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
      //회복
    } else if (input === '3') {
      s;
      //도주
    }
  });
}

$normalMode.addEventListener('submit', menuSelect);
$startScreen.addEventListener('submit', logOn);
