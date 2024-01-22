import StoreItem from "./store__item.js";

export default class Store {
  /**
   * @param {string} id The id of the store
   * @param {Game} game The game
   *
   * @property {HTMLElement} store The store
   * @property {Game} game The game
   * @property {StoreItem[]} items The items of the store
   */
  constructor(id, game) {
    /* Properties */
    this.store = document.getElementById(id);
    this.game = game;
    this.items = [];
  }

  /* Methods */
  /**
   * Displays the store on the screen
   */
  render() {
    this.store.innerHTML = "";
    this.items.forEach(item => this.store.appendChild(item.render()));
  }

  /**
   * Adds an item to the store
   *
   * @param {Object} item The item to add
   */
  addItem(item) {
    this.items.push(new StoreItem(item, this.game));
    this.render();
  }
}
