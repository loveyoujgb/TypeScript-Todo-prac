# TypeScript-Todo-prac

#### 타입스크립트 프로젝트 세팅
```
$ tsc --init
$ mkdir src dist
$ touch src/index.ts

/tsconfig.jscon
"outDir": "./dist", 
"include": ["src"]
```

1. $ tsc -w (감시모드 on) 
2. index.html 파일 생성
  - `<script src="dist/index.js"></script>`
  - index.html 우클릭 - Open in Default Browser

---

#### 실시간 브라우저 업데이트 방법
1. `$ npm init -y`
2. pakage.json 파일 생성됨
3. `$ npm install lite-server`
4. pakage.json 파일 내의 "sclipts": {"start": "lite-server"} 를 적는다 npm start를 할 때 이것을 실행하겠다는 뜻
5. `$ npm start`

---

## 타입스크립트는 어떻게 HTML요소의 타입을 인지할까?
콘솔 창에서
```
const btn = document.querySelector("button");
btn.addEventListener()
```

- 위와 같은 코드를 타입스크립트 파일에 입력할 때 타입스크립트에게 이게 무엇인지 어떤 역할을 하는지 알려주어야 한다.
- 다행히도 타입스크립트는 DOM 요소나 기타 요소의 타입을 인지한다.

### 타입스크립트 non-null 단언 연산자
```
const btn = document.getElementById("btn"); //f12누르고 확인한다. 방법이 나온다.
제네릭 HTMLElement | null 반환한다.
하지만 타입스크립트는 이것이 어떤 태그에 붙어있는 건지 모른다
console.log(btn);
id가 btn인 태그에 접근!
```

```
btn?.addEventListener("click",function(){
 alert("CLICKED!!")
})
```
- `?` 를 안붙인 상태에서 보게되면? 개체가 `null`일 수 있다는 에러가 난다.
- `addEventListener`는 `null`타입인 경우 사용할 수 없으므로 `?`(물음표 연산자)를 붙여서 `btn`이 존재하는 경우에만 실행되도록 해준다.(에러해결)
- 하지만 이경우에는 `btn`이 아예 존재하지 않는 경우일때도 에러가 나지 않게 된다.

- 위와 같은 경우라면 매번 `?`를 적어야 하므로.. 타입스크립트에 있는 연산자를 사용한다.
- 코드 줄 뒤에 `!` 를 넣음으로써 절대 `null`이 안되도록 타입스크립트에 약속한다. => HTML요소가 된다.
- 단, 확실히 `null`이 아닌(값이 존재하는 경우) 경우에만 사용해야 한다.
```
const btn = document.getElementById("btn")!
```

### 타입단언(as)
- 타입스크립트가 알지 못하는 타입의 경우 타입 단언(as)을 사용한다.

```
let mystery:unknown = "Hello World!";
const numChars = (mystery as string).length  //이 컨텍스트에서 mystery는 string 이라는 뜻
```
- 문자열이나 배열 타입의 경우 `length`를 쓸 수 있는데, 이 코드가 문자열이라고 단언하는 경우 `as`키워드를 사용한다.
- 여전히 mystery 값의 타입은 `unknown` 이다. numChars값에서만 해당 타입으로 단언된다.

### HTMLInputElement 와 `!`(non null)
```
const input=document.getElementById("todoinput")!;
```
- `HTMLElement` 인 것은 타입스크립트가 알고있다. 추가로 이 값이 HTML `input`요소인 것은 알지 못하므로, 알려줘야만 한다.
예시로 아래를 보면..
```
btn?.addEventListener("click",function(){
input.value //-> 엑세스하려고 하면 에러가 난다!
//타입스크립트는 HTMLElement 속성에 value가 있는지 모른다는 에러가 난다.
//(인풋 태그인 경우에 value 값을 가지고 있다. 하지만, 타입스크립트가 이것이 input인지 모르기 때문에 에러가 나게 된다.)
})
```
- 타입스크립트에 `HTMLInputElement` 라는 인터페이스가 있다.f12(타입정의)를 눌러서 보자.. 인터페이스 중 `value`값을 살펴보면 `value:string;`인것을 확인할 수 있다.
```
const input=document.getElementById("todoinput")! as HTMLInputElement //as HTMLInputElement 코드를 적어 해당 타입으로 단언
```
- 위와 같이 하면 `input`은 `HTMLInputElement` 타입으로 처리되고, 값을 가지며(non null) 오류가 나지 않게 된다.(input.value 에 접근 가능하게 된다.)
```
btn?.addEventListener("click",function(){
  alert(input.value);
  input.value=""
})
const btn = document.getElementById("btn")! as HTMLButtonElement; 로 선언하게 되면 disabled를 사용 가능하게 된다.
```

### 타입 단언의 대체구문
- `as`를 사용하지 않고 사용 때에만 단언하는 방법.
```
const input=document.getElementById("todoinput")!;
(<HTMLInputElement>input).value;
```
*다만, JSX에서는 동작하지 않는 방법이다.

## 이벤트 다루기
#### `form` 태그를 `html`파일에 작성한 후, 버튼클릭(submit)이 될 때 실행할 함수를 만들어보자!
```
const input = document.getElementById("todoinput")! as HTMLInputElement;
const btn = document.getElementById("btn")! as HTMLButtonElement;
const form = document.querySelector("form")!;
```
- `("#todoform")` 으로 `id` 로 접근하는 방법 or 요소`("form")`로 접근하는 방법이 있겠다.
  - 후자로 하는 경우 `form`태그인 것을 알게 되므로, 바로 `HTMLFormElement | null` 타입으로 지정된다.
```
form.addEventListener("submit", function(e){
  e.preventDefault();
  // 자주 본 상황..! submit이 되면 페이지가 새로고침 된다!! (HTTP 요청을 보내는 작업을 하게 되므로,!)
  // 타입스크립트 에러가 안난다. 타입스크립트는 알고있다^^ 다만 이 컨텍스트에서만 알고있다.. 
  // (form.addEventListener 코드를 사용하고 있는 것을 알기때문에 e가 submitEvent인 것을 알고 있다. 그래서 에러가 나지 않는 것이다. )
  console.log("Submitted")
})
```
- `e`를 모르는 경우 예)
```
// 아래와 같은 경우에는 에러가 난다.
function handleSubmit (e){ -> e 에러!
  e.preventDefault();
  타입스크립트는 e가 무엇인지 모른다.
  console.log("Submitted")
}
```
- `e`가 무엇인지 알려주는 방법? 
  - `Event` 또는 `SubmitEvent`를 사용하여 알려준다.(타입 추론이 가능하도록 해준다.)
```
function handleSubmit (e:SubmitEvent){ //-> e 에러가 안난다.
  e.preventDefault();
  // 타입스크립트는 e가 무엇인지 모른다.
  console.log("Submitted")
}
form.addEventListener("submit", handleSubmit); //submit 시에 handleSubmit함수를 실행하도록 코드를 작성하고, 버튼을 클릭 해보면! 성공!
```

## todo 목록 만들기
```
const list = document.getElementById("todolist")
function handleSubmit (e:SubmitEvent){ //-> e 에러가 안난다.
  e.preventDefault();
  const newTodoText = input.value; // 입력값 할당
  const newLI = document.createElement("li"); // 빈 li요소를 생성하는 변수

  // 체크박스 태그 추가하는 방법 <input type="checkbox" checked/>
  const checkbox = document.createElement("input"); // input요소를 생성하는 변수
  // 이렇게만 적으면 checkbox의 타입이 체크박스인지 모르므로.. 알려준다(아래 코드 작성).
  checkbox.type="checkbox";
  newLI.append(newTodoText); // 먼저.. 빈 li요소에 newTodoText를 넣은 값을 가지도록 하는 코드 작성
  // (먼저 text를 추가한 후 그 뒤에 체크박스가 와야 되므로.. 코드 순서는 이와같이 짠다.)
  newLI.append(checkbox); // li요소에 체크박스 요소를 가지도록 해주는 코드

  list?.append(newLI) // 위에 만든 li요소를 list라는 id를 가진 요소에 append해주는 코드를 작성한다.
  //(추가로, null이 될 수 있으므로 ?를 추가하거나, list가 null이 아니라는 !(non null)를 추가하여 코드를 작성한다.)
  input.value = ""

}

form.addEventListener("submit", handleSubmit);
```