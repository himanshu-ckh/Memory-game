/*List to store all the element*/
let list = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
/*deck for all cards*/
let deck = document.getElementById("dec");
/*all cards*/
let cards = document.getElementsByClassName("card");
/*counter for moves*/
let counter = document.querySelector(".moves");
/*stars*/
let stars = document.querySelectorAll(".fa-star");
/*timer for time*/
let timer = document.querySelector(".timer");
/*modal for final display of result*/
let modal = document.getElementById("modalDisplay");
/*close icon in modal to close the window*/
let closeicon = document.querySelector(".close");
let count = 0;
let cardLength = 0;
let card_open = [];
let posi = [];
let matchedCard = [];
let finalPosi = [];
let second = 0;
let minute = 0;
let hour = 0;
let interval;
let card;
let moves = 0;
let arr = [];

/*start the game when we load the page*/
document.body.onload = startMemoryGame();

/*function which starts the game*/
function startMemoryGame() {
	arr = shuffle(list);
/*reset the page when clicked on refresh or play again*/
	for (let i = 0; i < cards.length; i++){
		deck.innerHTML = "";
	}
/*add the property fa-arr[values] to the deck*/
	addProperty();
/*adding event lostener to the card*/
	eventListener();
/*reseting all the values of the page such as timer and stars*/
	moves = 0;
	matchedCard = [];
	counter.innerHTML = moves;
    /*reseting the values of stars*/
	for (let i= 0; i < stars.length; i++){
		stars[i].style.color = "red";
		stars[i].style.visibility = "visible";
	}
    /*reseting the value of timer*/
	second = 0;
	minute = 0;
    hour = 0;
    timer.innerHTML = "0 hours 0 mins 0 secs";
    clearInterval(interval);
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

/* function to add the fa fa-list property*/
function addProperty() {
for (let j = 0; j< arr.length; j++) {
    /*create list*/
	let lis= document.createElement("li");
    /*create <i> for all the fa-class items*/
	let lis_item= document.createElement("i");
	lis.classList.add("card");
	let lis_item_class_name = "fa-"+ arr[j];
	lis_item.classList.add("fa", lis_item_class_name);
    /*apend all the created elements to  the deck*/
	lis.appendChild(lis_item);
	deck.appendChild(lis);
}
};

/*event listener for the cards*/
function eventListener() {
for(let i = 0; i<arr.length; i++){
cards[i].addEventListener('click', function(){
    /*show the cards*/
	show(i);
    /*all other functions are called within this function*/
	cardOpen(arr[i], i);
});
}
};

/*function to show the cards if clicked*/
function show(a){
cards[a].classList.toggle('open');
cards[a].classList.toggle('show');
};

/*function to add the cards to the card_open list*/
function cardOpen(wCard, b){
	card_open.push(wCard);
	posi.push(b);
	cardLength = card_open.length;
	if(cardLength==2){
		if(card_open[0]===card_open[1])
		{
			itsMatch(card_open[0], card_open[1], posi[0], posi[1]);
		} else{
			notMatch(card_open[0], card_open[1], posi[0], posi[1]);
		}
	}
};

/*if cards are match the showing it in the html*/
function itsMatch(card_1, card_2, c, d){
    if(c!=d){
	cards[c].classList.toggle("match");
	cards[d].classList.toggle("match");
    /*if cards are matched then disable the event on of click on that card*/
    cards[c].style.pointerEvents = 'none';
    cards[d].style.pointerEvents = 'none';
	card_open.pop();
	card_open.pop();
	posi.pop();
	posi.pop();
    countMoves();
	matchedCard.push(card_1, card_2);
	if (matchedCard.length == 16){
		gameOver();
	}
} /*if the same card is clicked again and again it won't increase the moves*/ else {
    card_open.pop();
    card_open.pop();
    posi.pop();
    posi.pop();
}
};

/*if the cards do not match then removing the classes corresponding to it*/
function notMatch(rcard_1, rcard_2, e, f){
    if(e!=f){
	cards[e].classList.toggle("unmatch");
	cards[f].classList.toggle("unmatch");
    /*to disable the mouse pointer for a time*/
    cards[e].style.pointerEvents = 'none';
    cards[f].style.pointerEvents = 'none';
	setTimeout(function(){
        cards[e].classList.remove("show", "open", "unmatch");
        cards[f].classList.remove("show", "open", "unmatch");
        /*to enable the mouse event back again*/
        cards[e].style.pointerEvents = 'auto';
        cards[f].style.pointerEvents = 'auto';
        openedCards = [];
    },1000);
    card_open.pop();
	card_open.pop();
	posi.pop();
	posi.pop();
    countMoves();
} /*if the same card is clicked again and again it won't increase the moves*/ else{
    card_open.pop();
    card_open.pop();
    posi.pop();
    posi.pop();
}
};
/*to count the number of moves and the time calculated to complete the game*/
/*the moves are added only when two cards are selected.*/
function countMoves(){
    moves++;
    counter.innerHTML = moves;
    /*starting the timer when it is clicked for the first time*/
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        /*function to start the timer*/
        startTimer();
    }
    /*displaying the number of stars based on the user moves*/
    /*if moves of the user <10 he/she will get 3 stars else if the moves of the user is between 11 to 15 he/she will get 2 stars, otherwise 1 star*/
    if (moves > 10 && moves < 15){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "hidden";
            }
        }
    }
    else if (moves > 15){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "hidden";
            }
        }
    }
};

/*display the game timer*/
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = hour+"hour "+minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
/*if the time is 60 hour that may means that the user have left the game so close the window*/
        if(hour == 60){
            window.close();
        }
    },1000);
};

/*after completion of the game*/
function gameOver(){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        let starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
};

/*function to close the modal*/
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        window.close();
    });
};

/*function if the user wants to play again or click on the refres*/
function playAgain(){
    modal.classList.remove("show");
    startMemoryGame();
};