const GAME_TITLE = document.querySelector(".game_title");
const MESSAGE_TO_PLAYER = document.querySelector(".message");
const START_BUTTON = document.querySelector(".start_game_button");
const NEW_CARD_BUTTON = document.querySelector(".new_card_button");
const CHANGE_LANGUAGE_BUTTON = document.querySelector(".change_language");

const CARDS = document.querySelector(".cards");
const SUM = document.querySelector(".sum");

let sum = 0;
let language = "en";

let newCardText = "Do you want to draw a new card?";
let youWonText = "You've got BlackJack!";
let youLoseText = "You're out of the game!";
let startCardsText =
  "That are your start cards.\nDo you want to draw a new card?";
let firstStartText = "Want to play a round?";

let cardsText = "Cards: ";
let sumText = "Sum: ";

const changeToPolish = () => {
  GAME_TITLE.textContent = "Oczko!";
  START_BUTTON.textContent = "NOWA GRA";
  NEW_CARD_BUTTON.textContent = "DOBIERZ KARTĘ";
  CHANGE_LANGUAGE_BUTTON.textContent = "English";

  newCardText = "Chcesz dobrać nową kartę?";
  youWonText = "Masz Oczko!";
  youLoseText = "Przegrałeś!\nPowodzenia następnym razem!";
  startCardsText = "To są Twoje początkowe karty.\nChcesz dobrać nową kartę?";
  firstStartText = "Partyjkę?";

  cardsText = "Karty: ";
  sumText = "Suma: ";
  CARDS.textContent = cardsText;
  SUM.textContent = sumText;

  startFirstGame();
};

const changeToEnglish = () => {
  GAME_TITLE.textContent = "BlackJack";
  START_BUTTON.textContent = "START GAME";
  NEW_CARD_BUTTON.textContent = "NEW CARD";
  CHANGE_LANGUAGE_BUTTON.textContent = "Polski";

  newCardText = "Do you want to draw a new card?";
  youWonText = "You've got BlackJack!";
  youLoseText = "You're out of the game!";
  startCardsText =
    "That are your start cards:\nDo you want to draw a new card?";
  firstStartText = "Want to play a round?";

  cardsText = "Cards: ";
  sumText = "Sum: ";
  CARDS.textContent = cardsText;
  SUM.textContent = sumText;
  startFirstGame();
};

const changeLanguage = () => {
  if (language === "en") {
    language = "pl";

    changeToPolish();
  } else {
    language = "en";
    changeToEnglish();
  }
};

const disabledNewCardButton = () => {
  NEW_CARD_BUTTON.style.cursor = "not-allowed";
  NEW_CARD_BUTTON.disabled = true;
  NEW_CARD_BUTTON.style.backgroundColor = "grey";
};
const activeNewCardButton = () => {
  NEW_CARD_BUTTON.style.cursor = "pointer";
  NEW_CARD_BUTTON.disabled = false;
  NEW_CARD_BUTTON.style.backgroundColor = "var(--color-main)";
};

const getRandomCard = () => {
  return Math.floor(Math.random() * 13) + 1;
};
const changeRandomCardToValue = (card) => {
  if (card === 1) {
    return 11;
  } else if (card >= 11) {
    return 10;
  } else {
    return card;
  }
};
const changeInnerToCard = (card) => {
  if (card === 1) {
    return "A";
  } else if (card === 11) {
    return "J";
  } else if (card === 12) {
    return "Q";
  } else if (card === 13) {
    return "K";
  } else {
    return card;
  }
};

const showMessage = (gameState) => {
  if (gameState === "want_new_card") {
    MESSAGE_TO_PLAYER.textContent = newCardText;
  } else if (gameState === "you_lose") {
    MESSAGE_TO_PLAYER.textContent = youLoseText;
  } else {
    MESSAGE_TO_PLAYER.textContent = youWonText;
  }
};

const startNewGame = () => {
  MESSAGE_TO_PLAYER.innerText = startCardsText;
  let startCardFirst = getRandomCard();
  console.log(startCardFirst);
  let startCardSecond = getRandomCard();
  console.log(startCardSecond);
  sum =
    changeRandomCardToValue(startCardFirst) +
    changeRandomCardToValue(startCardSecond);
  CARDS.textContent =
    cardsText +
    changeInnerToCard(startCardFirst) +
    " " +
    changeInnerToCard(startCardSecond);

  SUM.textContent = sumText + sum;
  checkBlackJack();
  activeNewCardButton();
};

const drawNewCard = () => {
  let newCard = getRandomCard();
  CARDS.textContent += " " + changeInnerToCard(newCard);
  sum += changeRandomCardToValue(newCard);
  SUM.textContent = sumText + sum;

  checkBlackJack();
};

const checkBlackJack = () => {
  if (sum < 21) {
    showMessage("want_new_card");
  } else if (sum > 21) {
    showMessage("you_lose");
    disabledNewCardButton();
    setTimeout(startNewGame, 1500);
  } else {
    disabledNewCardButton();
    showMessage("you_won");

    setTimeout(startNewGame, 2500);
  }
};

const startFirstGame = () => {
  MESSAGE_TO_PLAYER.textContent = firstStartText;
  disabledNewCardButton();
};

START_BUTTON.addEventListener("click", startNewGame);
NEW_CARD_BUTTON.addEventListener("click", drawNewCard);
CHANGE_LANGUAGE_BUTTON.addEventListener("click", changeLanguage);

startFirstGame();
