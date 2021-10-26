const editForm = document.querySelector('#edit__form');

const handleEditBtn = async (event) => {
  event.preventDefault();
  const usernameInput = editForm.querySelector('#username');
  const nameInput = editForm.querySelector('#name');
  const passwordInput = editForm.querySelector('#password');
  const confirmPasswordInput = editForm.querySelector('#confirmPassword');
  const username = usernameInput.value;
  const name = nameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const id = event.target.dataset.id;
  let updateRes;
  let logoutRes;
  if (password || confirmPassword) {
    if (password !== confirmPassword) {
      window.location.reload();
      window.location.href = `/users/update/${id}?msg='wrong password'`;
    }
  }

  try {
    updateRes = await fetch(`/users/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, name, password, confirmPassword }),
    });
  } catch (error) {
    console.error(error);
  }
  if (updateRes.status === 200) {
    try {
      logoutRes = await fetch(`/users/logout`, {
        method: 'POST',
      });
    } catch (error) {
      console.error(error);
    }
    if (logoutRes.status === 200) {
      window.location.reload();
      window.location.href = `/users/login`;
    }
  }
};

editForm.addEventListener('submit', handleEditBtn);
