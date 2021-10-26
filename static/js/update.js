const updateForm = document.querySelector('.update__form');
const titleInput = updateForm.querySelector('#update__title');
const contentInput = updateForm.querySelector('#update__content');
const updateBtn = updateForm.querySelector('button');

const handleUpdateBtn = async (event) => {
  const sch = location.search;
  const querys = new URLSearchParams(sch);
  const noParam = querys.get('no');
  const pageParam = querys.get('page');
  const rangeParam = querys.get('range');
  const title = titleInput.value;
  const content = contentInput.value;

  let response;
  try {
    response = await fetch(`/posts/update?no=${noParam}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
  } catch (error) {
    console.error(error);
  }
  if (response.status === 200) {
    window.location.reload();
    window.location.href = `/posts/view?no=${noParam}&page=${pageParam}&range=${rangeParam}`;
  }
};

updateBtn.addEventListener('click', handleUpdateBtn);
