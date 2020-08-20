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

const toleranceCode = {
  Black: 0,
  Brown: 1,
  Red: 2,
  Green: 0.5,
  Blue: 0.25,
  Violet: 0.1,
  Grey: 0.05,
  Gold: 5,
  Silver: 10,
};

function getToleranceColor(value) {
  for (let cur in toleranceCode) {
    if (value == toleranceCode[cur]) return cur;
  }
}

function getToleranceValue(color) {
  for (let cur in toleranceCode) {
    if (color == cur) return toleranceCode[cur];
  }
}

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

    bands[3] = getToleranceColor(this.tolerance);

    return bands;
  }
}

Number.prototype.nthDigit = function (nthPlace) {
  const numbString = this.toString();

  if (numbString.length <= nthPlace) return null;
  return +numbString[nthPlace];
};
