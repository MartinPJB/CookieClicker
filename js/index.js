import Game from "./core/game.js";
import items from "./core/items.js";

(async () => {
  const game = new Game("clicker");
  game.setStore("store");

  const store = game.store;
  for (const item of items) {
    store.addItem(item);
  }
})();