async function handleScratchLabSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // ограничим до 5 файлов (если нужно – можешь поменять)
  const fileInput = form.querySelector('input[name="photos"]');
  if (fileInput && fileInput.files) {
    const files = Array.from(fileInput.files).slice(0, 5);
    // очищаем случайно добавленное браузером
    formData.delete('photos');
    files.forEach((file, index) => {
      formData.append(`photo${index + 1}`, file);
    });
  }

  try {
    const res = await fetch('https://n8n.vladkuzmenkoai.com/webhook/thescratchlab', {
      method: 'POST',
      body: formData, // ВАЖНО: без ручного Content-Type
    });

    if (!res.ok) {
      console.error(await res.text());
      throw new Error('Submit failed');
    }

    // здесь показываешь “Спасибо, заявка отправлена”
  } catch (err) {
    console.error(err);
    // здесь показываешь “Ошибка отправки, попробуйте ещё раз или позвоните нам”
  }
}
