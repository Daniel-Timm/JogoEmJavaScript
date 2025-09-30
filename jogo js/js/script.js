const mario = document.querySelector (".mario");
const elementoPontuacao = document.querySelector(".pontuacao h2");
let score = 0;
const GameOverScreen = document.querySelector(".GameOver");
const RestartButton = document.querySelector(".RestartButton");
const tubo = document.querySelector (".tubo");

// Variável global para controlar o loop
let loopId; 

// Função que controla o pulo do Mario
const jump = () => {
    mario.classList.add("jump"); 
    setTimeout (() => {
        mario.classList.remove("jump");
    }, 500);
}

// ----------------------------------------------------
// Função principal que inicia e executa o jogo
// ----------------------------------------------------
const startGameLoop = () => {
    // Atribui o intervalo à variável global 'loopId'
    loopId = setInterval (() => {
        
        score++;
        elementoPontuacao.innerText = `Score: ${score.toString().padStart(2,'0')}`;

        const marioPosition = parseInt(window.getComputedStyle(mario).bottom);
        const tuboPosition = tubo.offsetLeft;
        
        // Lógica de COLISÃO
        if (tuboPosition <= 120 && tuboPosition > 0 && marioPosition < 100){

            GameOverScreen.style.display = 'block';

            tubo.style.animation = 'none';
            tubo.style.left = `${tuboPosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = "imgs/game-over.png";
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';

            document.removeEventListener('keydown', jump);
            
            // Para o loop usando a variável correta
            clearInterval(loopId); 
        }
    } , 10);
}
// ----------------------------------------------------

// Função que reseta todos os estilos e reinicia o jogo
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
    
    // 1. RE-HABILITA o pulo
    document.addEventListener("keydown", jump);
    
    // 2. REINICIA o loop do jogo
    startGameLoop(); 
};

// ----------------------------------------------------
// Inicialização do Jogo
// ----------------------------------------------------

// Inicia o jogo automaticamente
startGameLoop();

// Adiciona o controle de pulo inicial
document.addEventListener('keydown', jump); 

// Liga o botão de reinício à função
RestartButton.addEventListener("click", restartGame);