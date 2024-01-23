import StoreItem from "./store__item.js";

/**
 * Class representing a store.
 */
export default class Store {
  /**
   * Creates an instance of Store.
   * @param {string} id - The id of the store.
   * @param {Game} game - The game instance.
   */
  constructor(id, game) {
    /* Properties */
    this.store = document.getElementById(id);
    this.game = game;
    this.items = [];
  }

  /**
   * Displays the store on the screen.
   */
  render() {
    this.store.innerHTML = "";
    this.items.forEach(item => this.store.appendChild(item.render()));
  }

  /**
   * Adds an item to the store.
   * @param {Object} item - The item to add.
   * @param {string} item.name - The name of the item.
   * @param {string} [item.text=""] - The text of the item.
   * @param {number} [item.price=5] - The price of the item.
   * @param {number} [item.cpsAdder=0] - The number of clicks per second added by the item.
   * @param {number} [item.maxQuantity=null] - The max quantity of the item.
   * @param {number} [item.cpsAdderMultiplier=2] - The multiplier of the cps adder.
   * @param {number} [item.clicksAdder=0] - The multiplier of the clicks.
   */
  addItem(item) {
    const storeItem = new StoreItem(item, this.game);
    this.items.push(storeItem);
    this.store.appendChild(storeItem.render());
  }
}
