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

# 사용 미들웨어

1.
