"use strict";
function printDouble(msg) {
    console.log(msg);
    console.log(msg);
}
printDouble("HELLO WORLD :)");
// 콘솔 창에서
// const btn = document.querySelector("button");
// btn.addEventListener()
// 위와 같은 코드를 타입스크립트 파일에 입력할 때 타입스크립트에게 이게 무엇인지 어떤 역할을 하는지 알려주어야 한다.
// 다행히도 타입스크립트는 DOM 요소나 기타 요소의 타입을 인지한다.
const btn = document.getElementById("btn"); //f12누르고 확인한다. 방법이 나온다.
//제네릭 HTMLElement | null 반환한다.
// 하지만 타입스크립트는 이것이 어떤 태그에 붙어있는 건지 모른다
console.log(btn);
// id가 btn인 태그에 접근!
//btn?.addEventListener("click",function(){
//  alert("CLICKED!!")
//})
// ? 를 안붙인 상태에서 보게되면? 개체가 null일 수 있다는 에러가 난다.
// addEventListener는 null타입인 경우 사용할 수 없으므로 ?(물음표 연산자)를 붙여서 btn이 존재하는 경우에만 실행되도록 해준다.(에러해결)
// 하지만 이경우에는 btn이 아예 존재하지 않는 경우일때도 에러가 나지 않게 된다. 
/* ------------------------- 타입스크립트 non-null 단언 연산자 ------------------------- */
// 위와 같은 경우라면 매번 ?를 적어야 하므로.. 타입스크립트에 있는 연산자를 사용한다. 
// 코드 줄 뒤에 ! 를 넣음으로써 절대 null이 안되도록 타입스크립트에 약속한다. => HTML요소가 된다.
// 단, 확실히 null이 아닌(값이 존재하는 경우) 경우에만 사용해야 한다.
// const btn = document.getElementById("btn")!
/* ---------------------------------- 타입단언 ---------------------------------- */
// 타입스크립트가 알지 못하는 타입의 경우 사용한다. 
let mystery = "Hello World!";
//문자열이나 배열 타입의 경우 length를 쓸 수 있는데, 이 코드가 문자열이라고 단언하는 경우 as키워드를 사용한다. 
// 여전히 저 값의 타입은 unknown 이다.
const numChars = mystery.length; //이 컨텍스트에서 mystery는 string 이라는 뜻
/* ---------------------------- HTMLInputElement ---------------------------- */
// const input=document.getElementById("todoinput")!;
// HTMLElement 인 것은 타입스크립트가 알고있다. 추가로 이 값이 HTML input요소인 것은 알지 못하므로, 알려줘야만 한다.
// 예시로 아래를 보면..
//btn?.addEventListener("click",function(){
//input.value -> 엑세스하려고 하면 에러가 난다!
// 타입스크립트는 HTMLElement 속성에 value가 있는지 모른다는 에러가 난다.
// (인풋 태그인 경우에 value 값을 가지고 있다. 하지만, 타입스크립트가 이것이 input인지 모르기 때문에 에러가 나게 된다.)
//})
// 타입스크립트에 HTMLInputElement 라는 인터페이스가 있다.f12(타입정의)를 눌러서 보자.. 인터페이스 중 value값을 살펴보면 value:string;인것을 확인할 수 있다.
const input = document.getElementById("todoinput");
//위와 같이 하면 이제 input은 HTMLInputElement 타입으로 처리되고, 값을 가지며(non null) 오류가 나지 않게 된다.(input.value 에 접근 가능하게 된다.)
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    alert(input.value);
    input.value = "";
});
//const btn = document.getElementById("btn")! as HTMLButtonElement; 로 선언하게 되면 disabled를 사용 가능하게 된다.
/* ------------------------------- 타입 단언의 대체구문 ------------------------------ */
// as를 사용하지 않고 사용 때에만 단언하는 방법.
// const input=document.getElementById("todoinput")!;
// (<HTMLInputElement>input).value;
// JSX에서는 동작하지 않는 방법이다.
