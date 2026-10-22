// ===== Configuração =====
// Coloque aqui o e-mail que deve ser copiado pelos botões "Copiar E-Mail".
const EMAIL = 'mateus.gon.melo@gmail.com';
 
 
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
// ===== Chuva da Matrix =====
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const characters = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890ABCDEF@#$%&*';
const fontSize = 14;
let drops = [];
 
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columns = Math.floor(canvas.width / fontSize);
  // Mantém as gotas existentes e cria novas só para colunas novas
  drops = Array.from({ length: columns }, (_, i) => drops[i] ?? Math.floor(Math.random() * -50));
  // Quem prefere menos movimento recebe um quadro estático em vez de um canvas vazio
  if (reduceMotion) drawStaticFrame();
}

function drawStaticFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff66';
  ctx.font = fontSize + 'px monospace';
  const rows = Math.ceil(canvas.height / fontSize);

  for (let i = 0; i < drops.length; i++) {
    if (Math.random() < 0.35) continue; // deixa algumas colunas vazias
    const head = Math.floor(Math.random() * rows);
    const length = 6 + Math.floor(Math.random() * 14);
    for (let k = 0; k < length && head - k >= 0; k++) {
      ctx.globalAlpha = 1 - k / length; // rastro que some para cima
      ctx.fillText(characters.charAt(Math.floor(Math.random() * characters.length)), i * fontSize, (head - k) * fontSize);
    }
  }
  ctx.globalAlpha = 1;
}
 
function drawMatrix() {
  ctx.fillStyle = 'rgba(2, 7, 3, 0.07)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff66';
  ctx.font = fontSize + 'px monospace';
 
  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    const y = drops[i] * fontSize;
    ctx.fillText(text, i * fontSize, y);
    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
 
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
if (!reduceMotion) setInterval(drawMatrix, 40);
 
// ===== Toast =====
const toast = document.getElementById('toast');
let toastTimer;
 
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}
 
// ===== Copiar e-mail =====
async function copyEmail() {
  if (!EMAIL) {
    showToast('> E-mail ainda não configurado');
    return;
  }
  else {
    await navigator.clipboard.writeText(EMAIL);
    showToast('> E-mail copiado: ' + EMAIL);
  }
}
 
document.getElementById('copy-email').addEventListener('click', copyEmail);
 
// ===== Telemetria animada =====
const cpuBar = document.getElementById('cpu-bar');
const ram = document.getElementById('ram');
const rx = document.getElementById('rx');
const tx = document.getElementById('tx');
let rxTotal = 8.4;
let txTotal = 2.1;
 
function updateTelemetry() {
  const cpu = 20 + Math.floor(Math.random() * 50);
  const filled = Math.round(cpu / 10);
  cpuBar.textContent = '[' + '|'.repeat(filled) + '.'.repeat(10 - filled) + '] ' + cpu + '%';
  ram.textContent = 380 + Math.floor(Math.random() * 80) + 'MB';
  rxTotal += Math.random() * 0.3;
  txTotal += Math.random() * 0.1;
  rx.textContent = rxTotal.toFixed(1);
  tx.textContent = txTotal.toFixed(1);
}
 
// Troca alguns caracteres do bloco "glitch" de tempos em tempos
const glitch = document.getElementById('glitch');
const glitchChars = 'ｴｸﾅﾏﾊｱﾗｷﾇｺｳﾓﾀﾋｾｲﾁﾆ0123456789X';
 
function updateGlitch() {
  const chars = glitch.textContent.split('');
  for (let n = 0; n < 4; n++) {
    const i = Math.floor(Math.random() * chars.length);
    if (chars[i] !== '\n' && chars[i] !== ' ') {
      chars[i] = glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
    }
  }
  glitch.textContent = chars.join('');
}
 
if (!reduceMotion) {
  setInterval(updateTelemetry, 1500);
  setInterval(updateGlitch, 300);
}
 
// ===== Status "receiving data..." =====
const statusText = document.getElementById('status-text');
const statusMessages = ['receiving data...', 'decrypting profile...', 'loading projects...', 'connection stable'];
let statusIndex = 0;
setInterval(() => {
  statusIndex = (statusIndex + 1) % statusMessages.length;
  statusText.textContent = statusMessages[statusIndex];
}, 3000);
 