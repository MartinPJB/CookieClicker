export default class StoreItem {
  /**
   * @param {Object} item The item
   * @param {Game} game The game
   *
   * @property {string} name The name of the item
   * @property {string} text The text of the item
   * @property {number} price The price of the item
   * @property {number} cpsAdder The number of clicks per second added by the item
   * @property {number} quantity The quantity of the item
   * @property {number} maxQuantity The max quantity of the item
   * @property {number} cpsAdderMultiplier The multiplier of the cps adder
   * @property {number} clickMultiplier The multiplier of the clicks
   * @property {Game} game The game
   * @property {HTMLElement} button The button of the item
   * @property {HTMLElement} details The details of the item
   */
  constructor({ name, text, price, cpsAdder, quantity = 0, maxQuantity = null, cpsAdderMultiplier = 1, clickMultiplier = 1 }, game) {
    /* Properties */
    this.name = name;
    this.text = text;
    this.price = price;
    this.cpsAdder = cpsAdder;
    this.quantity = quantity;
    this.maxQuantity = maxQuantity;
    this.cpsAdderMultiplier = cpsAdderMultiplier;
    this.clickMultiplier = clickMultiplier;
    this.game = game;

    this.button = null;
    this.details = null;
  }

  /* Methods */
  /**
   * Parses the text of the item to replace {{variable}} by the value of the variable
   */
  parse(text) {
    return text.replace(/{{(.*?)}}/g, (_, g) => this[g]);
  }

  /**
   * Displays the item on the screen
   */
  render() {
    // Initiates the buy button
    this.button = document.createElement("button");
    this.button.textContent = `${this.name} - ${this.price}€ (${this.parse(this.text)})`;

    // Initiates the details
    this.details = document.createElement("span");
    this.details.innerHTML = `<b>Quantity:</b> ${this.quantity}`;

    // Initiates the li
    const li = document.createElement("li");
    li.appendChild(this.details);
    li.appendChild(this.button);

    // Binds the buy button
    this.button.addEventListener("click", this.buy.bind(this));

    return li;
  }

  /**
   * Refreshes the item on the screen
   */
  update() {
    this.button.textContent = `${this.name} - ${this.price}€ (${this.parse(this.text)})`;
    this.details.innerHTML = `<b>Quantity:</b> ${this.quantity}`;
  }

  /**
   * Max quantity reached
   */
  max() {
    this.button.textContent = "Max quantity reached";
    this.button.disabled = true;
  }

  /**
   * Buy the item
   */
  buy() {
    const canAfford = this.game.clicks >= this.price;
    const belowMaxQuantity = !this.maxQuantity || this.quantity < this.maxQuantity;

    if (canAfford && belowMaxQuantity) {
      this.game.clicks -= this.price;
      this.game.clicksPerSecondAdder += this.cpsAdder;
      this.game.clickMultiplier += this.clickMultiplier;

      this.quantity++;
      this.cpsAdder *= this.cpsAdderMultiplier;

      this.price *= this.quantity + 1;
      this.update();

      this.game.renderSpan();

      if (this.maxQuantity && this.quantity >= this.maxQuantity) {
        this.max();
      }
    }
  }
}
