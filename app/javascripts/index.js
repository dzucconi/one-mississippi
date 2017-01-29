import axios from 'axios';
import parameters from 'queryparams';

window.parameters = parameters;

const DOM = window.DOM = {
  app: document.getElementById('app'),
  previous: document.getElementById('previous'),
  current: document.getElementById('current'),
};

const fetch = (per = 60) =>
  axios.get(`https://www.corrasable.com/words/suggestions?syllables=4&per=${per}`)
    .then(({ data: words }) => words);

const wait = (time = 1000) =>
  new Promise(resolve => setTimeout(resolve, time));

const inc = n =>
  n + 1;

const init = n =>
  fetch().then(words => step(n, words));

const step = (x, words) =>
  wait(1000).then(() => {
    if (words.length === 0) return init(x);

    const y = inc(x);
    const current = words.shift();

    DOM.previous.innerHTML = DOM.current.innerHTML;
    DOM.current.innerHTML = `${y} ${current}`;

    return step(y, words);
  });

export default () => init(1);
