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

    console.log(this.calculateBands(2600));
  }

  calculateBands(value) {
    const bands = new Array();

    let i;
    for (i = 0; i < 2; i++) bands[i] = colorCode[value.nthDigit(i)];

    while (value.nthDigit(i) != null) i++;

    const power = i - 2;
    bands[2] = colorCode[power];

    return bands;
  }
}

Number.prototype.nthDigit = function (nthPlace) {
  const numbString = this.toString();

  if (numbString.length <= nthPlace) return null;
  return +numbString[nthPlace];
};
