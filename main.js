const line = document.querySelector(".line");
const circles = document.querySelectorAll(".circle");
const add = document.querySelector(".add");
const c1 = document.querySelector(".c-1");
const c2 = document.querySelector(".c-2");
let arr = [];

const addFun = (e) => {
  if (arr.includes(e.target)) return;

  console.log(arr);
  arr.push(e.target);
  arr.forEach((circle) => circle.classList.add("selected"));

  if (arr.length === 2) {
    vertix(arr[0], arr[1]);
    arr = [];
  }
};

const vertix = (c1, c2) => {
  const id = Math.floor(Math.random() * 100);
  c1.classList.remove("selected");
  c2.classList.remove("selected");
  const oldId = c1.classList.value.match(/edge-[0-9]+/g);
  if (
    c1.classList.contains(`${oldId && oldId[0]}`) &&
    c2.classList.contains(`${oldId && oldId[0]}`)
  ) {
    return;
  }
  const line = document.createElement("div");
  line.classList.add(`line`);
  line.classList.add(`c-${id}`);
  document.body.append(line);

  c1.classList.add(`edge-${id}`);
  c2.classList.add(`edge-${id}`);

  move(c1, c2, id);
  c1.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", () => move(c1, c2, id));
  });

  c2.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", () => move(c1, c2, id));
  });
};

const move = (c1, c2, id) => {
  const line = document.querySelector(`.c-${id}`);
  const c1Left = c1.offsetLeft + c1.clientWidth / 2;
  const c1Top = c1.offsetTop + c1.clientHeight / 2;
  const c2Left = c2.offsetLeft + c2.clientWidth / 2;
  const c2Top = c2.offsetTop + c2.clientHeight / 2;
  const height = c2Top - c1Top;
  const width = c2Left - c1Left;
  const tan = height / width;
  const deg = Math.atan(tan) * (180 / Math.PI);
  const useDeg = c1Left > c2Left ? deg + 180 : deg;
  const lineWidth = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  line.style.rotate = `${useDeg}deg`;
  line.style.left = `${c1Left}px`;
  line.style.width = `${lineWidth}px`;
  line.style.top = `${c1Top}px`;
};

circles.forEach((circle) => {
  const onDrag = ({ x, y }) => {
    circle.addEventListener("dblclick", addFun);
    circle.style.left = `${x - circle.clientWidth / 2}px`;
    circle.style.top = `${y - circle.clientHeight / 2}px`;
  };

  circle.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", onDrag);
  });

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", onDrag);
  });
});
