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

//Function to relate tolerence with band color
function getToleranceColor(value) {
  for (let cur in toleranceCode) {
    if (value == toleranceCode[cur]) return cur;
  }
}

//Function to relate band color with tolerence value
function getToleranceValue(color) {
  for (let cur in toleranceCode) {
    if (color == cur) return toleranceCode[cur];
  }
}

export default class Resistor {
  constructor(value, tolerance = 0) {
    if (value instanceof Array) {
      this.tolerance = getToleranceValue(value[3]);
      this.bands = value;
      this.value = this.calculateValue();
    } else {
      this.tolerance = tolerance;
      this.value = value;
      this.bands = this.calculateBands();
    }
  }

  calculateValue() {
    //Getting first two significant figures
    const base =
      colorCode.indexOf(this.bands[0]) * 10 + colorCode.indexOf(this.bands[1]);

    //Getting the multiplier from third band color
    const multiplier = 10 ** colorCode.indexOf(this.bands[2]);

    //Return the value of resistance in ohm
    return base * multiplier;
  }

  calculateBands() {
    const bands = new Array();

    //Getting two significant figures and relating them with color
    let i;
    for (i = 0; i < 2; i++) bands[i] = colorCode[this.value.nthDigit(i)];

    //Getting multiplier and relating it's power with band color
    while (this.value.nthDigit(i) != null) i++;
    const power = i - 2;
    bands[2] = colorCode[power];

    //Mapping tolerence value with band color
    bands[3] = getToleranceColor(this.tolerance);

    return bands;
  }

  draw(canvas, startX, startY, baseColor = "#fff") {
    canvas.style.backgroundColor = "#000";
    const cc = canvas.getContext("2d");
    const x = startX || canvas.width / 5;
    const y = startY || canvas.height / 2;

    function drawRectangle(x, y, w, h, fillStyle = baseColor) {
      cc.beginPath();
      cc.fillStyle = fillStyle;
      cc.rect(x, y, w, h);
      cc.closePath();
      cc.fill();
    }

    //First terminal point
    drawRectangle(x, y, 20, 1);

    //Terminal supporter notch
    drawRectangle(x + 20, y - 5, 5, 10);

    //Bands and their padding
    let i,
      j = 0;
    for (i = 0; i < this.bands.length; i++) {
      drawRectangle(x + 25 + j, y - 10, 10, 20);
      drawRectangle(x + 35 + j, y - 10, 5, 20, this.bands[i]);
      j += 15;
    }

    //Last band padding
    drawRectangle(x + 25 + j, y - 10, 10, 20);

    //Terminal supporter notch
    drawRectangle(x + 35 + j, y - 5, 5, 10);

    //Last terminal point
    drawRectangle(x + 40 + j, y, 20, 1);
  }
}

Number.prototype.nthDigit = function (nthPlace) {
  const numbString = this.toString();

  if (numbString.length <= nthPlace) return null;
  return +numbString[nthPlace];
};
