
///////VARIAVEIS///////
var vel_serpent=5;//determina a velocidade do loopin na função principal main
var ultima_renderização=0;
const painel = document.getElementById('painel_de_movimento')//Captura o elemento do canvas e cria um painel
var score = document.getElementById("score")
var alerta= document.getElementById("alertas")
var ponto = 0//pontuação

botao1.addEventListener('click',function(){{botaoapertado(this)}}, false)
botao2.addEventListener('click',function(){{botaoapertadomenos(this)}}, false)
var tamanho_do_grid = 20;
var cobra_corpo=[{x:3, y:3}];//cobra começa com tres unidades da matriz
// var cobra_corpo=[
//     {x:10,y:10},
//     {x:9,y:10},
//     {x:8,y:10},
//     {x:7,y:10},
//     {x:6,y:10},
//     {x:5,y:10},
//     {x:4,y:10},
//     {x:3,y:10},
//     {x:2,y:10},
//     {x:1,y:10},
//     {x:1,y:9},
//     {x:1,y:8},
//     {x:1,y:7},
//     {x:1,y:6},
//     {x:1,y:5},
// ]
    

const direcao={x:1,y:0}//faz a cobra andar
var posicao_do_ponto =  generate();
const ultima_direcao = direcao


function listener(params) {//FUNÇÃO QUE CAPTURA OS MOVIMENTOS DO TECLADO
    
document.addEventListener('keydown',function(event) {console.info(event.key)
var tecla = event.key
switch(tecla)
    {case 'w'://cima
    if(ultima_direcao.y != 0)break
        direcao.x=0
        direcao.y=-1
        break
    case 's'://baixo
        if(ultima_direcao.y != 0)break
        direcao.x=0
        direcao.y=1
        break
    case 'a'://esquerda
        if(ultima_direcao.x != 0)break
        direcao.x=-1
        direcao.y=0
        break
    case 'd'://direita
        if(ultima_direcao.x != 0)break
        direcao.x=1
        direcao.y=0
        break}



})};

///DESENHA A COBRA
function desenho(params) {
        
    cobra_corpo.forEach((pedaco_da_cobra, index) => {
        const cobraElement = document.createElement('div');
        cobraElement.classList.add('cobra'); //Adiciona a lista de classes os elementos do corpo da cobra através do nome 'cobra'
        cobraElement.style.gridColumnStart = pedaco_da_cobra.x; //diz em que posição o corpo da cobra inicilizara,através dos parametros x,y de cada div
        cobraElement.style.gridRowStart = pedaco_da_cobra.y;
        if (index==0){
            cobraElement.classList.add('cabeca');
        }
        painel.appendChild(cobraElement); //renderriza a serpente no painel
        return  pedaco_da_cobra;
    })


};
           




function main(time) {//time: mostra o tempo em milisegundos entre uma chamada da função e a seguinte.Função de fazer o looping que movimenta a cobra e fazer as verificações que compõem as regras do jogo cada vez que o looping passar pelas funções
   
    window.requestAnimationFrame(main)

    var tempo_de_redenrizacao=(time-ultima_renderização)/1000//transformando o intervalo em segundos
    
    
    if (tempo_de_redenrizacao<1/vel_serpent) return
    ultima_renderização=time// Atualiazando a variavel ultima_renderização, de modo que todos os intervalos tenham intervalos de tempo próximos, no caso de meio segundo
    
    update()
    
    painel.innerHTML=""
    desenho()
    cria_ponto()
    update_food()//nova posição para comida após ser tocada
    
    
    listener()//recebe comando  do teclado
    if (colisao()){
       // alerta.append("<button> voce perdeu o jogo pois colidiu com a cobra </button>")
        if (confirm("Voce perdeu o jogo pois colidiu com a cobra.")){
             window.location.reload()
         }
    }
    if(fora_do_painel()){
        //alerta.append("voce perdeu o jogo forado painel")
           if(confirm("Voce saiu do painel.")) {
               window.location.reload()
        }
    }//verifica se a cobra ultrapassou os limites do painel
    
    
        
}
    


function cria_ponto() {
    const pontoElement=document.createElement('div')
    pontoElement.classList.add('ponto')//Adiciona a lista de classes os elementos do corpo da cobra através do nome 'cobra'
    pontoElement.style.gridColumnStart=posicao_do_ponto.x //diz em que posição o corpo da cobra inicilizara,através dos parametros de cada div
    pontoElement.style.gridRowStart= posicao_do_ponto.y
    painel.appendChild(pontoElement)
    
}
    

window.requestAnimationFrame(main)
//chama a função quando o browser esta prestes a renderizar

function update(){
    for (let i=cobra_corpo.length-2;i>=0;i--){
        cobra_corpo[i+1]={...cobra_corpo[i]};
    }
    cobra_corpo[0].x+=direcao.x;//direciona a cobra
    cobra_corpo[0].y+=direcao.y;
}


function colisao(){//colisao consigo mesma
    return cobra_corpo.some ((parametro_da_cobra, index)=>{
        if (index>0){
            return cobra_corpo[0].x==parametro_da_cobra.x && cobra_corpo[0].y==parametro_da_cobra.y
        }
        return false;

    } );
}
      

function update_food(){
    if (cobra_corpo[0].x=== posicao_do_ponto.x && cobra_corpo[0].y===posicao_do_ponto.y){
        cobra_corpo.push({...cobra_corpo.length-1})
        ponto++;
        score.innerHTML=ponto;
        posicao_do_ponto = generate();

    // posicao_do_ponto=[{x:Math.floor(Math.random()*30)+1,
       // y:Math.floor(Math.random()*30)+1}];
     //if (posicao_do_ponto[0].x==cobra_corpo.x && posicao_do_ponto[0].y==cobra_corpo.y){
        //posicao_do_ponto=[{x:Math.floor(Math.random()*30)+1,
       // y:Math.floor(Math.random()*30)+1}]}
     
    }
}
        
 
function fora_do_painel(){
    if(cobra_corpo[0].x == tamanho_do_grid+1 || cobra_corpo[0].x==0 || cobra_corpo[0].y ==tamanho_do_grid +1 || cobra_corpo[0].y==0)
    {return true} 
      
}

function botaoapertado(botoes){
    vel_serpent+=1
    console.log(vel_serpent)
}

function botaoapertadomenos(){
    vel_serpent-=1;
    console.log(vel_serpent)
}


function generate(){
     let colidiu=true;
     var nova_posicao_da_comida;
     while(nova_posicao_da_comida===undefined || colidiu){
        nova_posicao_da_comida = {
            x:Math.floor(Math.random()*tamanho_do_grid)+1,
            y:Math.floor(Math.random()*tamanho_do_grid)+1
        };
        colidiu = colisao_da_comida_c_a_cobra(nova_posicao_da_comida);
        console.log("nova posição gerada. colidiu? " + colidiu)
    }
    return nova_posicao_da_comida;
}


function colisao_da_comida_c_a_cobra(nova_posicao){
    return cobra_corpo.some ((pedaco_da_cobra, index)=>{
        return nova_posicao.x==pedaco_da_cobra.x && nova_posicao.y==pedaco_da_cobra.y;
    } );
}













  