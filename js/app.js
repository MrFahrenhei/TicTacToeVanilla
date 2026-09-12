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

    // current tab state changes
    store.addEventListener('statechange', (e) => {
        view.render(store.game, store.stats);
    });

    // a different tab in the same browser
    window.addEventListener('storage', (e) => {
        console.log("State changed from another tab");
        view.render(store.game, store.stats);
    });

    // first load
    view.render(store.game, store.stats);

    view.bindGameResetEvent(event => {
       store.reset();
    });

    view.bindNewRoundEvent(event => {
        store.newRound();
    });

    view.bindPlayerMoveEvent((square) => {
        const existingMove = store.game.moves.find(
            (move)=> move.squareId === +square.id
        );
        if(existingMove){
            return;
        }
        store.playerMove(+square.id);
    })
}
window.addEventListener('load', init);
