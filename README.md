# 실행법 🥊

다음 순서로 깃클론을 한 뒤 서버를 실행시켜줍니다.<br>

```
git clone git@github.com:kirkim/board.git
```

```
npm install
```

```
npm start
```

<br>
아래와 같이 콘솔이 출력되면 성공적으로 서버가 구동된 것 입니다.<br>
<br>
<img src="https://kirkim.github.io/assets/img/sample/1.png">
<br><br>
그 후 http://localhost:8080으로 접속<br>
화면중앙에 login을 클릭하면 다음과 같이 로그인창이 뜹니다.<br>

<img src="https://kirkim.github.io/assets/img/sample/2.png">

위의 버튼을 눌러 아이디를 생성한 뒤 로그인하면 됩니다.

🚫 `.env`파일은 .gitignore에 넣어서 사용하는 것이 좋습니다.

---

# 업데이트 ⚡️

## (2021.10.21 ~)

- <font color='green'>로그인, 로그아웃, 계정생성</font> (완료)
- <font color='green'>게시판, 게시판페이징, 게시물작성</font> (완료)
- <font color='green'>게시물삭제, 게시물노출갯수 선택버튼</font> (완료)
- <font color='green'>계정편집, 게시물편집</font> (완료)

- ~~<font color='gray'>계정삭제, 계정위임</font> (수정중)~~
- ~~<font color='gray'>게시물 검색, 유저 작성글 모아보기</font> (예정)~~

## (2021.10.27 ~) 프로젝트 종료

#### (문제점)

- 게시판을 제 멋대로 돌아가게 만들었는데 문제점이 많은 것같습니다.
- html코드를 nodejs에서 만들어서 만들어서 보내주다보니 가독성이 떨어지며 수정이 힘듬
- 결정적으로 REST API에 대해 잘못 이해하고 있었습니다.

#### (앞으로 계획)

- 이 프로젝트는 여기서 멈추고 다음개념을 더 공부한 뒤 새로운 프로젝트를 만들계획입니다.
- 프론트엔드와 백엔드의 분업화, 서버비용적문제, js의 발전에 따라 CSR(클라이언트사이드렌더링) 방식을 배우는 것은 필수인 것 같습니다.
- CSR(클라이언트사이드렌더링) vs SSR(서버사이드렌더링)
- MPA(Multi Page Application) vs SPA(Single Page Application)
- Ajax, JSON응답
- 쿠키, 세션, jwt 중 하나 잘 다루기
- DB(데이터베이스) 잘 다루기

---

# 히스토리 📚

- <details>
  <summary> <font size="4">&lt;2021-10-21&gt;</font> </summary>
  <font color='orange'>[git-diff 주소]:</font>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/9427a90921a39aa0d01bc94c130e3780461325b2">( 1차 )</a>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/280da97292e26870af716a5a4977d2bbdcf1fa04">( 2차 )</a>
  <br>
  <font color='green'>[생성]</font>

  - `express`를 이용하여 서버구축
  - `express.static()`으로 `'/static'`를 static폴더로 지정.

    - `res.sendFile()`로 html파일을 랜더링

  - 기본적인 뼈대 구축
    1. router, controller, db, middleware, static 폴더 설계
    2. global(홈), post(게시판), user(유저) 라우터 설계
    3. `get`, `post`, `delete`, `put` 컨트롤러 뼈대 구축
    4. user(유저), post(게시글) 가상DB생성 (`'/db'`폴더에 위치, DB를 사용하는 느낌을 주기위해 함수들을 Promise형태로 반환하도록 만듬)
  - `express-validator`모듈을 이용해서 **계정생성, 로그인** 입력값 검증 미들웨어 생성 (`'middleware/validator.js'`에 위치)
  - `dotenv`모듈을 이용해서 `process.env`를 사용
    1. 보안이필요한 값을 `.env`폴더에 저장해서 사용(gitignore필수)
    2. `config.js`를 만들어 `.env`에 있는 환경변수를 손쉽게 사용하도록함 (미리보기, 환경변수 default값 지정용)
  - `bcrypt` 모듈을 이용해서 password(비밀번호)를 해싱하도록함
  - `protect.js`미들웨어를 만듬
    - `publicOnly()`: 로그인안할때만 주소에 접근가능, 아닐시 게시판페이지('/posts') redirect.
    - `loginOnly()`: 로그인중일때만 주소에 접근가능, 아닐시 로그인페이지('/users/login') redirect.
  - `PageMaker`클래스 생성 (`'/render'`폴더에 위치)

    1. `PageMaker`클래스 매개변수

       - htmlData

         ```javascript
         htmlData = {
           title, // 제목
           content, // html형식 문자열
         };
         ```

       - req: 응답값

    2. `content`는 html형식으로 그대로 넘겨줌
       <details>
       <summary> htmlData example </summary>

       ```javascript
       const htmlData = {
         title: 'Signup',
         content: `
       	<div class="signup__div">
       		<h2>Sign up</h2>
       		<form class="signup__form" method="POST" action="/users/signup">
       			<input type="text" name="username" placeholder="Username" required />
       			<input type="text" name="name" placeholder="Name" required />
       			<input
       				type="password"
       				name="password"
       				placeholder="Password"
       				required
       			/>
       			<input
       				type="password"
       				name="confirmPassword"
       				placeholder="Confirm password"
       				required
       			/>
       			<input type="submit" value="SignUp" />
       		</form>
       	</div>`,
       };
       ```

    3. `PageMaker`클래스 내장함수
       - `required`: 매개변수가 모두 존재하는지 검증하는 함수
       - `addCss`: css파일 추가
       - `addJavascript`: js파일 추가
       - `setFooter`: &lt;footer&gt;태그 내용 지정
       - `render`: 기본 html 틀에 css, js파일, 제목, 내용, footer를 동기화해서 렌더링해줌

    </details>

  </details>

  - <details>
    <summary> <font size="4">&lt;2021-10-22&gt;</font> </summary>
    <font color='orange'>[git-diff 주소]:</font>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/acf302fff6b99ba693cd1ea3ee2731bda90162a8">( 1차 )</a>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/5e738739f773766d0f83d59096f0eb6ce5c7262f">( 2차 )</a>
    <br>
    <font color='blue'>[수정]</font>

    - `PageMaker`클래스가 html형식의 데이터를 그대로 받는방식 대신에 `'/static/'`폴더에 있는 html파일을 읽는 방식으로 바꿈 (`fs.readFileSync()`이용)

    <font color='green'>[생성]</font>

    - `express-flash`모듈을 이용해서 메시지를 출력할 수 있도록 함
    - `PageMaker`클래스에 `printMessage`함수를 만들어 `flash`메시지를 출력해주도록 함
    - `PageMaker`클래스에 &lt;nav&gt;태그를 커스텀할 수 있는 함수를 구현(`'/nav/login_nav.html'`에 커스텀)
    - css초기화를 위해 `_reset.css`적용 및 기본적인 css파일 구현

  </details>

  - <details>
    <summary> <font size="4">&lt;2021-10-23&gt;</font> </summary>
    <font color='orange'>[git-diff 주소]:</font>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/564c54267206e1c92fe1b7b455c929a9c38ab1e0">( 1차 )</a>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/f231add75da193c4cf958722d5728d382bc491de">( 2차 )</a>
    <br>
    <font color='red'>[삭제]</font>

    - `PageMaker`클래스를 상속하는 클래스를 만듬에 따라 변수를 유연하게 받기위해 `required`내장함수를 삭제

    <font color='green'>[생성]</font>

    - post(게시물)작성 입력값에 대한 validator미들웨어 생성
    - `PageMaker`클래스를 유연하게 만들기 위해서(자식클래스에서) `setContent`내장함수를 만들어 html의 내용을 커스텀할 수 있도록 함.
    - `PageMaker`클래스를 상속하는 `PostPageMaker`클래스를 생성

      1. 게시판 랜더링 목적으로 만듬
      2. `PageMaker`클래스의 `setContent`내장함수를 OverRide해서 사용
      3. `PostPageMaker`클래스 매개변수

         - data

         ```javascript
         data = {
           title,
           posts, // 게시물배열
           num, // 게시판 paging번호
         };
         ```

         - req: 응답값

      4. paging기능(페이지바 생성)
         - `data.posts`배열의 길이와 `data.num`현재 페이지 번호를 적절히 활용해서 구현
         - `[1] ◀︎ ... [11][12][13] ... ▶︎ [40]`의 형태로 출력되도록 구현예정
         - 각각의 `[페이지]`는 `/posts/페이지번호`로 링크를검
      5. 원하는 갯수(`this.pageRange`)의 개시물을 게시판에 노출
         - 게시물번호, 제목, 작성자, 생성날짜 순으로 노출
         - title은 해당게시물을 볼 수 있는 링크(`/posts/post/게시물id`})를 걸어둠
         - auth(작성자)는 해당 작성자 프로필을 볼 수 있는 링크(`/users/유저id`)를 걸어둠

    - `PageMaker`클래스를 상속하는 `CustomPageMaker`클래스 생성
      - `PageMaker`클래스는 html내용을 파일로만 받을 수 있는데, 동적인 내용을 받기 위해 만듬

  </details>

  - <details>
    <summary> <font size="4">&lt;2021-10-24&gt;</font> </summary>
    <font color='orange'>[git-diff 주소]:</font>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/29f5f185a484504e8093a475cd60895b0052b9b1">( 1차 )</a>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/aa281d0e22437d57fc800f4d675bdf0d12187fab">( 2차 )</a>
    <br>
    <font color='red'>[삭제]</font>

    - `CustomPageMaker`클래스 삭제: 단순히 동적인내용을 받기위해 만들기보다 `PageMaker`클래스의 내용을 수정하기로 함

    <font color='blue'>[수정]</font>

    - `PageMaker`클래스가 정적인내용, 동적인내용을 둘다받을 수 있는 클래스로 만듬. (`contentFile.substr(-5, 5) === '.html'`와 같이 입력문자열을 검증하는 방식으로 판단)

    <font color='green'>[생성]</font>

    - `PostPageMaker`클래스에서 페이징바 생성기능 구현완료
    - 프로필 (`/users/:id`) 페이지 구현
      - 유저가 작성한 게시물들이 출력되도록 구현예정
      - `PostPageMaker`클래스에 있는 `페이징바`가 이곳에서도 필요하게 되서 재활용을 위해 클래스를 리메이크할 예정

  </details>

  - <details>
    <summary> <font size="4">&lt;2021-10-26&gt;</font> </summary>
    <font color='orange'>[git-diff 주소]:</font>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/92bc606ab1c266759a49b1f409bab000b4dd842b">( 1차 )</a>&nbsp;&nbsp;<a href="https://github.com/kirkim/board/commit/68099cd43afc3783a245ae25e2befd8387e64c59">( 2차 )</a>
    <br>

    <font color='blue'>[수정]</font>

    - 게시판URL방식을 변경
      - 기존: `/posts/:id` --> 변경 후: `/posts/list?page=*&range=*`
      - (page)페이지번호와 (range)노출할게시판수를 `query`형태로 받아올 수 있게 됐습니다.
    - 게시글URL방식을 변경
      - 기존: `/posts/post/:id` --> 변경 후: `/posts/view?no=*&page=*&range=*`
      - (no)포스트Id, (page)페이지번호와 (range)노출할게시판수를 `query`형태로 받아올 수 있게 됐습니다.
    - 로그아웃 이후에 **뒤로가기**를 하면 **loginOnly미들웨어**(로그인유저만 접근하게하는 미들웨어)가 제대로 동작하지 않았습니다.<br> **loginOnly미들웨어**에 다음의 코드를 추가하여 제대로 동작하도록 만들었습니다.

      ```javascript
      res.header(
        'Cache-Control',
        'private, no-cache, no-store, must-revalidate'
      );
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      ```

    - 유저, 포스트의 편집과 생성의 `validation`모듈을 백엔드 유효성검사를 좀 더 정밀하게 만듬

    <font color='green'>[생성]</font>

    - 게시판 삭제기능 구현
      - js의 이벤트기능('click')을 이용해서 구현해봤습니다. (클릭시 `fetch`를 이용해 DELETE요청)
      - 성공할시 `200`, 삭제할포스트를 찾지못할시 `404`, 본인작성하지 않은 글을 삭제요청할시 `403`을 응답하도록 했습니다.
      - `200`응답을 받을 시 `'/posts'`페이지로 이동하도록 했습니다.
    - 존재하지않는 포스트주소를 요청시 접근할 수 없게 막는 미들웨어를 추가했습니다. (`existPost미들웨어`)
    - 표시할 게시판 갯수를 지정할 수 있는 `<select>`태그를 구현
      - `PostPageMaker`클래스 내부에 생성함수를 구현
      - 값을 선택과 동시에 적용되도록함
      - 적용된 게시판노출갯수에 `selected`고정되도록 만들었습니다.
    - 게시물을 누르면 게시판목록 위에 노출되도록 만들었습니다.
      - `query`로 개시물 노출갯수(range), 페이징(page), 포스트아이디(no)를 넘겨주어 현재 게시판 목록을 유지하고 해당게시글만 위에 생기도록 만듬
    - `PageMaker`클래스를 이용해서 게시물 수정페이지를 구현
    - `PUT`,`DELETE` 요청은 `<form>`태그로 요청이 안되서 프론트단 js에서 `fetch`기능을 이용하여 처리하도록 만듬
    - `PageMaker`클래스를 이용해서 프로필 편집 페이지를 구현
    - 프로필의 `PUT`,`DELETE`요청 또한 프론트단에서 `fetch`를 이용해서 요청을 주도록 했으면 입력값에 대한 유효성 검사를 프론트, 백엔드 두곳에서 하도록 만듬

  </details>

---

# API 📪 (보완필요)

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

      </details>
     <details>
     <summary><code>DELETE</code></summary>

     - response: (성공)`200`, (실패)`400`,`403`

     </details>

  3. ### `/users/update/:id`

     <details>
     <summary><code>GET</code></summary>

     - response: `200`

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

     - response: (성공)`200`, (실패)`400`,`403`

     </details>

  4. ### `/users/signup`

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
       redirect: `/users/login`

     </details>

  5. ### `/users/login`

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
     - redirect: `/posts/list`

     </details>

  6. ### `/users/logout`

     <details>
     <summary><code>POST</code></summary>

     - response: `200`
     - redirect: `/users/login`

     </details>
     </details>

- <details>
  <summary id="posts"> <font size="4">&#91;Posts&#93;</font> </summary>

  1.  <details>
      <summary>Post Schema</summary>

      ```javascript
      {
      	id: string, // 포스트 id
      	title: string, // 포스트 제목
      	content: string, // 포스트 내용
      	createdAt: Date, // 포스트 생성 날짜
      	userId: number, // 유저 id
      }
      ```

      </details>

  2.  ### `/posts/list`

      <details>
      <summary><code>GET</code></summary>

      - response: `200`

        ```javascript
        {
        	[board1, board2 ....]
        }
        query:
        	page: 페이지 번호
        	range: 페이지 노출 갯수
        ```

      </details>

  3.  ### `/posts/upload`

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
        redirect: `/posts/list`

      </details>

  4.  ### `/posts/view`

      <details>
      <summary><code>GET</code></summary>

      - response: `200`

      </details>

      <details>
      <summary><code>DELETE</code></summary>

      - response: (성공)`200`, (실패)`400`,`403`

      </details>

  5.  ### `/posts/update`

      <details>
      <summary><code>GET</code></summary>

      - response: `200`

      </details>

      <details>
      <summary><code>PUT</code></summary>

      - request

        ```javascript
        {
        	title,
        	content,
        }
        ```

      - response: (성공)`200`, (실패)`400`,`403`

      </details>

  </details>

---

# 페이지 렌더링

- <details>
  <summary>서버사이드 렌더링 이용</summary>

  - 클라이언트 사이드 렌더링을 할줄 모릅니다.(배울예정..react, vue.js)
  - `PUT`, `DELETE`요청은 `<form>`태그로 요청이 안되서 프론트단 js파일에서 이벤트리스너 + `fetch`로 요청을 처리했습니다.
  </details>

- <details>
  <summary>템플릿엔진(ejs, pug)를 사용 X</summary>

  - 템플릿엔진을 사용하지 않고 구현하는 것을 목적으로 했습니다.
  </details>

---

# 사용한 NPM 패키지 📦

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

   - 유저의 접속을 검증하기 위해 "session(세션)"을 이용했습니다.
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

9. <details>
   <summary>express-flash</summary>

   - `POST`요청 혹은 `오류가 난 뒤` **다른 페이지**를 `redirect`할 때 **클라이언트**에게 적절한 메시지를 전달해 주기위해 사용했습니다.
   - 단 한번만 노출되는 **휘발성**메시지여서 **새로고침**을 하여도 같은 메시지를 반복하지 않아서 유용합니다.
   - **session**저장소를 이용하기 때문에 **session**설정을 선언한 뒤에 `***.use(flash());`로 선언해야 합니다.
   - 이 프로젝트 같은 경우 `req.session.flash` 안에 **flash메시지**가 쌓이며,<br> `req.flash`로 데이터를 꺼내와 사용하면 `req.session.flash`저장소안에 데이터가 사라집니다.<br> (만약 `req.session.flash`데이터에 직접 접근하여 사용하면 데이터가 사라지지 않음 => 휘발성x)
   </details>
