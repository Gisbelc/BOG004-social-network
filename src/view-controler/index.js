import { components } from '../view/index.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '':
    { return container.appendChild(components.home()); }
    case '#/':
    { return container.appendChild(components.home()); }
    case '#/registerPage':
    { return container.appendChild(components.register()); }
    case '#/board':
    { return container.appendChild(components.board()); }
    default:
    { return container.appendChild(components.error()); }
  }
};