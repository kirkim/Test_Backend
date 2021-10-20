<style>
	details,
	.sub {
		margin-left:40px;
	}
</style>

- <a href="#users">Users</a>
- <a href="#posts">Posts</a>

---

<h1 id="users"> &#91;Users&#93; </h1>

<details>
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

### - `/users/:id`

<div class="sub">

#### `GET`

<details>
<summary>get user by id</summary>

- response: `200`

  ```javascript
  {
    user,
  }
  ```

</details>

#### `PUT`

<details>
<summary>updating user</summary>

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

#### `DELETE`

<details>
<summary>delete user</summary>

- response: `204`

</details>
</div>

### - `/users/signup`

<div class="sub">

#### `GET`

<details>
<summary>get signup form</summary>

- response: `200`

</details>

#### `POST`

<details>
<summary>create new user</summary>

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
</div>

### - `/users/login`

<div class="sub">

#### `GET`

<details>
<summary>get login form</summary>

- response: `200`

</details>

#### `POST`

<details>
<summary>create new user</summary>

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
</div>

---

<h1 id="posts"> &#91;Posts&#93; </h1>

<details>
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

### - `/posts`

<div class="sub">

#### `GET`

<details>
<summary>get all posts</summary>

- response: `200`

  ```javascript
  {
  	[board1, board2 ....]
  }
  ```

</details>
</div>

### - `/posts/create`

<div class="sub">

#### `GET`

<details>
<summary>get post create page</summary>

- response: `200`

</details>

#### `POST`

<details>
<summary>create new post</summary>

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
</div>

### - `/posts/:id`

<div class="sub">

#### `GET`

<details>
<summary>get post by id</summary>

- response: `200`

</details>

#### `PUT`

<details>
<summary>update post</summary>

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

#### `DELETE`

<details>
<summary>delete post</summary>

- response: `204`

</details>
</div>

</div>
