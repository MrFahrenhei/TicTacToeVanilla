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
        menu: document.querySelector("[data-id=menu]"),
        menuItems: document.querySelector("[data-id=menu-items]"),
        resetBtn: document.querySelector("[data-id=reset-btn]"),
        newRoundBtn: document.querySelector("[data-id=new-round-btn]"),
    },
    // anonymous function
    // init: () => {}
    init() {
        App.$.menu.addEventListener('click', (event)=>{
            App.$.menuItems.classList.toggle('hidden');
        });

        App.$.resetBtn.addEventListener('click', event => {
            console.log("Reset the game");
        });
        
        App.$.newRoundBtn.addEventListener('click', event => {
            console.log("Add a new round");
        });
    },
}

window.addEventListener('load', App.init);
