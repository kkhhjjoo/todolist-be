# Todo List Backend

Node.js와 MongoDB를 사용한 Todo List 백엔드 API

## 설치 및 실행

1. 의존성 설치:

```bash
npm install
```

2. 환경변수 설정:
   프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```
MONGODB_URI=mongodb://localhost:27017/todolist
PORT=4000
NODE_ENV=development
```

3. MongoDB 실행:

- 로컬 MongoDB가 설치되어 있다면 `mongod` 명령어로 실행
- 또는 MongoDB Atlas 클라우드 서비스 사용

4. 서버 실행:

```bash
npm start
```

## MongoDB 연결

- 기본 연결: `mongodb://localhost:27017/todolist`
- MongoDB Atlas 사용 시: `mongodb+srv://username:password@cluster.mongodb.net/todolist`

## API 엔드포인트

- `GET /api/todos` - 모든 할일 조회
- `POST /api/todos` - 새로운 할일 생성
- `PUT /api/todos/:id` - 할일 수정
- `DELETE /api/todos/:id` - 할일 삭제
