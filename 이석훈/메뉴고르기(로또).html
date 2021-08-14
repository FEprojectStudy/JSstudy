<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>오늘 뭐먹지?</title>
</head>
<body>
    <div>오늘 메뉴는?</div>
    <div id='0menu'>아침 : </div>
    <div id='1menu'>점심 : </div>
    <div id='2menu'>저녁 : </div>
    <script>
        const menu =['짜장면','짬뽕','탕수육','볶음밥','초밥','쌀국수','된장국','해장국','콩나물국','순대볶음','라면','칼국수','해물파전'];
        const shuffle = [];
        //전체 갯수가 위치 숫자보다 1많지만, Math.random은 1보다 작으므로
        //곱한 결과는 전체 갯수에서 1 작은 범위에서 나오게 됨
        let i=menu.length;
        while(i>0){
            //i를 0부터 시작하게 되면 중복되는 값이 나오게 된다.
            const ran = Math.floor(Math.random()*(i))
            shuffle.push(menu[ran])
            menu.splice(ran,1)
            //중복된 값을 빼고 다시 랜덤으로 섞음
            i--;
        }
        //querySelector를 쓰면 오류가 생겨서 getElementById
        //return 꼭 적기
        const resultMenu = (e)=>{
            return(document.getElementById(`${e}menu`))
        }
        //메뉴항목을 각 div안에 넣을 수 있는 함수 생성

        const putMenu = (what,where)=>{
            const thisMenu = document.createElement('span');
            thisMenu.className = `${what}Menu`;
            thisMenu.textContent = shuffle[what];
            where.appendChild(thisMenu);
        }
        for(let i=0;i<3;i++){
            setTimeout(()=>{
                putMenu(i,resultMenu(i));
            },(i+1)*1000);
        }
    </script>
</body>
</html>
