let noPop =0;
let currentBubble =0
let gameOver = false;
let shadow = document.querySelector('.shadow')
let score = document.querySelectorAll('.score')
let bodys = document.body
let windowW = window.innerWidth;
let total = 30;
let windowH = window.innerHeight;
let start = document.querySelector('.start')
let bubbles = ['one','two','three','four','five'] 


function CreateBubble(){
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * bubbles.length);
    div.className = `bubble bubble${bubbles[rand]}`
    rand = Math.floor(Math.random() * (windowW - 150))
    div.style.left = rand + 'px'
    document.body.appendChild(div)
    animateBubble(div)
}

function animateBubble(elem){
 let pos = 0;
    let rand = Math.floor(Math.random() * (6-3));
let interval = setInterval(frame,Math.floor((noPop-2 / 3) +rand ))

function frame(){

if(pos > windowH+150 && document.querySelector('[data-number ="' + elem.dataset.number + '"]' != null)){
clearInterval(interval)
}
else{
    pos++;
    elem.style.top = windowH - pos + 'px'
}
}


}



function DeleteBubble(elem){
    elem.remove()
    noPop++
    scoreUpdate()
}

document.addEventListener('click',function(e){
 if(e.target.classList.contains('bubble')){
    DeleteBubble(e.target)
 }
})

function scoreUpdate(){
    score.forEach(e =>{
        e.textContent = noPop
    })
}


function startGame(){
    restartGame()
    let timeout = 0;
    let loop = setInterval(function(){
        timeout = Math.floor(Math.random() * 500 - 100)
        if(!gameOver && noPop != total){
            CreateBubble()
        }
        else if(noPop !== total){
            clearInterval(loop)
       shadow.style.display = 'flex'
       shadow.querySelector('.loser').style.display ='block'
        }
else{
    clearInterval(loop)
       shadow.style.display = 'flex'
       shadow.querySelector('.winner').style.display ='block'
    restartGame();
    }

    },300 + timeout)
}

function restartGame(){
    let num = document.querySelectorAll('.bubble');
    num.forEach(el =>{
        el.remove()
    })
    noPop = 0;
} 

document.querySelector('.restart').addEventListener('click',function(){
    shadow.style.display = "none";
    shadow.querySelector('.winner').style.display = 'none'
    shadow.querySelector('.loser').style.display = 'none'
    startGame()
})

document.querySelector('.cancel').addEventListener('click',function(){
    shadow.style.display ='none'
})

start.addEventListener('click',()=> { 
startGame()
document.querySelector('.mainGame').style.display = 'none'
})