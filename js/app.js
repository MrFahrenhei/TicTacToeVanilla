// player can make a game move
// new round
// reset current game
// toggle menu
// model-view-controler
//store (get state, save state, emit state change event)
// app (control flow of view, state logic, initialize application)
// view (add event listeners, handle ui-only, manipulate dom)

//best practices when developing user interfaces
// 1 global scope and namespaces
// 2 stable selectors (data-* attr)

// namespace kind of
const App = {
    // all of our selected html elements
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        squares: document.querySelectorAll('[data-id="square"]'),
    },

    state:{
        currentPlayer: 1,
        moves: []
    },
    getGameStatus(moves){
        const p1Moves = moves.filter(move => move.playerId==1).map(move => +move.squareId);
        const p2Moves = moves.filter(move => move.playerId==2).map(move => +move.squareId);
        // check if there is a winner or tie game
        const winningPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];
        let winner = null;
        winningPatterns.forEach(pattern => {
            const p1Wins = pattern.every(v => p1Moves.includes(v));
            const p2Wins = pattern.every(v => p2Moves.includes(v));

            if(p1Wins) winner = 1
            if(p2Wins) winner = 2
        })
        return{
            status: moves.length === 9|| winner != null ? 'complete' :  'in-progress',
            winner
        }
    },
    init() {
        App.registerEventListeners();
        
    },
    registerEventListeners(){
        App.$.menu.addEventListener('click', (event)=>{
            App.$.menuItems.classList.toggle('hidden');
        });

        App.$.resetBtn.addEventListener('click', event => {
            console.log("Reset the game");
        });
        
        App.$.newRoundBtn.addEventListener('click', event => {
            console.log("Add a new round");
        });

        App.$.squares.forEach((square)=> {
            square.addEventListener('click', event=>{
                const hasMove = (squareId)=>{
                    const existingMove = App.state.moves.find(move=>move.squareId === squareId);
                    return existingMove !== undefined;
                }

                if(hasMove(+square.id)){
                    return;
                }
               
                // Check if there is already a play
                // if(square.hasChildNodes()){return;}

                // determine which player icon to add to the square
                //const currentPlayer = App.state.currentPlayer;

                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = (playerId) => playerId === 1 ? 2 : 1
                const currentPlayer =
                      App.state.moves.length === 0
                      ? 1
                      : getOppositePlayer(lastMove.playerId);
                
                const icon = document.createElement("i");
                if(currentPlayer === 1){
                    icon.classList.add('fa-solid', 'fa-x', 'yellow');
                }else{
                    icon.classList.add('fa-solid', 'fa-o', 'green');
                }
                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                });
                App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

                square.replaceChildren(icon);

                const game = App.getGameStatus(App.state.moves);
                if(game.status === 'complete'){
                    if(game.winner){
                        alert(`Player ${game.winner} wins!`);
                    }else{
                        alert("Tie!");
                    }
                }
            });
        });
    }
    
}

window.addEventListener('load', App.init);
