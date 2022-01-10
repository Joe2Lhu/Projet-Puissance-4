import ReactDOM from 'react-dom';

class Puissance4 {
  
  constructor(element_id, rows=6, cols=7) {
    
    this.rows = rows;
    this.cols = cols;
  	
    this.board = Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = Array(this.cols).fill(0);
    }
    
    this.turn = 1;
    this.moves = 0;
    this.winner = null;

   
    this.element = document.querySelector(element_id);
    this.element.addEventListener('click', (event) => this.handle_click(event));
    this.render();
  }
  

  render() {
    let table = document.createElement('table');

    for (let i = this.rows - 1; i >= 0; i--) {
      let tr = table.appendChild(document.createElement('tr'));
      for (let j = 0; j < this.cols; j++) {
        let td = tr.appendChild(document.createElement('td'));
        let colour = this.board[i][j];
        if (colour)
          td.className = 'player' + colour;
        td.dataset.column = j;
      }
    }
    this.element.innerHTML = '';
    this.element.appendChild(table);
  }
  
	set(row, column, player) {
    // On colore la case
	  this.board[row][column] = player;
    this.moves++;
	}

	play(column) {
    // Trouver la première case libre dans la colonne
    let row;
    for (let i = 0; i < this.rows; i++) {
      if (this.board[i][column] === 0) {
        row = i;
        break;
      }
    }
    if (row === undefined) {
      return null;
    } else {
      // Effectue le coup
      this.set(row, column, this.turn);
      // Renvoie la ligne où on a joué
      return row;
    }
	}

  winner1(){
    ReactDOM.render(
      <div class="gagnant1">
         <h2>Player 1 a gagné</h2>
      </div>,
    document.getElementById('gagnant')
    )

    ReactDOM.render(
      <div id="#joueur"></div>,
    document.getElementById('joueur')
    )
  };

  winner2(){
    ReactDOM.render(
      <div class="gagnant2">
         <h2>Player 2 a gagné</h2>
      </div>,
    document.getElementById('gagnant')
    )

    ReactDOM.render(
      <div id="#joueur"></div>,
    document.getElementById('joueur')
    )
  };
  
  handle_click(event) {
    // Vérifier si la partie est encore en cours
    if (this.winner !== null) {
  		if (window.confirm("Game over!\n\nDo you want to restart?")) {
  			this.reset();
        this.render();
			}
			return;
    }

	  let column = event.target.dataset.column;
  	if (column !== undefined) {

      column = parseInt(column);
     	let row = this.play(parseInt(column));
      
      if (row === null) {
        window.alert("Y'a plus de place bg !");
      } else {
        // Vérifie s'il y a un gagnant, ou si la partie est finie
        if (this.win(row, column, this.turn)) {
          this.winner = this.turn;
        } else if (this.moves >= this.rows * this.columns) {
          this.winner = 0;
        }
        this.turn = 3 - this.turn;
        
          ReactDOM.render(
            <div id="#joueur">
               C'est au player {this.turn} de jouer
            </div>,
          document.getElementById('joueur')
          )
        

        // Mettre à jour l'affichage
        this.render()

        
        

        switch (this.winner) {
          case 0: 
          return(
            ReactDOM.render(
              <div id="#gagnant">
                 Match null
              </div>,
            document.getElementById('gagnant')
            )
          )

          case 1:
            return this.winner1 ();

          case 2:
            return this.winner2 ();

          default:
            console.log('oke');
        }
      }
    }
  }

  
  /* 
   Renvoie true si la partie est gagnée par le joueur et false si la partie continue
 */
	win(row, column, player) {
		// Horizontal
    let count = 0;
    for (let j = 0; j < this.cols; j++) {
      count = (this.board[row][j] === player) ? count+1 : 0;
      if (count >= 4) return true;
    }
		// Vertical
    count = 0;
    for (let i = 0; i < this.rows; i++) {
      count = (this.board[i][column] === player) ? count+1 : 0;
	    if (count >= 4) return true;
    }
		// Diagonal
    count = 0;
    let shift = row - column;
    for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.cols + shift); i++) {
      count = (this.board[i][i - shift] === player) ? count+1 : 0;
    	if (count >= 4) return true;
    }
		// Anti-diagonal
    count = 0;
    shift = row + column;
    for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) {
      console.log(i,shift-i,shift)
      count = (this.board[i][shift - i] === player) ? count+1 : 0;
      if (count >= 4) return true;
    }
    
    return false;
	}

  //Vide le plateau et remet à zéro l'état
  reset() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j] = 0;
      }
    }
		this.move = 0;
    this.winner = null;

    ReactDOM.render(
      <div id="#joueur"></div>,
    document.getElementById('joueur'))

    ReactDOM.render(
      <div id="#gagnant"></div>,
    document.getElementById('gagnant'))
  }
}
// On initialise le plateau et on visualise dans le DOM
var p4 = new Puissance4('#game'); 


export default Puissance4;