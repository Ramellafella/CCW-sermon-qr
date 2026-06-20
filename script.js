const apiUrl = 
  "https://script.google.com/macros/s/AKfycbxv9-D_pHFJztQjWV0xie_8OeH9mzVfEKMYeU9xCeH-IZ_STR6aa7X7j7ICgQHmBvlo/exec";

fetch(apiUrl)
  .then(r => r.json())
  .then(schedule => {
    const today = new Date();

    let current = schedule[0];

    schedule.forEach(item => {
      const sermonDate = 
        new Date(item.date);

      if (sermonDate <= today) {
        current = item;
      }
    });

    document.getElementById("preacher")
      .textContent = current.preacher;

    document.getElementById("passage")
      .textContent = current.passage;

    document.getElementById("link")
      .href = "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(current.passage);

    setTimeout(() => {
      window.location.href = 
        document.getElementById("link).href;
    }, 3000);
  })
    .catch(err => {
      console.error(err);

      document.getElementById("status).textContent = 
        "Unable to load service information."
  });
