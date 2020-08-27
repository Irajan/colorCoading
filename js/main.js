import Resistor from "./resistor.js";

const r1 = new Resistor(["Red", "Orange", "Blue", "Green", "Grey"]);
const r2 = new Resistor(98000000, 10);
const r3 = new Resistor(6700, 10);
const canvas = document.querySelector("canvas");

r1.draw(canvas, 10, 20);
r2.draw(canvas, 10, 50, "#485");
r3.draw(canvas, 10, 80);
