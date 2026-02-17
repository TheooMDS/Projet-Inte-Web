const btn = document.getElementById('theme-toggle');

btn?.addEventListener('click', () => {
  const html = document.documentElement;
  const icone = document.querySelector('#theme-toggle i');

  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    if (icone) icone.className = 'fas fa-sun';
  } else {
    html.setAttribute('data-theme', 'dark');
    if (icone) icone.className = 'fas fa-moon';
  }
});