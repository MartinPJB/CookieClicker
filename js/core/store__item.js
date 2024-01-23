export default class StoreItem {
  /**
   * Represents an item in the store.
   * @param {Object} item - The item properties.
   * @param {string} item.name - The name of the item.
   * @param {string} [item.text=""] - The text of the item.
   * @param {number} [item.price=5] - The price of the item.
   * @param {number} [item.cpsAdder=0] - The number of clicks per second added by the item.
   * @param {number} [item.maxQuantity=null] - The max quantity of the item.
   * @param {number} [item.cpsAdderMultiplier=2] - The multiplier of the cps adder.
   * @param {number} [item.clicksAdder=0] - The multiplier of the clicks.
   * @param {Game} game - The game instance.
   */
  constructor({ name = "No name 😔", text = "", price = 5, cpsAdder = 0, maxQuantity = null, cpsAdderMultiplier = 2, clicksAdder = 0 }, game) {
    /* Properties */
    this.name = name;
    this.text = text;
    this.price = price;
    this.cpsAdder = cpsAdder;
    this.maxQuantity = maxQuantity;
    this.cpsAdderMultiplier = cpsAdderMultiplier;
    this.clicksAdder = clicksAdder;
    this.game = game;

    this.quantity = 0;
    this.button = null;
    this.details = null;
  }

  /**
   * Parses the text of the item to replace {{variable}} by the value of the variable.
   * @param {string} text - The text to parse.
   * @returns {string} - The parsed text.
   */
  parse(text) {
    return text.replace(/{{(.*?)}}/g, (_, g) => this[g]);
  }

  /**
   * Displays the item on the screen.
   * @returns {HTMLElement} - The HTML element representing the item.
   */
  render() {
    // Initiates the buy button
    this.button = document.createElement("button");
    this.button.textContent = `${this.name} - ${this.price} (${this.parse(this.text)})`;
    this.button.classList.add("item__buy");

    // Initiates the details
    this.details = document.createElement("span");
    this.details.innerHTML = `<b>Quantity:</b> ${this.quantity}`;
    this.details.classList.add("item__details");

    // Initiates the li
    const li = document.createElement("li");
    li.classList.add("item");
    li.appendChild(this.details);
    li.appendChild(this.button);

    // Binds the buy button
    this.button.addEventListener("click", this.buy.bind(this));

    return li;
  }

  /**
   * Refreshes the item on the screen.
   */
  update() {
    this.button.textContent = `${this.name} - ${this.price} (${this.parse(this.text)})`;
    this.details.innerHTML = `<b>Quantity:</b> ${this.quantity}`;
  }

  /**
   * Max quantity reached.
   */
  max() {
    this.button.textContent = "Max quantity reached";
    this.button.disabled = true;
  }

  /**
   * Buy the item.
   */
  buy() {
    const canAfford = this.game.clicks >= this.price;
    const belowMaxQuantity = !this.maxQuantity || this.quantity < this.maxQuantity;

    if (canAfford && belowMaxQuantity) {
      this.game.clicks -= this.price;
      this.game.clicksPerSecondAdder += this.cpsAdder;
      this.game.clicksAdder += this.clicksAdder;

      this.quantity++;
      this.cpsAdder *= this.cpsAdderMultiplier;

      if (this.clicksAdder > 0) this.clicksAdder++;

      this.price *= this.quantity + 1;
      this.update();

      this.game.renderSpan();

      if (this.maxQuantity && this.quantity >= this.maxQuantity) {
        this.max();
      }
    }
  }
}
