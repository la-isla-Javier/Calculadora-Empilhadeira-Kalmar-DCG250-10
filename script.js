
let currentImplement = 'GARFO';

// Tabelas de dados
const garfoTable = {
  0: 25000, 1: 25000, 450: 25000, 500: 25000, 750: 25000, 1000: 25000,
  1200: 25000, 1350: 22500, 1500: 20000, 1650: 18325, 1800: 16650,
  1801: 16639, 1802: 16628, 1803: 16617, 1804: 16606, 1805: 16595,
  1806: 16584, 1850: 16091, 1900: 15533, 1950: 14975, 2000: 14416,
  2050: 13857, 2100: 13299, 2150: 12750, 2200: 12182, 2250: 11623,
  2300: 11065, 2350: 10507, 2400: 9948, 2450: 9390, 2500: 8831
};

// Para ARIETE, apenas ponto conhecido: 900 mm -> 25000 kg
// Mantemos sem interpolação até que novos pontos sejam adicionados.
const arieteTable = { 900: 25000 };

// Elementos
const garfoBtn = document.getElementById('garfo-btn');
const arieteBtn = document.getElementById('ariete-btn');
const activeImplementEl = document.getElementById('activeImplement');
const centerInput = document.getElementById('centerLoad');
const capacityEl = document.getElementById('loadCapacity');
const statusEl = document.getElementById('safetyStatus');
const maxHeightEl = document.getElementById('maxHeight');

garfoBtn.addEventListener('click', () => selectImplement('GARFO'));
arieteBtn.addEventListener('click', () => selectImplement('ARIETE'));
centerInput.addEventListener('input', calculateCapacity);

function selectImplement(implement) {
  currentImplement = implement;
  garfoBtn.classList.toggle('active', implement === 'GARFO');
  arieteBtn.classList.toggle('active', implement === 'ARIETE');
  garfoBtn.setAttribute('aria-pressed', implement === 'GARFO');
  arieteBtn.setAttribute('aria-pressed', implement === 'ARIETE');
  activeImplementEl.textContent = implement;
  maxHeightEl.textContent = implement === 'GARFO' ? '6500 mm' : '7150 mm';
  calculateCapacity();
}

function calculateCapacity() {
  const centerLoad = parseInt(centerInput.value, 10);
  if (Number.isNaN(centerLoad) || centerLoad < 0) {
    capacityEl.textContent = '-- kg';
    statusEl.textContent = 'Digite o centro de carga';
    statusEl.className = 'result-value';
    return;
  }

  const table = currentImplement === 'GARFO' ? garfoTable : arieteTable;
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);

  let capacity = 0;

  if (table[centerLoad] !== undefined) {
    capacity = table[centerLoad];
  } else {
    if (currentImplement === 'GARFO') {
      // Interpolação linear apenas para GARFO
      let found = false;
      for (let i = 0; i < keys.length - 1; i++) {
        if (centerLoad > keys[i] && centerLoad < keys[i + 1]) {
          const x1 = keys[i], y1 = table[keys[i]];
          const x2 = keys[i + 1], y2 = table[keys[i + 1]];
          capacity = Math.round(y1 + (y2 - y1) * (centerLoad - x1) / (x2 - x1));
          found = true;
          break;
        }
      }
      if (!found) {
        if (centerLoad < keys[0]) {
          capacity = table[keys[0]];
        } else if (centerLoad > keys[keys.length - 1]) {
          capacity = 0; // Fora dos dados
        }
      }
    } else {
      // ARIETE: sem interpolação. Se não for 900, é fora dos limites
      capacity = 0;
    }
  }

  // Exibir capacidade
  if (capacity > 0) {
    capacityEl.textContent = capacity.toLocaleString('pt-BR') + ' kg';
  } else {
    capacityEl.textContent = 'Fora dos limites';
  }

  // Regras de status
  if (capacity === 0) {
    statusEl.textContent = 'Centro de carga fora dos limites operacionais ❌';
    statusEl.className = 'result-value status-danger';
  } else if (centerLoad <= 1800) {
    statusEl.textContent = 'Carga Segura ✅';
    statusEl.className = 'result-value status-safe';
  } else {
    statusEl.textContent = 'Perigo de Tombamento ⚠️';
    statusEl.className = 'result-value status-danger';
  }
}

// Inicialização
selectImplement('GARFO');
