document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.login__input');
    const button = document.querySelector('.login__button');
    const form = document.querySelector('.login-form');
    const option1Button = document.querySelector('.option1-button');
    const option2Button = document.querySelector('.option2-button');
    const option3Button = document.querySelector('.option3-button');
  
    let selectedOption = null;
  
    function validateInput() {
        if (input.value.length > 0 && selectedOption !== null) {
            button.removeAttribute('disabled');
            return;
        }
  
        button.setAttribute('disabled', '');
    }
  
    const handleOptionClick = (optionButton, option) => {
        // Remover a classe 'selected' de todas as opções
        option1Button.classList.remove('selected');
        option2Button.classList.remove('selected');
        option3Button.classList.remove('selected');
  
        if (selectedOption === option) {
            // Se a opção clicada for a mesma que já está selecionada, limpar a seleção
            selectedOption = null;
        } else {
            // Caso contrário, definir a opção clicada como selecionada e adicionar a classe 'selected'
            selectedOption = option;
            optionButton.classList.add('selected');
        }
        validateInput();
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
  
        const player = input.value;
  
        if (player && selectedOption) {
            localStorage.setItem('player', player);
            localStorage.setItem('option', selectedOption);
            window.location = `pages/game_${selectedOption}.html`;
        } else {
            alert('Por favor, preencha o nome do jogador e escolha a opção.');
        }
    }
  
    input.addEventListener('input', validateInput);
    form.addEventListener('submit', handleSubmit);
  
    option1Button.addEventListener('click', () => handleOptionClick(option1Button, 'memoria'));
    option2Button.addEventListener('click', () => handleOptionClick(option2Button, 'letras'));
    option3Button.addEventListener('click', () => handleOptionClick(option3Button, 'palavras'));
  });
  