import View from './view.js';
import Store from "./store.js";

const players = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x",
        colorClass: "green",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-o",
        colorClass: "yellow",
    }
];

function init(){
    const view = new View();
    const store = new Store('tictactoe-key', players);
    function initView(){
        view.closeAll();
        view.clearMoves();
        view.setTurnIndicator(store.game.currentPlayer);
        let player1wins = store.stats.playerWithStats[0].wins;
        let player2wins = store.stats.playerWithStats[1].wins;
        let ties = store.stats.ties;
        view.updateScoreboard(player1wins, player2wins, ties);
        view.initializeMoves(store.game.moves);
    }
    window.addEventListener('storage', (e) => {
      console.log("State changed from another tab");
      initView();
    });
    initView();

    view.bindGameResetEvent(event => {
       store.reset();
        initView();
    });

    view.bindNewRoundEvent(event => {
        store.newRound();
        initView();
    });
    view.bindPlayerMoveEvent((square) => {
        const existingMove = store.game.moves.find(
            (move)=> move.squareId === +square.id
        );
        if(existingMove){
            return;
        }
        view.handlePlayerMove(square, store.game.currentPlayer);
        store.playerMove(+square.id);
        if(store.game.status.isComplete){
            view.openModal(store.game.status.winner ? `${store.game.status.winner.name} wins!`:"Tie!");
            return;
        }
        view.setTurnIndicator(store.game.currentPlayer);
    })
}
window.addEventListener('load', init);
