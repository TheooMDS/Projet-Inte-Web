const item1 = JSON.parse(localStorage.getItem('compare-item-1') || 'null');
const item2 = JSON.parse(localStorage.getItem('compare-item-2') || 'null');

const container = document.getElementById('compare-container');

if (!item1 || !item2) {
  if (container) {
    container.innerHTML = '<p style="color:#888; text-align:center; padding:3rem">Aucune comparaison en cours</p>';
  }
} else {
  afficherComparaison(item1, item2);
}

function afficherComparaison(a: any, b: any) {
  if (!container) return;

  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  container.innerHTML = `
    <div style="display:flex; gap:3rem; padding:3rem; justify-content:center;">
      
      <!-- Item 1 -->
      <div style="flex:1; max-width:400px;">
        <img src="${a.poster ? IMAGE_URL + a.poster : '/placeholder.jpg'}" 
             style="width:100%; border-radius:12px; margin-bottom:1rem;">
        <h3 style="color:#51e351; margin-bottom:0.5rem;">${a.title}</h3>
        <p style="color:#888; font-size:0.9rem; margin-bottom:1rem;">${a.type} · ${a.year}</p>
        <p style="margin-bottom:1rem;">${a.overview || 'Pas de synopsis'}</p>
        <p style="color:#ffb900;">⭐ ${a.rating}/10</p>
      </div>

      <!-- Item 2 -->
      <div style="flex:1; max-width:400px;">
        <img src="${b.poster ? IMAGE_URL + b.poster : '/placeholder.jpg'}" 
             style="width:100%; border-radius:12px; margin-bottom:1rem;">
        <h3 style="color:#51e351; margin-bottom:0.5rem;">${b.title}</h3>
        <p style="color:#888; font-size:0.9rem; margin-bottom:1rem;">${b.type} · ${b.year}</p>
        <p style="margin-bottom:1rem;">${b.overview || 'Pas de synopsis'}</p>
        <p style="color:#ffb900;">⭐ ${b.rating}/10</p>
      </div>

    </div>
  `;
}

document.getElementById('reset-compare')?.addEventListener('click', () => {
  localStorage.removeItem('compare-item-1');
  localStorage.removeItem('compare-item-2');
  window.location.href = '/';
});

document.getElementById('new-compare')?.addEventListener('click', () => {
  localStorage.removeItem('compare-item-1');
  localStorage.removeItem('compare-item-2');
  window.location.reload();
});