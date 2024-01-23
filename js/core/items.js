/**
 * Note: all numbers must be integers, not floats.
 * Available properties:
 * - name: name of the item
 * - text: text displayed in the button
 * - price: price of the item
 * - maxQuantity: max quantity of the item (default: Infinity)
 * - cpsAdder: CPS added by the item (default: 0)
 * - cpsAdderMultiplier: multiplier of the CPS added by the item (default: 2)
 * - clicksAdder: clicks added by the item (default: 0)
 */
export default [
  {
    name: "Server",
    text: "+ {{clicksAdder}} to each click",
    price: 10,
    clicksAdder: 1,
  },
  {
    name: "Developer",
    text: "+ {{cpsAdder}}/s",
    price: 100,
    cpsAdder: 1,
  }
];