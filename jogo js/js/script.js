const mario = document.querySelector (".mario");
const tubo = document.querySelector (".tubo")
const jump = () => {
    mario.classList.add("jump"); 
    
    
    setTimeout (() => {
          mario.classList.remove("jump");
    }, 500);
}

const loop = setInterval (() => {
    
    const marioPosition = parseInt(window.getComputedStyle(mario).bottom);

    const tuboPosition = tubo.offsetLeft;

    console.log("Posição do Mario:", marioPosition);
    
    if  (tuboPosition <= 120 && tuboPosition > 0 && marioPosition < 100){
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

document.addEventListener('keydown', jump);  