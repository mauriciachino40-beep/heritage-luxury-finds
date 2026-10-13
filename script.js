const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let quantity = 1;
const selectedSet = new Set();

const showToast = (message) => {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2300);
};

$('#plus').addEventListener('click', () => { quantity += 1; $('#quantity').textContent = quantity; });
$('#minus').addEventListener('click', () => { quantity = Math.max(1, quantity - 1); $('#quantity').textContent = quantity; });

$$('.pill[data-color]').forEach((button) => button.addEventListener('click', () => {
  $$('.pill[data-color]').forEach((item) => item.classList.remove('selected'));
  button.classList.add('selected');
  $('#colorName').textContent = button.dataset.color;
}));

const updateSet = () => {
  const count = selectedSet.size;
  const extras = $$('.add-set').filter((button) => selectedSet.has(button.dataset.name))
    .reduce((sum, button) => sum + Number(button.dataset.price), 0);
  const message = count < 2 ? `Add ${2 - count} ${count === 1 ? 'item' : 'items'} to unlock 10% off.`
    : count === 2 ? '10% discount unlocked — add 1 more item to enjoy 15% off.'
    : '15% discount unlocked — add 2 more items to enjoy 25% off.';
  $('#setMessage').textContent = message;
  $('#setCount').textContent = `${count} ${count === 1 ? 'item' : 'items'} selected`;
  $('#setPrice').textContent = `$${(87 + extras).toFixed(2)} USD`;
};

$$('.add-set').forEach((button) => button.addEventListener('click', () => {
  const { name } = button.dataset;
  if (selectedSet.has(name)) {
    selectedSet.delete(name);
    button.classList.remove('added');
    button.textContent = 'ADD';
  } else {
    selectedSet.add(name);
    button.classList.add('added');
    button.textContent = 'ADDED';
  }
  updateSet();
}));

const addToCart = (count, message) => {
  showToast(message || `${count} item${count === 1 ? '' : 's'} added to cart`);
};

$('#cartCta').addEventListener('click', () => addToCart(quantity));
$('#stickyAdd').addEventListener('click', () => addToCart(quantity));
$('#allCart').addEventListener('click', () => {
  $$('.add-set').forEach((button) => { selectedSet.add(button.dataset.name); button.classList.add('added'); button.textContent = 'ADDED'; });
  updateSet();
  addToCart(quantity + selectedSet.size, 'Your selected set was added to cart');
});

window.addEventListener('scroll', () => $('#stickyProduct').classList.toggle('show', window.scrollY > 210));
updateSet();
