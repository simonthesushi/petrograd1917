let gameState = {
  resources: 3,
  budget: 1,
  sovnarkom: 0
};

let currentCard = null;
let cardData = {};

fetch("cards/deck.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(card => {
      cardData[card.id] = card;
    });
    loadCard("opening_card");
  });

function updateStats() {
  document.getElementById("resources").innerText = gameState.resources;
  document.getElementById("budget").innerText = gameState.budget;
  document.getElementById("sovnarkom").innerText = gameState.sovnarkom;
}

function loadCard(cardId) {
  currentCard = cardData[cardId];
  document.getElementById("card-title").innerText = currentCard.title;
  document.getElementById("card-text").innerText = currentCard.text;
  const optionsDiv = document.getElementById("card-options");
  optionsDiv.innerHTML = "";

  currentCard.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option.text;
    btn.onclick = () => {
      applyEffects(option.effects);
      if (option.next) {
        loadCard(option.next);
      } else {
        document.getElementById("card-title").innerText = "The End... for now.";
        document.getElementById("card-text").innerText = "You've reached the end of the demo.";
        document.getElementById("card-options").innerHTML = "";
      }
    };
    optionsDiv.appendChild(btn);
  });

  updateStats();
}

function applyEffects(effects) {
  for (let key in effects) {
    gameState[key] += effects[key];
  }
}
