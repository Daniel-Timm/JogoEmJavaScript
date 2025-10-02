const mario = document.querySelector (".mario");
const tubo = document.querySelector (".tubo");

//https://www.youtube.com/watch?v=Nm6vfrLrGs8
//https://youtu.be/qBSB5H7mCGo

const elementoPontuacao = document.querySelector(".pontuacao h2");
let score = 0;
//ReStart
const GameOverScreen = document.querySelector(".GameOver");
const RestartButton = document.querySelector(".RestartButton");

//start
const telaStart = document.querySelector (".StartScreen");
const botaoInicio = document.querySelector(".StartButton");

//Recorde
const elementoRecorde = document.querySelector(".recorde h2")
const highScoreSalvo = localStorage.getItem('highScore') || '0';


elementoRecorde.innerText = `Recorde: ${ (parseInt(highScoreSalvo)).toString().padStart(2,'0') }`;


tubo.style.setProperty('--tubo-speed', '2s'); 


//Aqui esta a tela de inicio~
const handleStartGame = () => {
    
    telaStart.style.display = "none";

    document.addEventListener('keydown', handleJump);
    
    startGameLoop();
}




// Variável global para controlar o loop
let loopId; 

// Função que controla o pulo do Mario
const jump = () => {
    mario.classList.add("jump"); 
    setTimeout (() => {
        mario.classList.remove("jump");
    }, 500);
}
//Pulo apenas em Space e SétaUp~
const handleJump = (event) => {
    
    if (event.key === " " || event.key === "ArrowUp") { 
        
        
        if (!mario.classList.contains("jump")) {
            jump();
        }
    }
};

// Função principal que inicia e executa o jogo

const startGameLoop = () => {
    // Atribui o intervalo à variável global 'loopId'
    loopId = setInterval (() => {
        
        if (score % 10 === 0 && score > 0) {
    
            const velocidadeAtualString = getComputedStyle(tubo).getPropertyValue("--tubo-speed");
            let novaVelocidadeNumero = parseFloat(velocidadeAtualString.replace('s', '')) - 0.0010; 
            
            if (novaVelocidadeNumero < 0.6){
                novaVelocidadeNumero = 0.6;
    }
    
    tubo.style.setProperty('--tubo-speed', novaVelocidadeNumero + 's');
}

score++;
elementoPontuacao.innerText = `Score: ${score.toString().padStart(2,'0')}`;

const marioPosition = parseInt(window.getComputedStyle(mario).bottom);
const tuboPosition = tubo.offsetLeft;

        // Lógica de COLISÃO
        if (tuboPosition <= 120 && tuboPosition > 0 && marioPosition < 60){
            
            GameOverScreen.style.display = 'block';
            if (+score > +highScoreSalvo) {
    
           // 1. SALVA O NOVO RECORDE (O localStorage só armazena texto)
           localStorage.setItem('highScore', score.toString());

           // 2. ATUALIZA A TELA DO RECORDE IMEDIATAMENTE
            elementoRecorde.innerText = `Recorde: ${score.toString().padStart(2, '0')}`;
         }
            
            tubo.style.animation = 'none';
            tubo.style.left = `${tuboPosition}px`;
            
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = "imgs/game-over.png";
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';
            
            document.removeEventListener('keydown', handleJump);
            
            // Para o loop 
            clearInterval(loopId); 
        }
    } , 10);
}
// ----------------------------------------------------

// Recomeço
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
    tubo.style.setProperty('--tubo-speed', '2s');
    
    // RE-HABILITA o pulo
    document.addEventListener("keydown", handleJump);
    
    // REINICIA o loop do jogo
    startGameLoop(); 
};


// Inicialização do Jogo
botaoInicio.addEventListener("click", handleStartGame); 

// Liga o botão de reinício à função

RestartButton.addEventListener("click", restartGame);
