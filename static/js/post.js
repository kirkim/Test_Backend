const deleteBtn = document.querySelector('#deleteBtn');

const handleDeleteBtn = async (event) => {
  const id = event.target.dataset.id;
  let response;
  try {
    response = await fetch(`/posts/post/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }

  if (response.status === 200) {
    window.location.reload();
    window.location.href = '/posts';
  }
};

deleteBtn.addEventListener('click', handleDeleteBtn);
