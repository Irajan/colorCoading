const colorCode = [
  "Black",
  "Brown",
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Violet",
  "Grey",
  "White",
];

export default class Resistor {
  constructor(value) {
    this.value = value || 0;
    this.bands = ["Grey", "Orange", "Red"];
    this.calculateValue();
  }

  calculateValue() {
    const base =
      colorCode.indexOf(this.bands[0]) * 10 + colorCode.indexOf(this.bands[1]);

    const multiplier = 10 ** colorCode.indexOf(this.bands[2]);

    console.log(base * multiplier);
  }
}
