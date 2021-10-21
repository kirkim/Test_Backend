- <a href="#users">Users</a>
- <a href="#posts">Posts</a>

---

# API

- <details>
  <summary id="users"> <font size="4">&#91;Users&#93;</font> </summary>

  1. <details>
      <summary>User Schema</summary>

     ```javascript
     {
     	id: string, // 아이디 생성시 id배정
     	username: string, // 로그인ID, unique옵션
     	password: string, // 비밀번호, bcrypt API로 해싱
     	name: string, // 사용자 이름
     }
     ```

     </details>

  2. ### `/users/:id`

     <details>
     <summary><code>GET</code></summary>

     - response: `200`

       ```javascript
       {
       	user,
       }
       ```

     </details>

     <details>
     <summary><code>PUT</code></summary>

     - request

       ```javascript
       {
       	username,
       	name,
       	password,
       	confirmPassword,
       }
       ```

     - response: `200`

       ```javascript
       {
       	user,
       }
       ```

     </details>

     <details>
     <summary><code>DELETE</code></summary>

     - response: `204`

     </details>

  3. ### `/users/signup`

     <details>
     <summary><code>GET</code></summary>

     - response: `200`

     </details>

     <details>
     <summary><code>POST</code></summary>

     - request:

       ```javascript
       {
       	username,
       	name,
       	password,
       	confirmPassword,
       }
       ```

     - response: `201`
       redirect: `/login`

     </details>

  4. ### `/users/login`

     <details>
     <summary><code>GET</code></summary>

     - response: `200`

     </details>

     <details>
     <summary><code>POST</code></summary>

     - request:

       ```javascript
       {
       	username,
       	password,
       }
       ```

     - response: `200`
     - redirect: `/posts`

     </details>

  5. ### `/users/logout`

     <details>
     <summary><code>GET</code></summary>

     - response: `200`

     </details>
     </details>

- <details>
  <summary id="posts"> <font size="4">&#91;Posts&#93;</font> </summary>

  1.  <details>
      <summary>Post Schema</summary>

      ```javascript
      {
      	id: string, // 유저 id
      	title: string, // 포스트 제목
      	text: string, // 포스트 내용
      	createdAt: Date, // 포스트 생성 날짜
      	name: string, // 유저 이름
      	username: string // 유저 로그인id
      	name: string, // 사용자 이름
      }
      ```

      </details>

  2.  ### `/posts`

      <details>
      <summary><code>GET</code></summary>

      - response: `200`

        ```javascript
        {
        	[board1, board2 ....]
        }
        ```

      </details>

  3.  ### `/posts/create`

      <details>
      <summary><code>GET</code></summary>

      - response: `200`

      </details>

      <details>
      <summary><code>POST</code></summary>

      - request:

        ```javascript
        {
        	username,
        	password,
        }
        ```

      - response: `200`
        redirect: `/posts`

      </details>

  4.  ### `/posts/:id`

      <details>
      <summary><code>GET</code></summary>

      - response: `200`

      </details>

      <details>
      <summary><code>PUT</code></summary>

      - request

        ```javascript
        {
        	id,
        	title,
        	text,
        	createdAt,
        	name,
        	username,
        	name,
        }
        ```

      - response: `200`

        ```javascript
        {
        	post,
        }
        ```

      </details>
      <details>
      <summary><code>DELETE</code></summary>

      - response: `204`

      </details>

  </details>

---

# 페이지 렌더링

- <details>
  <summary>서버사이드 렌더링 이용</summary>

  - 클라이언트 사이드 렌더링을 할줄 모릅니다.(배울예정..react, vue.js)
  </details>

- <details>
  <summary>템플릿엔진(ejs, pug)를 사용 X</summary>

  - 템플릿엔진을 사용하지 않고 구현하는 것을 목적으로 했습니다.
  </details>

---

# 사용한 NPM 패키지

1. <details>
   <summary>express</summary>

   - http 통신을 손십게 할 수 있도록 도와주는 NodeJs 프레임워크 입니다.
   </details>

2. <details>
   <summary>morgan</summary>

   - 개발용 미들웨어로 응답method와 상태코드등등을 보여줍니다.
   </details>

3. <details>
   <summary>express-session</summary>

   - 유저의 접속을 확인하기 위해 "session(세션)"을 이용했습니다.
   </details>

4. <details>
   <summary>session-file-store</summary>

   - 이번 프로젝트는 in-memory database를 이용하기 때문에 각종 DB에서 제공해주는 저장공간을 사용하지 못합니다. <br>
   다행히 "session-file-store"을 이용 session정보를 담기위해 이용했습니다.
   </details>

5. <details>
   <summary>dotenv</summary>

   - 보안유지가 필요한 "환경변수"들을 `.env`파일에 담아서 보관하며 `.gitignore`파일에 등록하여 외부에 유출되지 않도록 관리합니다.
   - `.env`파일에 담긴 "환경변수"들은 `process.env.환경변수명`로 입력하여 어디서든 불러서 사용할 수 있습니다.
   - `import 'dotenv/config'`로 불러오거나 `config()`를 반드시 호출해줘야 합니다.
   </details>

6. <details>
   <summary>path</summary>

   - 이번 프로젝트는 `type: module`이기 때문에 **modernJS**에서까지만 지원해주는 `__dirname`과 같은 변수를 사용할 수 없습니다. <br>
   그 대안으로 **nodeJs**에 기본적으로 내장된 `path`모듈을 이용했습니다.
   </details>

7. <details>
   <summary>bcrypt</summary>

   - **패스워드**를 그대로 저장하는 것은 위험합니다. `bcrypt`를 이용하여 **패스워드**를 **hashing**해주었습니다.
   - `솔트`까지 추가해 주어 **레인보우 테이블**로 부터 상대적으로 안전하고 `해싱횟수`도 임의로 지정해 줄 수 있습니다.
   - `해싱횟수`가 늘어날 수록 기하급수적으로 처리속도가 저하되기 때문에 주의해야합니다.( 10 ~ 12번이 적당)
   </details>

8. <details>
   <summary>express-validator</summary>

   - `POST`를 요청하기 전에 **페이지**에서 응답값들이 **유효한지** 체크해줄 수 있습니다.<br>
     하지만 **페이지**의 코드는 누군가에 의해 수정될 수 있고 `유효하지않은값`이 입력된 채로 `POST`요청이 될 수 있습니다. 보안상으로 위험한 일입니다.
   - 그렇기 때문에 `express-validator`모듈을 이용하여 서버에서 `POST`요청값들을 다시한번 **채크**하도록 했습니다.
   </details>
