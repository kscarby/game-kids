const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const letterTitle = document.querySelector('.letter');

const characters = ['abelha','flor','lapis','uva'];
const letter = "A";

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const playAgain = () => {
  const playButton = createElement('button', 'play-button');
  playButton.innerHTML = 'Tentar Novamente';

  grid.appendChild(playButton);

  playButton.addEventListener('click', () => {
    location.reload();
  });

}

const checkEndGame = () => {
  const correctCards = document.querySelectorAll('.correct-card');
  const correctText = document.querySelector('.correct');

  if (correctCards.length === 1) {
    clearInterval(this.loop);
    correctText.innerHTML = `Parabéns, ${spanPlayer.innerHTML}!` ;
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    playAgain();
    
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const correct = createElement('h1', 'correct' );

  front.style.backgroundImage = `url('../assets/${character}.jpg')`;

  card.appendChild(front);

  card.setAttribute('data-character', character);
  card.addEventListener('click', () => {
    const selectedCharacter = card.getAttribute('data-character').toLowerCase();
    if (selectedCharacter.charAt(0) === letter.toLowerCase()) {
      card.classList.add('correct-card');
      grid.appendChild(correct);
      checkEndGame();
    } else {
      alert('Incorreto. Tente novamente!');
    }
  });

  return card;
}

const loadGame = () => {
  const filteredCharacters = characters.filter(character => character.toLowerCase().charAt(0) === letter.toLowerCase());

  const newCharacters = [...filteredCharacters];

  const shuffledArray = characters.sort(() => Math.random() - 0.5);
  console.log(newCharacters);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
