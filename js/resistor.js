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

const toleranceCode = colorCode.map((color, index) => {
  return "" + index + color;
});

export default class Resistor {
  constructor(value, tolerance = 0) {
    if (value instanceof Array) {
      this.bands = value;
      this.value = this.calculateValue();
    } else {
      this.value = value;
      this.bands = this.calculateBands();
    }
    this.tolerance = tolerance;

    console.log(toleranceCode);
  }

  calculateValue() {
    const base =
      colorCode.indexOf(this.bands[0]) * 10 + colorCode.indexOf(this.bands[1]);

    const multiplier = 10 ** colorCode.indexOf(this.bands[2]);

    return base * multiplier;
  }

  calculateBands() {
    const bands = new Array();

    let i;
    for (i = 0; i < 2; i++) bands[i] = colorCode[this.value.nthDigit(i)];

    this.value.nthDigit(0);

    while (this.value.nthDigit(i) != null) i++;
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
