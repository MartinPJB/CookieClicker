import Store from "./store.js";

/**
 * Class representing the game.
 */
export default class Game {
  /**
   * Creates an instance of Game.
   * @param {string} id - The id of the button.
   */
  constructor(id) {
    /* Properties */
    this.button = document.getElementById(id);
    this.clicks = 0;
    this.clicksAdder = 0;
    this.lastClickTime = 0;
    this.store = null;

    this.clickIntervals = [];
    this.maxSameInterval = 8;
    this.intervalFunction = null;

    this.regularityCounter = 0;
    this.regularityThreshold = 10; // If the player is too regular and gets a regularityCounter > regularityThreshold, he's most likely cheating

    /* Binds */
    this.button.addEventListener("click", this.clickHandler.bind(this));
    this.intervalFunction = setInterval(this.interval.bind(this), 1000);
  }

  /**
   * Interval handler.
   */
  interval() {
    this.renderSpan();
  }

  /**
   * Displays the amount of clicks on the screen.
   */
  renderSpan() {
    document.getElementById("clicks").textContent = this.clicks;
  }

  /**
   * Handles the click event.
   * @param {Event} e - The click event.
   */
  clickHandler(e) {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - this.lastClickTime;

    this.clickIntervals.push(timeSinceLastClick);

    if (this.clickIntervals.length > this.maxSameInterval) {
      this.clickIntervals.shift();
    }

    this.clicks += 1 + this.clicksAdder;
    this.lastClickTime = currentTime;

    this.renderSpan();
    this.cheatDetector(e);
  }

  /**
   * Detects if the user is cheating and clicking in a humanly impossible way.
   * @param {Event} e - The click event.
   */
  cheatDetector(e) {
    const irregularityTolerance = 10; // ms

    if (this.checkRegularIntervals(irregularityTolerance)) {
      this.regularityCounter++;
    }

    if (!e.isTrusted) return this.cheating(); // Instant ban
    if (this.regularityCounter > this.regularityThreshold) {
      console.warn("You're clicking too regularly, you're most likely cheating.");
      this.cheating();
    }
  }

  /**
   * A cheating behavior is detected, the game is stopped.
   */
  cheating() {
    clearInterval(this.intervalFunction);
    this.button.remove();
    this.resetGameProperties();
    document.body.innerHTML = "You're cheating, shame on you!";
  }

  /**
   * Sets a store to the game.
   * @param {string} storeID - The id of the store.
   */
  setStore(storeID) {
    this.store = new Store(storeID, this);
  }

  /**
   * Verifies if clicks are legit by checking their regularity.
   * @param {number} tolerance - The tolerance of irregularity.
   * @returns {boolean} - True if clicks are too regular, false otherwise.
   */
  checkRegularIntervals(tolerance) {
    const intervals = this.clickIntervals;
    const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;

    for (let i = 0; i < this.clickIntervals.length; i++) {
      const difference = Math.abs(this.clickIntervals[i] - averageInterval);
      if (difference > tolerance) {
        return false;
      }
    }

    return true;
  }

  /**
   * Resets game properties to their initial values.
   */
  resetGameProperties() {
    this.clicks = 0;
    this.clicksAdder = 0;
    this.lastClickTime = 0;
    this.store = null;
    this.clickIntervals = [];
    this.maxSameInterval = 8;
    this.intervalFunction = null;
  }
}
