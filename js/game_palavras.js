const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const letterTitle = document.querySelector('.letter');

const characters = ['tenis', 'gato', 'lapis', 'formiga'];
const letter = "GATO";
let mixedLetter = '';

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

// Função para embaralhar uma palavra
const shuffleWord = (word) => {
    return word.split('').sort(function() {
        return 0.5 - Math.random();
    }).join('');
}

// Embaralhar a palavra em letter e armazená-la em mixedLetter
mixedLetter = shuffleWord(letter);

if (mixedLetter == letter) {
  mixedLetter = shuffleWord(letter);
}

// Selecionando um elemento com a classe 'span-mixed'
const spanMixed = document.querySelector('.span-mixed');

// Definindo o conteúdo HTML do elemento com a palavra embaralhada
spanMixed.innerHTML = mixedLetter;



const checkEndGame = () => {
  const correctCards = document.querySelectorAll('.correct-card');
  const correctText = document.querySelector('.correct');

  if (correctCards.length === 1) {
    clearInterval(this.loop);
    correctText.innerHTML = `Parabéns, ${spanPlayer.innerHTML}! ` ;
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
    const isWordInArray = card.getAttribute('data-character').toLowerCase();
    if (isWordInArray === letter.toLowerCase()) {
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
  
  const shuffledArray = characters.sort(() => Math.random() - 0.5);
  console.log(filteredCharacters);

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
