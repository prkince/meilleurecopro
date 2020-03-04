// Dimension de la grille: x=10 y=10
// Position initiale de l’aspirateur: x=5 y=5 orientation=N
// Instructions: DADADADAA

// On attend comme position finale : x=5 y=6 orientation=N

// (N,E,W,S) 

const btn = document.querySelector('.btn');

let x, y, posX, posY, posN, grid, instructions, start, finish;

btn.addEventListener("click", function(){
	// Selectionner les inputs
	getInputs();
	// Afficher la position initiale
	document.querySelector(".position-initiale").innerText = `Position initiale: x=${posX} y=${posY} orientation=${posN}`
	// afficher la grille correspondante aux dimensions fournies
	displayGridY();
	gridStyle.style = `grid-template-columns: ${amount}`;

	// Selectionner le point de départ sur la grille
	startingPoint();

	// Afficher le point de départ sur la grille en bleu
	start.classList.add("blue");
	start.innerHTML = arrow();

	// calcul des nouvelles coordonnées
	iHoover(x,y);

	// Selectionner le point d'arrivée sur la grille
	finishPoint();

	// Afficher le point d'arrivée sur la grille en rouge
	if (start == finish){
		document.querySelector(".final-answer").innerText = 'La position de départ est la même que la position finale!'
	} else {
		finish.classList.add("red");
		finish.innerHTML = arrow();
		document.querySelector(".final-answer").innerText = `Position finale: x=${posX} y=${posY} orientation=${posN}`
	}
});

const gridStyle = document.querySelector('#grid-ihoover');

let amount = "";

function arrow(){
	switch (posN) {
				case 'N':
					return '<img src=\'images/north.png\'>';
				break;
				case 'S':
					return '<img src=\'images/south.png\'>';
				break;
				case 'W':
					return '<img src=\'images/west.png\'>';
				break;
				case 'E':
					return '<img src=\'images/east.png\'>';
				break;
			}
}
function getInputs() {
	y = parseInt(document.getElementById('y-length').value);
	x = parseInt(document.getElementById('x-height').value);
	posX = parseInt(document.getElementById('starting-position-x').value);
	posY = parseInt(document.getElementById('starting-position-y').value);
	posN = (document.getElementById('starting-position-n').value);
	grid = document.querySelector("#grid-ihoover");
	instructions = document.getElementById('instructions').value;
}

function disableButton(btn){
	document.getElementById('submit-btn').disabled = true;
}

function startingPoint() {
	let posXToS = posX.toString();
	let posYToS = posY.toString();
	if (posY == 1 && posX == 1){ 
		start = document.getElementById("grid-ihoover").childNodes[1];
	} else if (posX == 1) {
		start = document.getElementById("grid-ihoover").childNodes[posY];
	} else if (posY == 1) {
		start = document.getElementById("grid-ihoover").childNodes[posX];
	} else if (posY * posX == x * y){
		start = document.getElementById("grid-ihoover").childNodes[x*y];
	} else if(posXToS.length > 1){
		let num = posY * posX;
		start = document.getElementById("grid-ihoover").childNodes[num]		
	} else {
		start = document.getElementById("grid-ihoover").childNodes[`${posY-1}${posX}`]
	}
}

function finishPoint() {
	let posXToS = posX.toString();
	let posYToS = posY.toString();
	if (posY == 1 && posX == 1){ 
		finish = document.getElementById("grid-ihoover").childNodes[1];
	} else if (posX == 1) {
		finish = document.getElementById("grid-ihoover").childNodes[posY];
	} else if (posY == 1) {
		finish = document.getElementById("grid-ihoover").childNodes[posX];
	} else if (posY * posX == x * y){
		finish = document.getElementById("grid-ihoover").childNodes[x*y];
	} else if(posXToS.length > 1){
		let num = posY * posX;
		finish = document.getElementById("grid-ihoover").childNodes[num]		
	} else {
		finish = document.getElementById("grid-ihoover").childNodes[`${posY-1}${posX}`]
	}
}

function displayGridX(){
	for (let i = 0; i < x; i++) {
		grid.insertAdjacentHTML("beforeend", `<div class='case'></div>`);
	}
}

function displayGridY(){
	for (let i = 0; i < y; i++) {
		displayGridX();
		amount += "1fr ";
	}
}

function iHoover(x,y) {
	// Transforme les instructions en Array
	const instructionsArr = instructions.split('');

	// Itérer entre chaque instructions
	instructionsArr.forEach((instruction)=>{
		// Premier cas: D
		if (instruction == 'D') {
			switch (posN) {
				case 'N':
					posN = 'E';
				break;
				case 'S':
					posN = 'W';
				break;
				case 'W':
					posN = 'N';
				break;
				case 'E':
					posN = 'S';
				break;
			}
		} 
		// Deuxième cas: G

		else if (instruction == 'G'){
			switch (posN) {
				case 'N':
					posN = 'W';
				break;
				case 'S':
					posN = 'E';
				break;
				case 'W':
					posN = 'S';
				break;
				case 'E':
					posN = 'N';
				break;
			}
		} 
		// Troisième cas: A
		else if (instruction == 'A') {
			if ((posN == 'N' || posN == 'S') && (posY > 0 && posY < y)) {
				posN == 'N' ? posY++ : posY-- ;
			}
			else if ((posN == 'W' || posN == 'E') && (posX > 0 && posX < x)) {
				posN == 'E' ? posX++ : posX-- ;
			}
		}
	})
};
