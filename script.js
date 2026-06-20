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

    document.getElementById("preacher").textContent = current.preacher;
    document.getElementById("passage").textContent = current.passage;

    const bibleUrl = "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(current.passage);
    const status= document.createElement("div");

    status.innerHtml = `
      <p>Opening Bible Gateway...</p>
      <button id="goNow"> Tap to Continue</button>
      `;
    
    document.body.appendChild(status);

    document.getElementById("goNow").onclick = () => {
      window.location.href = bibleUrl;
    };
    
    setTimeout(() => {
      window.location.href = bibleUrl;
    }, 3000);
  })
    .catch(err => {
      console.error("FETCH ERROR:", err);
  });
