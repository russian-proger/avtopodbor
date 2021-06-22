/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const objects = new Array(30);

class Circle {
  velocity_y = -Math.random() * 20 - 20;
  velocity_x = 0;
  constructor(pos_x, pos_y, radius, color) {
    this.x = pos_x;
    this.y = pos_y;
    this.radius = radius;
    this.color = color;
  }

  render() {
    const border = canvas.height - this.radius;
    this.velocity_y += 1.5;
    this.x += this.velocity_x;
    this.y = this.y + this.velocity_y;
    if (this.y > border) {
      this.y = 2 * border - this.y;
      this.velocity_x = Math.random() * 30 - 15;
      this.velocity_y = -this.velocity_y * 0.7;
      if (Math.abs(this.velocity_y) < 4) {
        this.velocity_y = 0;
        this.velocity_x = 0;
        this.y = border;
      }
    }

    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.quadraticCurveTo
  }
}

for (let i = 0; i < objects.length; ++i) {
  let color = "#";
  for (let j = 0; j < 3; ++j) {
    let c = parseInt(Math.random() * 255).toString(16);
    if (c.length == 1) color += '0';
    color += c;
  }
  objects[i] = new Circle(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 50 + 10, color);
}

function renderAll() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  objects.forEach(v => v.render());
  requestAnimationFrame(renderAll);
}

renderAll();
