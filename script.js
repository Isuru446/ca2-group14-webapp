// Lab 04: Display today's date without reloading the page.
document.getElementById('dateBtn').addEventListener('click', function () {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-GB', options);
  document.getElementById('dateOutput').textContent = `Today is ${formattedDate}`;
});

// A second simple interactive feature: show or hide a cloud tip.
document.getElementById('tipBtn').addEventListener('click', function () {
  const tip = document.getElementById('tipOutput');
  const button = document.getElementById('tipBtn');
  const willShow = tip.hidden;
  tip.hidden = !willShow;
  button.textContent = willShow ? 'Hide Cloud Tip' : 'Show Cloud Tip';
  button.setAttribute('aria-expanded', String(willShow));
});

// Keep the footer year current.
document.getElementById('year').textContent = new Date().getFullYear();
