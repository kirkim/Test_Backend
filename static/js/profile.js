const deleteBtn = document.querySelector('#deleteBtn');

const handleDeleteBtn = async (event) => {
  const id = event.target.dataset.id;
  let response;
  try {
    response = await fetch(`/users/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }

  if (response.status === 200) {
    window.location.reload();
    window.location.href = `/users/login`;
  }
};

deleteBtn.addEventListener('click', handleDeleteBtn);
