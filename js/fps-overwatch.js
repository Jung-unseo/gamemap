const radioInputs = document.querySelectorAll('input[type="radio"]');
const gameContents = document.querySelectorAll('.game-contents');
const contentsContainer = document.querySelector('.game-contents-container');

console.log(gameContents);

const inputValue = {
  story: '#dcdff0',
  character: '#bdc2d8',
  battlefield: '#a8afca'
};

// 버튼에 따른 배경 색상 변경
radioInputs.forEach((input) => {
  input.addEventListener('click', () => {
    contentsContainer.style.backgroundColor = inputValue[input.id];
    gameContents.forEach((gameContent) => {
      if (gameContent.classList.contains(input.id)) {
        gameContent.classList.add('show');
      } else {
        gameContent.classList.remove('show');
      }
    });
  });
});
