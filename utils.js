const c = (el) => document.createElement(el);

const q = (el) => document.querySelector(el);

const createFriendEl = (parent, name, photo) => {
  const wrapper = c('div');
  const img = c('img');
  const par = c('p');

  wrapper.className = 'friendCard';
  img.setAttribute('alt', name);
  img.setAttribute('src', photo);
  par.textContent = name;

  wrapper.append(img, par);
  parent.appendChild(wrapper);
}

const createMessageEl = (parent, id, text, sender, date, callback = () => {}) => {
  const wrapper = c('div');
  const textPar = c('p');
  const senderPar = c('p');
  const dataPar = c('p');
  const btnEl = c('button');

  wrapper.className = 'messageCard';
  wrapper.setAttribute('id', id);
  btnEl.className = 'btnRemove';
  btnEl.textContent = "X"
  textPar.textContent = text;
  senderPar.textContent = sender;
  dataPar.textContent = date;

  btnEl.addEventListener('click', callback)

  wrapper.append(textPar, senderPar, dataPar,btnEl);
  parent.appendChild(wrapper);
}

export { c, q, createFriendEl, createMessageEl};