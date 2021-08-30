document.addEventListener("DOMContentLoaded", function(e) {
    generateCards();
    })


function initGame(letter) {
        letter.style.backgroundColor = "green";
    }


function generateCards() {
    let Nick = introduce()
    makeInteractive(Nick)
}

function introduce() {
    let Nick = window.prompt("Enter your name please: ")
    return Nick
}

const mainAudio = new Audio('Memory (Reprise) Cats the Musical.mp3')
const lost = new Audio('Sad_Trombone-Joe_Lamb-665429450.mp3')
const win = new Audio('Ta Da.mp3')
const correct = new Audio('correct.wav')
const wrong = new Audio('wrong.mp3')
function play(music) {
    music.play();
}

function stopPlay(music) {
    music.pause();
}

//-------------------------Glowna funckja--------------------------------

function makeInteractive(Nick) {
    let round = 0
    let nrOfCards = 12
    const rewersColor = "blue";
    let clickCounter = 0
    let currentCards = []
    let toGuess = nrOfCards/2
    pairs = generatePairs()
    let cards = document.getElementsByClassName('card');
    for(let i = 0; i < cards.length; i++) {
       let card = cards[i];
        card.onclick = function() {
            currentCards.push(card)
            function isEqual(elem){
                console.log(card)
                return elem.id == goDoSomething(card)
            }
        
            if (pairs[0].some(isEqual)) 
            card.style.backgroundColor = "red"
            else if (pairs[1].some(isEqual))
            card.style.backgroundColor = "yellow"
            else if (pairs[2].some(isEqual))
            card.style.backgroundColor = "black"
            else if (pairs[3].some(isEqual))
            card.style.backgroundColor = "green"
            else if (pairs[4].some(isEqual))
            card.style.backgroundColor = "grey"
            else if (pairs[5].some(isEqual))
            card.style.backgroundColor = "pink"

            console.log(currentCards)

            if(currentCards.length == 2) {
                if (checkMatch(currentCards, rewersColor, toGuess, Score) == "x") {
                    toGuess--
                }

                currentCards = []
                document.getElementById("left").innerHTML = toGuess; 
                }

             // else if(currentCards.length != 2)
            //   {  
            //     alert("Kolejna runda:")
            //    }

            clickCounter++;
            click = clickCounter / 2;
            round = Math.floor(click)
            Score = 50 - clickCounter - toGuess
            document.getElementById("clickCounter").innerHTML = round;
            document.getElementById("Score").innerHTML = Score;
            document.getElementById("Nick").innerHTML = Nick;
            console.log(clickCounter)
            if(clickCounter >= 30 || Score<20) {
                let result = document.createElement('div')
                result.id = "result"
                result.innerHTML = "<p>You lost.</p>"
                result.innerHTML += "<p>Try again!</p>"
                result.className = 'result'
                document.body.appendChild(result)
                play(lost)
            }
            }  
        }
    }
//-------------------------Wynik--------------------------------


function checkMatch(currentCards, rewersColor, toGuess, Score) {
    if(currentCards[0].name == currentCards[1].name) {
        console.log("trafileś!")
        play(correct)
        toGuess--;
        setTimeout(function() 
        {
        currentCards[0].style.backgroundColor = "white"
        currentCards[1].style.backgroundColor = "white"
        }, 500);


        if (toGuess <= 0) {
            console.log("brawo, wszystko odkryte")
            let result = document.createElement('div')
            result.id = "result"
            result.innerHTML = "<p>Congratulations, you won!</p>"
            result.innerHTML += "<p>Your score is:</p>"
            result.innerHTML += Score
            if (Score > 25) { result.innerHTML += "<p>✰✰✰</p>"}
            else if (Score > 22) {result.innerHTML += "<p>✰✰</p>"}
            else if (Score > 20) {result.innerHTML += "<p>✰</p>"}
            result.className = 'result'
            let replay = document.createElement('div')
            replay.id = "replay"
            // replay.innerHTML = "press here to play again"
            document.body.appendChild(result)
            document.body.appendChild(replay)
            play(win)
        }
        else { 
            console.log("zostalo do zgadniecia par",toGuess) 
        }
        return "x"
    }
    else {
        setTimeout(function() {
        currentCards[0].style.backgroundColor = rewersColor
        currentCards[1].style.backgroundColor = rewersColor
            }, 500);
        play(wrong)     
    }
}


function goDoSomething(d){ 
    return d.getAttribute("id");
    }

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


//-------------------------losowanie par--------------------------------
function generatePairs() {
   let pairNames = []
   const nrOfCards = 12
   while (pairNames.length < (nrOfCards/2)) {
       let id = makeid(3)
       !pairNames.includes(id) ? pairNames.push(id) : console.log("wow, that' rare", id)
   }
   let cards = document.getElementsByClassName('card');
   let values = Object.values(cards);
   function shuffle(array) {
       array.sort(() => Math.random() - 0.5);
   }
   shuffle(values)
    let pairs = [] 
   for(let i = 0; i < values.length+4; i++) {
   let pair = values.slice(values.length-2)
   pairs.push(pair)
   values.pop()
   values.pop()
   } 
   let i = 0;
   for (pair of pairs) {
        pair.forEach(elem => {
            elem.name = pairNames[i];
        });
        i++;
   }
   return pairs
}