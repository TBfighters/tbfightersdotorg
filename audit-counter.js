const start = new Date("2023-09-19");
const end = Date.now();

let diff = end - start;

diff /= 1000;

diff /= 86400;

let days = Math.floor(diff - 1)

let ones = Math.floor(days % 10);
days /= 10;

let tens = Math.floor(days % 10);
days /= 10;

let hundreds = Math.floor(days % 10);

document.getElementById("hundreds").textContent = hundreds;
document.getElementById("tens").textContent = tens;
document.getElementById("ones").textContent = ones;
