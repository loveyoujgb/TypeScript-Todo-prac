/* ------------------------------ 로컬 스토리지에 저장하기 ----------------------------- */
//1. interface 추가
interface Todo {
  text: string;
  completed: boolean;
}

const input = document.getElementById("todoinput")! as HTMLInputElement;
const btn = document.getElementById("btn")! as HTMLButtonElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;

//2. todos라는 이름의 배열 선언 및 할당
// const todos: Todo[] = [];
// 8. readTodos를 호출하여 로컬스토리지에 담긴 데이터를 Todos에 담는다.(코드 수정)
const todos: Todo[] = readTodos();

//9. todos라는 배열을 돌면서 각각의 todo객체가 createTodo 함수를 통해 li,checkbox요소들이 만들어지고 화면에 불러올 수 있게 된다.
todos.forEach(createTodo);

//7. 로컬 스토리지에 담긴 데이터들을 꺼내오는 함수를 만든다. 문자열로 불러와야 하므로 parse까지 해준다.
function readTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  // todosJSON값은 string | null이라고 추론한다.
  // 7-1.처음에는 타입이 null일 수 있으므로 위의 값에 !를 넣기에는 위험하다. 처음에 null인지 판단하는 코드를 아래와 같이 추가한다.
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
}


//11. 체크박스의 불리언 값을 로컬스토리지에 저장하는 함수를 만든다.
function saveTodos(){
  localStorage.setItem("todos",JSON.stringify(todos))
}


function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  //3. form 제출 시 Todo 타입의 할 일을 만들어준다.
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  //5. li,checkbox 요소를 추가하는 코드들을 포함한 함수를 호출한다.
  createTodo(newTodo);
  //4. 만든 객체를 todos 배열에 넣어준다.
  todos.push(newTodo);

  //6. 로컬스토리지에 내보내기 - 로컬스토리지는 텍스트나 문자열만 취급한다. JSON을 이용하여 입력값을 문자열화(stringfy)하고 JSON.parse로 내보낸다.
  // 새로고침을 해도 데이터가 남아있다.
  // localStorage.setItem("todos", JSON.stringify(todos)); //Storage {todos: '[{"text":"내용~","completed":false}]', length: 1}
  saveTodos(); // 12-1. 로컬스토리지에 담는 함수를 만들었으므로 위의 코드를 함수호출 코드로 수정.
  input.value = "";
}

//5. li,checkbox 요소를 추가하는 코드들을 하나의 함수로 묶어준다.
function createTodo(todo: Todo) {
  const newLI = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox"; // 빈 체크박스 타입 상태.
  //13. 체크박스의 상태를 checkbox.checked 속성에 할당하여 todo의 완료상태를 알맞게 변화시켜준다.
  checkbox.checked = todo.completed; // 
  //10. addEventListener를 통해 체크박스의 불리언 값을 할당한다.
  // 체크박스를 클릭 시에 checkbox.checked상태가 true, false로 상황에 따라 바뀐다. 그 값을 todo.completed에 할당한다.
  checkbox.addEventListener("change",function(){
   todo.completed = checkbox.checked;
   //12. 위에서 만든 로컬스토리지에 저장하는 함수를 호출한다.
   saveTodos();
  });
  newLI.append(todo.text);
  newLI.append(checkbox);
  list.append(newLI);
}
form.addEventListener("submit", handleSubmit);
