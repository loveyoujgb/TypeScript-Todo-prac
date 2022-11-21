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