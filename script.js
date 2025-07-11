const SHEET_URL = "https://script.google.com/macros/s/AKfycbwV75_O9rWnQOz-rgLuJQKgaHpGIQU-EF_qxT0-x1XXBPl6n8VKluJwcCXHOTu9m7vs/exec"; // آدرس Web App شما

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("menuContainer");
    container.innerHTML = '';

    data.forEach(item => {
      const foodDiv = document.createElement("div");
      foodDiv.className = "food-item";

      if (item.available === false || item.available === "FALSE") {
        foodDiv.classList.add("unavailable");
        foodDiv.innerHTML += <div class="overlay">ناموجود</div>;
      }

      foodDiv.innerHTML += 
        <img src="images/${item.img}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.price} تومان</p>
      ;

      container.appendChild(foodDiv);
    });
  });
