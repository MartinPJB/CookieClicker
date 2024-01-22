import Store from "./store.js";

export default class Game {
  /**
   * @param {string} id The id of the button
   *
   * @property {HTMLElement} button The button
   * @property {number} clicks The number of clicks
   * @property {number} clicksMultiplier The multiplier of the clicks
   * @property {number} clicksPerSecondAdder The number of clicks per second added by the upgrades
   * @property {number} cps The number of clicks per second of the user
   * @property {number} lastClickTime The time of the last click
   * @property {Store} store The store associated with the game
   */
  constructor(id) {
    /* Properties */
    this.button = document.getElementById(id);
    this.clicks = 0;
    this.clicksMultiplier = 1;
    this.clicksPerSecondAdder = 0;
    this.cps = 0;
    this.lastClickTime = 0;
    this.store = null;

    /* Binds */
    this.button.addEventListener("click", this.clickHandler.bind(this));
    setInterval(this.interval.bind(this), 1000);
  }

  /* Methods */
  /**
   * Interval CPS adder
   */
  interval() {
    this.clicks += this.clicksPerSecondAdder;
    this.renderSpan();
  }

  /**
   * Displays the amount of clicks on the screen
   */
  renderSpan() {
    document.getElementById("clicks").textContent = this.clicks;
  }

  /**
   * Handles the click event
   */
  clickHandler() {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - this.lastClickTime;
    if (timeSinceLastClick > 0) {
      this.cps = 1000 / timeSinceLastClick;
    }

    this.clicks += 1 * this.clicksMultiplier;
    this.lastClickTime = currentTime;

    this.renderSpan();
    this.cheatDetector();
  }

  /**
   * Detects if the user is cheating and clicking in a humanly impossible way
   */
  cheatDetector() {
    const maxCPS = 22;
    if (this.cps > maxCPS) {
      this.clicks = 0;
      this.clicksPerSecondAdder = 0;
      this.cps = 0;
      this.lastClickTime = 0;

      this.button.removeEventListener("click", this.clickHandler);
      alert("You're cheating!");
    }
  }

  /**
   * Sets a store to the game
   */
  setStore(storeID) {
    this.store = new Store(storeID, this);
  }
}
