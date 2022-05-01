import { WORDS } from "./words";

const DOM = {
  root: document.getElementById("root"),
};

const STATE = {
  previous: "1 Mississippi",
  n: 1,
};

const wait = (time = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const step = () => {
  wait(1000).then(() => {
    STATE.n = STATE.n + 1;

    const n = WORDS[Math.floor(Math.random() * WORDS.length)];
    const current = `${STATE.n} ${n}`;

    DOM.root.innerHTML = `
      <div class="previous">${STATE.previous}</div>
      <div class="current">${current}</div>
    `;

    STATE.previous = current;

    return step();
  });
};

DOM.root.innerHTML = `
  <div class="previous"></div>
  <div class="current">1 Mississippi</div>
`;

step();
