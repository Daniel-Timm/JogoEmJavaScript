const mario = document.querySelector (".mario");

const elementoPontuacao = document.querySelector(".pontuacao h2");

let score = 0;

const GameOverScreen = document.querySelector(".GameOver")

const RestartButton = document.querySelector(".RestartButton")

const tubo = document.querySelector (".tubo")

const restartGame = () => {
    
    GameOverScreen.style.display = 'none';
    mario.src = 'imgs/mario.gif';
    mario.style.animation = '';
    mario.style.bottom = ''; 
    mario.style.width = ''; 
    mario.style.marginLeft = '';
    tubo.style.animation = '';
    tubo.style.left = '';
    score = 0; 
    elementoPontuacao.innerText = `Score: ${score.toString().padStart(2, '0')}`;
};

const jump = () => {
    mario.classList.add("jump"); 
    
    
    setTimeout (() => {
          mario.classList.remove("jump");
    }, 500);
}



const loop = setInterval (() => {
    
    score++;

    elementoPontuacao.innerText = `Score: ${score.toString().padStart(2,'0')}`;

    const marioPosition = parseInt(window.getComputedStyle(mario).bottom);

    const tuboPosition = tubo.offsetLeft;

    console.log("Posição do Mario:", marioPosition);
    
    if  (tuboPosition <= 120 && tuboPosition > 0 && marioPosition < 100){

        GameOverScreen.style.display = 'block';

        tubo.style.animation = 'none';
        tubo.style.left = `${tuboPosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "imgs/game-over.png"
        mario.style.width = '80px'
        mario.style.marginLeft = '50px'

        document.removeEventListener('keydown', jump);
        
        clearInterval(loop)
    }
    
} , 10);

document.addEventListener("click", restartGame);
document.addEventListener('keydown', jump);  
