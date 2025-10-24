//20-10
import { trackCoordinators, scheduleByDay } from './data.js';

// ========================================
// ⚙️ CONFIGURAÇÃO DE FONTE DE DADOS
// ========================================
// 📌 ALTERE AQUI PARA MUDAR A FONTE DE DADOS:
//
// true  = 📄 Carrega do JSON LOCAL (Palestras.json)
//         Use para: desenvolvimento, testes, trabalho offline
//
// false = 🌐 Carrega da API POWER AUTOMATE (Excel online)
//         Use para: produção, dados em tempo real
//
const USE_LOCAL_JSON = true;
// ========================================

const STORAGE_KEY = 'mvpconf-agenda';
let selections = loadSelections();
let currentSchedule = scheduleByDay; // mutável para receber dados do backend
let currentDay = Object.keys(currentSchedule)[0];
let userEmail = null;
let userCode = null; // guarda o código de validação digitado
let isAuthenticated = false;
const COLLAPSE_KEY = 'mvpconf-collapsed';
let collapsedSlots = loadCollapsed();

const scheduleContainer = document.querySelector('#schedule');
const trackFilter = document.querySelector('#trackFilter');
const searchFilter = document.querySelector('#searchFilter');
const trackDropdown = document.querySelector('#trackDropdown');
const trackDropdownToggle = document.querySelector('#trackDropdownToggle');
const trackDropdownPanel = document.querySelector('#trackDropdownPanel');
// garante painel fechado no load
try { trackDropdownPanel?.setAttribute('hidden', ''); } catch {}
// toast removido
const authEmailDialog = document.querySelector('#authEmailDialog');
const authEmailForm = document.querySelector('#authEmailForm');
const authEmailInput = document.querySelector('#authEmailInput');
const cancelEmailBtn = document.querySelector('#cancelEmail');
const authCodeDialog = document.querySelector('#authCodeDialog');
const authCodeForm = document.querySelector('#authCodeForm');
const authCodeInput = document.querySelector('#authCodeInput');
const resendCodeLink = document.querySelector('#resendCodeLink');
const tabs = Array.from(document.querySelectorAll('.tab'));
const summaryLists = Array.from(document.querySelectorAll('.summary-list')).reduce((acc, element) => {
  const day = element.dataset.summaryDay;
  if (day) acc[day] = element;
  return acc;
}, {});

function loadSelections() {
  // Não persistir seleções em cache/localStorage
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  return {};
}

function saveSelections() {
  // Intencionalmente não persiste para evitar confusão do usuário
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

function loadCollapsed() {
  try {
    const raw = localStorage.getItem(COLLAPSE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.warn('Falha ao carregar colapsos salvos', error);
    return {};
  }
}

function saveCollapsed() {
  try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(collapsedSlots)); } catch {}
}

function ensureDefaultSelections() {
  let mutated = false;
  Object.entries(currentSchedule).forEach(([day, slots]) => {
    slots.forEach((slot) => {
      if (!selections[slot.id]) {
        selections[slot.id] = createVacantSelection(slot, day);
        mutated = true;
      }
    });
  });
  if (mutated) saveSelections();
}

function createVacantSelection(slot, day) {
  return {
    day,
    slotId: slot.id,
    talkId: `${slot.id}-vacant`,
    talkTitle: 'Slot vago',
    track: 'Horario livre',
    room: 'Livre',
    speaker: '',
    isVacant: true
  };
}

function createVacantTalk(slot) {
  return {
    id: `${slot.id}-vacant`,
    title: 'Slot vago',
    speaker: '',
    track: 'Horario livre',
    room: 'Livre',
    description: '',
    level: 'Livre',
    isVacant: true
  };
}

function getDayFromSlot(slot) {
  // Extrai o dia a partir do slotId (YYYY-MM-DD-HHmm)
  try { return String(slot.id).slice(0, 10); } catch { return ''; }
}

function dateFromSlotId(slotId) {
  const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})-([0-9]{2})([0-9]{2})$/.exec(String(slotId || ''));
  if (!m) return new Date(NaN);
  const [, y, mo, d, hh, mm] = m;
  return new Date(`${y}-${mo}-${d}T${hh}:${mm}:00`);
}

function formatTimeFromSlotId(slotId) {
  const dt = dateFromSlotId(slotId);
  const formatter = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${formatter.format(dt)}`;
}

function formatDayFromSlotId(slotId) {
  const dt = dateFromSlotId(slotId);
  const formatted = new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' }).format(dt);
  return formatted.replace(', ', ' - ');
}

function formatTime(start) {
  const startDate = new Date(start);
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${formatter.format(startDate)}`;
}

function formatDay(dateString) {
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit'
  }).format(new Date(dateString));

  return formatted.replace(', ', ' - ');
}

function buildFilters() {
  const tracks = new Set(trackCoordinators.map((item) => item.name));
  Object.values(currentSchedule).forEach((slots) => {
    slots.forEach((slot) => {
      slot.talks.forEach((talk) => tracks.add(talk.track));
    });
  });

  // reset options mantendo 'Todas'
  while (trackFilter.options.length > 1) trackFilter.remove(1);

  [...tracks]
    .sort((a, b) => a.localeCompare(b))
    .forEach((track) => {
      const option = document.createElement('option');
      option.value = track;
      option.textContent = track;
      trackFilter.appendChild(option);
    });
  // Atualiza dropdown custom
  renderTrackDropdown();
  // garante fechado ap�s render
  trackDropdownPanel?.setAttribute('hidden', '');
}

// displayToast desativado
function displayToast(_) { alert(_); }

function getCurrentSlots() {
  return currentSchedule[currentDay] ?? [];
}

function talkMatchesFilters(talk, selectedTracks, keyword) {
  const tracks = Array.isArray(selectedTracks) ? selectedTracks : [];
  const allSelected = tracks.length === 0 || tracks.includes('all');
  if (talk.isVacant) {
    return keyword === '' && (allSelected || tracks.includes('Horario livre'));
  }

  const matchesTrack = allSelected || tracks.includes(talk.track);
  if (!matchesTrack) return false;

  if (!keyword) return true;
  const haystack = `${talk.title} ${talk.speaker} ${talk.description}`.toLowerCase();
  return haystack.includes(keyword);
}

function renderSchedule() {
  ensureDefaultSelections();
  scheduleContainer.innerHTML = '';

  const slotTemplate = document.querySelector('#slotTemplate');
  const talkTemplate = document.querySelector('#talkTemplate');
  const selectedTracks = getSelectedTracks();
  const keyword = searchFilter.value.trim().toLowerCase();

  const slots = getCurrentSlots();

  if (slots.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'talk-desc';
    emptyState.textContent = 'Carregando Agenda...';
    scheduleContainer.appendChild(emptyState);
    return;
  }

  slots.forEach((slot) => {
    const slotNode = slotTemplate.content.firstElementChild.cloneNode(true);
    // Identificador para buscas posteriores
    try { slotNode.dataset.slotId = slot.id; } catch {}
    const slotTime = slotNode.querySelector('.slot-time');
    const slotInfo = slotNode.querySelector('.slot-info');
    const slotDayLabel = slotNode.querySelector('.slot-day');
    const talksContainer = slotNode.querySelector('.talks');
    // id �nico para aria-controls
    const talksId = `talks-${slot.id}`;
    talksContainer.id = talksId;
    // BoT�o de colapso e label com seleção
    const headerEl = slotNode.querySelector('header');
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'slot-toggle secondary';
    toggleBtn.setAttribute('aria-controls', talksId);
    // �cone chevron
    toggleBtn.innerHTML = '<svg class="chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const selectedLabel = document.createElement('div');
    selectedLabel.className = 'slot-selected';
    headerEl.appendChild(toggleBtn);
    slotNode.insertBefore(selectedLabel, talksContainer);

    slotTime.textContent = `${formatTimeFromSlotId(slot.id)}`;
    slotDayLabel.textContent = formatDayFromSlotId(slot.id);

    const talksWithVacant = [createVacantTalk(slot), ...slot.talks];

    const visibleTalks = talksWithVacant.filter((talk) =>
      talkMatchesFilters(talk, selectedTracks, keyword)
    );

    // Atualiza info do slot com base nos filtros (somente palestras, ignora "livre")
    const visibleTalksCount = visibleTalks.filter((t) => !t.isVacant).length;
    slotInfo.textContent = visibleTalksCount === 1 ? '1 palestra' : `${visibleTalksCount} palestras`;

    if (visibleTalks.length === 0) {
      const emptyState = document.createElement('p');
      emptyState.className = 'talk-desc';
      emptyState.textContent = 'Nenhuma palestra com esses filtros.';
      talksContainer.appendChild(emptyState);
      return;
    }

    visibleTalks.forEach((talk) => {
      const talkNode = talkTemplate.content.firstElementChild.cloneNode(true);
      const input = talkNode.querySelector('input[type=radio]');
      const title = talkNode.querySelector('h3');
      const meta = talkNode.querySelector('.talk-meta');
      const desc = talkNode.querySelector('.talk-desc');
      const badge = talkNode.querySelector('.badge');
      const talkContent = talkNode.querySelector('.talk-content');

      const existingRoom = talkNode.querySelector('.talk-room');
      if (existingRoom) existingRoom.remove();

      if (talk.isVacant) {
        talkNode.classList.add('slot-vago');
        title.textContent = talk.title;
        meta.textContent = '';
        desc.textContent = '';
        badge.textContent = 'Livre';
      } else {
        talkNode.classList.remove('slot-vago');
        title.textContent = talk.title;
        meta.textContent = `${talk.speaker} - ${talk.room}`;
        desc.textContent = talk.description;

        // Verifica se a sala está lotada
        if (talk.isFull) {
          talkNode.classList.add('sala-lotada');
        }

        // Remove o badge padrão do template (vamos recriar dentro do talk-content)
        if (badge) badge.remove();

        // Container para os badges (trilha + nível)
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'talk-badges';
        badgesContainer.style.marginTop = '0.5rem';
        badgesContainer.style.marginBottom = '0.3rem';
        badgesContainer.style.display = 'flex';
        badgesContainer.style.gap = '0.4rem';
        badgesContainer.style.flexWrap = 'wrap';

        // Adiciona badge "Sala Lotada" se isFull for true
        if (talk.isFull) {
          const fullBadge = document.createElement('span');
          fullBadge.className = 'badge badge-full';
          fullBadge.textContent = 'Sala Lotada';
          badgesContainer.appendChild(fullBadge);
        }

        // Adiciona badge de trilha
        const trackText = (talk.track || '').toString().trim();
        if (trackText) {
          const trackBadge = document.createElement('span');
          trackBadge.className = 'track-badge';
          trackBadge.textContent = trackText;

          // Adiciona classe específica por trilha
          const trackSlug = trackText.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
            .replace(/&/g, 'e') // substitui & por e
            .replace(/\s+/g, '-'); // substitui espaços por hífen
          trackBadge.classList.add(trackSlug);

          badgesContainer.appendChild(trackBadge);
        }

        // Adiciona badge de nível
        const levelText = (talk.level || '').toString().trim();
        if (levelText) {
          const levelBadge = document.createElement('span');
          levelBadge.className = 'badge';
          levelBadge.textContent = `Nível: ${levelText}`;
          badgesContainer.appendChild(levelBadge);
        }

        // Insere os badges ANTES da descrição, dentro do talk-content
        if (desc && desc.parentElement === talkContent) {
          talkContent.insertBefore(badgesContainer, desc);
        } else {
          talkContent.appendChild(badgesContainer);
        }

        // const roomPill = document.createElement('span');
        // roomPill.className = 'talk-room';
        // roomPill.textContent = talk.room;

        // if (badge && badge.parentElement === talkContent) {
        //   talkContent.insertBefore(roomPill, badge);
        // } else if (desc && desc.parentElement === talkContent && desc.textContent.trim().length) {
        //   talkContent.insertBefore(roomPill, desc);
        // } else {
        //   talkContent.appendChild(roomPill);
        // }
      }

      input.name = `slot-${slot.id}`;
      input.value = talk.id;
      input.checked = selections[slot.id]?.talkId === talk.id;

      // Desabilita a seleção se a sala estiver lotada (exceto para slots vagos)
      if (talk.isFull && !talk.isVacant) {
        input.disabled = true;
        talkNode.style.opacity = '0.6';
        talkNode.style.cursor = 'not-allowed';

        // Adiciona evento de clique para mostrar alerta
        talkNode.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          alert('❌ Sala Lotada!\n\nEsta palestra atingiu a capacidade máxima e não está mais disponível para seleção.');
        });
      } else {
        input.addEventListener('change', (e) => handleSelection(slot, talk, e));
      }

      talksContainer.appendChild(talkNode);
    });

    // Estado de colapso inicial
    const isCollapsed = Boolean(collapsedSlots[slot.id]);
    const selection = selections[slot.id];
    const selTitle = selection?.isVacant ? 'Slot vago' : (selection?.talkTitle || 'Nenhuma palestra selecionada');
    selectedLabel.textContent = selTitle;
    slotNode.classList.toggle('collapsed', isCollapsed);
    toggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
    toggleBtn.setAttribute('aria-label', isCollapsed ? 'Expandir slot' : 'Recolher slot');
    toggleBtn.title = isCollapsed ? 'Expandir' : 'Recolher';
    toggleBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const nowCollapsed = !slotNode.classList.contains('collapsed');
      slotNode.classList.toggle('collapsed', nowCollapsed);
      collapsedSlots[slot.id] = nowCollapsed;
      saveCollapsed();
      toggleBtn.setAttribute('aria-expanded', String(!nowCollapsed));
      toggleBtn.setAttribute('aria-label', nowCollapsed ? 'Expandir slot' : 'Recolher slot');
      toggleBtn.title = nowCollapsed ? 'Expandir' : 'Recolher';
      try {
        const currentSel = selections[slot.id];
        selectedLabel.textContent = currentSel?.isVacant ? 'Slot vago' : (currentSel?.talkTitle || 'Nenhuma palestra selecionada');
      } catch {}
    });

    scheduleContainer.appendChild(slotNode);
  });
}

function handleSelection(slot, talk, event) {
  const day = getDayFromSlot(slot);
  selections[slot.id] = {
    day,
    slotId: slot.id,
    talkId: talk.id,
    talkTitle: talk.title,
    track: talk.isVacant ? 'Horario livre' : talk.track,
    room: talk.isVacant ? 'Livre' : talk.room,
    speaker: talk.isVacant ? '' : talk.speaker,
    isVacant: Boolean(talk.isVacant)
  };
  saveSelections();
  updateSummary();
  // Atualiza label e colapsa o slot atual, enT�o foca no próximo
  try {
    const card = scheduleContainer.querySelector(`.slot[data-slot-id="${slot.id}"]`);
    const label = card?.querySelector('.slot-selected');
    if (label) label.textContent = selections[slot.id]?.isVacant ? 'Slot vago' : (selections[slot.id]?.talkTitle || 'Nenhuma palestra selecionada');
    if (card && !card.classList.contains('collapsed')) {
      card.classList.add('collapsed');
      try {
        collapsedSlots[slot.id] = true; saveCollapsed();
        const btn = card.querySelector('.slot-toggle');
        btn?.setAttribute('aria-expanded', 'false');
        btn?.setAttribute('aria-label', 'Expandir slot');
        if (btn) btn.title = 'Expandir';
      } catch {}
    }
  } catch {}
  // Após isso, foca no primeiro item do próximo slot
  focusNextSlot(slot);
}

function updateSummary() {
  ensureDefaultSelections();

  Object.entries(summaryLists).forEach(([day, tbody]) => {
    tbody.innerHTML = '';

    const selectionEntries = Object.values(selections)
      .filter((selection) => selection.day === day)
      .sort((a, b) => dateFromSlotId(a.slotId) - dateFromSlotId(b.slotId));

    if (selectionEntries.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 3;
      td.textContent = 'Nenhuma palestra selecionada para este dia.';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    selectionEntries.forEach((selection) => {
      const tr = document.createElement('tr');
      if (selection.isVacant) tr.classList.add('vacant-row');

      const timeRange = formatTimeFromSlotId(selection.slotId);

      const tdTime = document.createElement('td');
      tdTime.className = 'time-cell';
      tdTime.textContent = timeRange;

      const tdTitle = document.createElement('td');
      if (selection.isVacant) {
        const span = document.createElement('span');
        span.textContent = 'Slot vago';
        tdTitle.appendChild(span);
      } else {
        const title = document.createElement('span');
        title.className = 'talk-title';
        title.textContent = selection.talkTitle;
        tdTitle.appendChild(title);
      }

      const tdRoom = document.createElement('td');
      tdRoom.textContent = selection.isVacant ? '' : selection.room;

      tr.appendChild(tdTime);
      tr.appendChild(tdTitle);
      tr.appendChild(tdRoom);
      tbody.appendChild(tr);
    });
  });
}

function clearSelections() {
  selections = {};
  ensureDefaultSelections();
  saveSelections();
  updateSummary();
  renderSchedule();
}

function focusNextSlot(currentSlot) {
  try {
    const slots = getCurrentSlots();
    const idx = slots.findIndex((s) => s.id === currentSlot.id);
    for (let i = idx + 1; i < slots.length; i++) {
      const nextId = slots[i].id;
      const card = scheduleContainer.querySelector(`.slot[data-slot-id="${nextId}"]`);
      // Se estiver colapsado, expande automaticamente
      if (card && card.classList.contains('collapsed')) {
        card.classList.remove('collapsed');
        try {
          collapsedSlots[nextId] = false; saveCollapsed();
          const btn = card.querySelector('.slot-toggle');
          btn?.setAttribute('aria-expanded', 'true');
          btn?.setAttribute('aria-label', 'Recolher slot');
          if (btn) btn.title = 'Recolher';
        } catch {}
      }
      const nextInput = card?.querySelector('input[type="radio"]')
        || scheduleContainer.querySelector(`input[name="slot-${nextId}"]`);
      if (nextInput) { nextInput.focus(); return; }
    }
  } catch (_) { /* no-op */ }
}

function toCsv(selectionsMap) {
  const rows = [
    ['day', 'slotId', 'talkId', 'talkTitle', 'track', 'room', 'isVacant'],
    ...Object.values(selectionsMap).map((sel) => [
      sel.day,
      sel.slotId,
      sel.talkId,
      sel.talkTitle,
      sel.track,
      sel.room,
      sel.isVacant ? 'true' : 'false'
    ])
  ];

  return rows
    .map((row) =>
      row
        .map((value) => {
          const normalized = String(value ?? '');
          return `"${normalized.replace(/"/g, '""')}"`;
        })
        .join(',')
    )
    .join('\n');
}

function downloadCsv() {
  if (Object.keys(selections).length === 0) {
    alert('Selecione ao menos uma palestra antes de salvar.');
    return;
  }

  const csvContent = toCsv(selections);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'agenda-mvpconf.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function setDay(day) {
  if (currentDay === day) return;
  currentDay = day;
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.day === day);
  });
  renderSchedule();
  // Após trocar de aba, foca no primeiro slot da nova aba
  try {
    requestAnimationFrame(() => {
      const firstCard = scheduleContainer.querySelector('.slot');
      if (firstCard && firstCard.classList.contains('collapsed')) {
        firstCard.classList.remove('collapsed');
        const id = firstCard?.dataset?.slotId;
        if (id) { try { collapsedSlots[id] = false; saveCollapsed(); } catch {} }
        const btn = firstCard.querySelector('.slot-toggle');
        btn?.setAttribute('aria-expanded', 'true');
        btn?.setAttribute('aria-label', 'Recolher slot');
        if (btn) btn.title = 'Recolher';
      }
      const firstInput = scheduleContainer.querySelector('.slot input[type="radio"]');
      if (firstInput) firstInput.focus();
    });
  } catch (_) { /* no-op */ }
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.warn('Nao foi possivel registrar o service worker', error);
    });
  }
}

function setupEvents() {
  document.querySelector('#saveButton').addEventListener('click', async () => {
    const ok = window.confirm('Deseja salvar sua agenda?');
    if (!ok) return;
    await saveAgenda();
  });
  document.querySelector('#clearSelections').addEventListener('click', () => {
    const ok = window.confirm('Tem certeza que deseja limpar sua agenda?');
    if (!ok) return;
    clearSelections();
  });
  document.querySelector('#clearFilters').addEventListener('click', () => {
    setTrackFilterToAll();
    syncTrackCheckboxesFromSelect();
    renderTrackDropdownSummary();
    searchFilter.value = '';
    renderSchedule();
  });
  trackFilter.addEventListener('change', () => {
    syncTrackCheckboxesFromSelect();
    renderTrackDropdownSummary();
    renderSchedule();
  });
  searchFilter.addEventListener('input', renderSchedule);

  tabs.forEach((tab) => tab.addEventListener('click', () => setDay(tab.dataset.day)));
}

function renderTrackDropdown() {
  if (!trackDropdownPanel) return;
  trackDropdownPanel.innerHTML = '';

  const createItem = (label, value) => {
    const wrap = document.createElement('label');
    wrap.className = 'multi-dropdown__item';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = value;
    // estado inicial conforme select
    const opt = Array.from(trackFilter.options).find((o) => o.value === value);
    cb.checked = Boolean(opt?.selected);
    cb.addEventListener('change', () => onTrackCheckboxChange(value, cb.checked));

    const span = document.createElement('span');
    span.textContent = label;

    // Adiciona badge colorido para trilhas (exceto 'Todas')
    if (value !== 'all') {
      const trackSlug = value.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/&/g, 'e') // substitui & por e
        .replace(/\s+/g, '-'); // substitui espaços por hífen

      span.className = 'track-badge ' + trackSlug;
    }

    wrap.appendChild(cb);
    wrap.appendChild(span);
    return wrap;
  };

  // item 'Todas'
  trackDropdownPanel.appendChild(createItem('Todas', 'all'));
  // demais trilhas (ignora 'all' e vazios)
  Array.from(trackFilter.options)
    .map((o) => o.value)
    .filter((v) => v && v !== 'all')
    .sort((a, b) => a.localeCompare(b))
    .forEach((value) => trackDropdownPanel.appendChild(createItem(value, value)));

  renderTrackDropdownSummary();
}

function onTrackCheckboxChange(value, checked) {
  if (value === 'all') {
    // Marcar 'Todas' desmarca as outras; desmarcar 'Todas' não seleciona nada
    Array.from(trackFilter.options).forEach((o) => {
      o.selected = (o.value === 'all') ? checked : false;
    });
  } else {
    // Marcar qualquer trilha desmarca 'Todas'
    Array.from(trackFilter.options).forEach((o) => {
      if (o.value === 'all') o.selected = false;
      if (o.value === value) o.selected = checked;
    });
    // Se nenhuma marcada, volta 'Todas'
    const any = Array.from(trackFilter.options).some((o) => o.value !== 'all' && o.selected);
    if (!any) {
      Array.from(trackFilter.options).forEach((o) => (o.selected = o.value === 'all'));
    }
  }
  // Sincroniza checkboxes visuais (caso haja interdepend�ncias)
  Array.from(trackDropdownPanel.querySelectorAll('input[type=checkbox]')).forEach((cb) => {
    const opt = Array.from(trackFilter.options).find((o) => o.value === cb.value);
    cb.checked = Boolean(opt?.selected);
  });
  renderTrackDropdownSummary();
  renderSchedule();
}

function renderTrackDropdownSummary() {
  if (!trackDropdownToggle) return;
  const selected = getSelectedTracks();
  trackDropdownToggle.textContent = (selected.length === 0) ? 'Todas' : `Trilhas (${selected.length})`;
}

// Helpers para abrir/fechar dropdown de trilhas
function openTrackDropdown() {
  trackDropdownPanel?.removeAttribute('hidden');
}
function closeTrackDropdown() {
  trackDropdownPanel?.setAttribute('hidden', '');
}

// Toggle do dropdown
trackDropdownToggle?.setAttribute('aria-haspopup', 'listbox');
trackDropdownToggle?.setAttribute('aria-expanded', 'false');
trackDropdownToggle?.addEventListener('click', (ev) => {
  ev.stopPropagation();
  const isHidden = trackDropdownPanel?.hasAttribute('hidden');
  if (isHidden) {
    openTrackDropdown();
    trackDropdownToggle?.setAttribute('aria-expanded', 'true');
  } else {
    closeTrackDropdown();
    trackDropdownToggle?.setAttribute('aria-expanded', 'false');
  }
});

// Clique fora (usar pointerdown para capturar antes)
document.addEventListener('pointerdown', (e) => {
  if (!trackDropdown || !trackDropdownPanel) return;
  if (!trackDropdown.contains(e.target)) closeTrackDropdown();
});

// Fallback: clique fora (click) para navegadores sem pointer events
document.addEventListener('click', (e) => {
  if (!trackDropdown || !trackDropdownPanel) return;
  if (!trackDropdown.contains(e.target)) closeTrackDropdown();
});

// Utilit�rios para sincronizar estado do dropdown e do select oculto
function setTrackFilterToAll() {
  if (!trackFilter) return;
  Array.from(trackFilter.options).forEach((o) => (o.selected = o.value === 'all'));
}

function syncTrackCheckboxesFromSelect() {
  if (!trackDropdownPanel) return;
  Array.from(trackDropdownPanel.querySelectorAll('input[type=checkbox]')).forEach((cb) => {
    const opt = Array.from(trackFilter.options).find((o) => o.value === cb.value);
    cb.checked = Boolean(opt?.selected);
  });
}

// Fechar ao rolar/resize
window.addEventListener('scroll', closeTrackDropdown, { passive: true });
window.addEventListener('resize', closeTrackDropdown);

// Fechar com ESC
[trackDropdownToggle, trackDropdownPanel].forEach((el) => {
  el?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTrackDropdown();
  });
});

// ====== API placeholders ======
async function apiStartAuth(email) {

  const url = 'https://default5745ebc3a9564b3ca71051f857949e.4d.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/bcd6d33c798449a09f7a566c801a53b3/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GDzT_KBvrhV6e2c_bJ4UUeKfKol1oYKLOM1dBOfGx9k';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Email: email }),
      signal: controller.signal,
      mode: 'cors'
    });
    clearTimeout(timeout);
    if (!res.ok) {
      if (res.status === 400) {
        try { alert('Email invalido. Verifique e tente novamente.'); } catch {}
        return { ok: false, status: 400, message: 'Email invalido. Verifique e tente novamente.' };
      }
      return { ok: false, status: res.status, message: `Falha ao enviar email (HTTP ${res.status}).` };
    }
    return { ok: true };
  } catch (err) {
    clearTimeout(timeout);
    console.warn('apiStartAuth error', err);
    const aborted = err && (err.name === 'AbortError');
    return { ok: false, message: aborted ? 'Tempo esgotado ao enviar e-mail.' : 'Não foi possível iniciar o login.' };
  }
}

async function apiVerifyCode(email, code) {
  try {
    // const res = await fetch('/api/auth/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, code }) });
    // if (!res.ok) throw new Error('Código inválido');
    // const data = await res.json();
    return { ok: true /*, data */ };
  } catch (err) {
    console.warn('apiVerifyCode error', err);
    return { ok: false, message: 'Código inválido ou expirado.' };
  }
}

async function apiLoadAgenda(email) {
  try {
    return await apiLoadAgendaRemote(email);
  } catch (err) {
    console.warn('apiLoadAgenda error', err);
    return { ok: false, message: 'Não foi possível carregar sua agenda.' };
  }
}

async function apiSaveAgenda(email, selectionsArray) {
  try {
    // const res = await fetch('/api/agenda', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, selections: selectionsArray }) });
    // if (!res.ok) throw new Error('Falha ao salvar');
    return { ok: true };
  } catch (err) {
    console.warn('apiSaveAgenda error', err);
    return { ok: false, message: 'Não foi possível salvar sua agenda.' };
  }
}

// ====== Auth flow ======
function openDialog(el) {
  try {
    if (!el) return;
    if (el.showModal) el.showModal();
    else if (el.show) el.show();
    else el.setAttribute('open', '');
  } catch (e) {
    try { el.setAttribute('open', ''); } catch {}
  }
}

function closeDialog(el) {
  try {
    if (!el) return;
    if (el.close) el.close();
    else el.removeAttribute('open');
  } catch {}
}

async function promptAuthFlow() {
  // Step 1: e-mail
  openDialog(authEmailDialog);
}

authEmailForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = authEmailInput.value.trim();
  if (!email) return;
  const submitBtn = authEmailForm.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent || '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
  }
  // Temporariamente não enviar e-mail; carregar agenda diretamente
  userEmail = email;
  if (typeof userCode === 'undefined' || userCode === null) userCode = '';
  await loadAgendaFromServer();
  if (false) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText || 'Continuar';
    }
    displayToast(res.message || 'Erro ao iniciar login.');
    return;
  }
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText || 'Continuar';
  }
  userEmail = email;
  const emailDisplay = document.querySelector('#authEmailDisplay');
  if (emailDisplay) emailDisplay.textContent = userEmail;
  closeDialog(authEmailDialog);
  // displayToast desativado no fluxo tempor�rio
  // openDialog(authCodeDialog); // desativado no fluxo tempor�rio
});

authCodeForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = authCodeInput.value.trim();
  if (!code || !userEmail) return;
  const res = await apiVerifyCode(userEmail, code);
  if (!res.ok) {
    displayToast(res.message || 'Código inválido.');
    return;
  }
  isAuthenticated = true;
  userCode = code; // armazena o código para usar nas chamadas da API
  try { authCodeDialog.close(); } catch {}
  await loadAgendaFromServer();
});

resendCodeLink?.addEventListener('click', async () => {
  if (!userEmail) {
    closeDialog(authCodeDialog);
    openDialog(authEmailDialog);
    return;
  }
  if (resendCodeLink.disabled) return;
  const originalText = resendCodeLink.textContent || '';
  resendCodeLink.disabled = true;
  resendCodeLink.textContent = 'enviando';
  let res;
  try { res = await apiStartAuth(userEmail); } catch (err) { res = { ok: false, message: 'Falha ao reenviar e-mail.' }; }
  if (false) {
    resendCodeLink.disabled = false;
    resendCodeLink.textContent = originalText || 'Reenviar e-mail';
    alert(res.message || 'Falha ao reenviar e-mail.');
    return;
  }
  resendCodeLink.textContent = 'reenviado';
  alert('Reenviamos o email com o codigo.');
  return;
  const res1 = await apiStartAuth(userEmail);
  if (!res1.ok) {
    displayToast(res1.message || 'Erro ao reenviar e-mail.');
    return;
  }
  // Mensagem silenciosa: código reenviado, sem modal/toast
});

cancelEmailBtn?.addEventListener('click', () => closeDialog(authEmailDialog));

async function loadAgendaFromServer() {
  if (!userEmail) return;
  const res = await apiLoadAgenda(userEmail);
  if (!res.ok) {
    alert('Falha ao carregar agenda.');
    return;
  }
  const data = res.data || {};
  // Se vier uma lista de palestras "flat" (talk + dia/slot), normaliza para o schedule interno
  const flatTalks = data.Talks || data.talks || data.items;
  if (Array.isArray(flatTalks) && flatTalks.length) {
    currentSchedule = normalizeScheduleFromFlatTalks(flatTalks);
    currentDay = Object.keys(currentSchedule)[0] || currentDay;
    buildFilters();
  }

  ensureDefaultSelections();
  const rawSelections = (data.Selections !== undefined) ? data.Selections : data.selections;
  let serverSelections = Array.isArray(rawSelections) ? rawSelections : [];
  if (typeof rawSelections === 'string') {
    try { serverSelections = JSON.parse(rawSelections); } catch {}
  }
  if (Array.isArray(serverSelections)) {
    applyServerSelections(serverSelections);
  }
  updateSummary();
  renderSchedule();
}

// Converte lista "flat" de palestras (cada item com campos do talk + dia/slot) no formato scheduleByDay
function normalizeScheduleFromFlatTalks(items) {
  const byDay = {};

  // Debug: mostra o primeiro item para ver todos os campos disponíveis
  if (items && items.length > 0) {
    console.log('📊 Exemplo de dados recebidos da API:', items[0]);
    console.log('📋 Todos os campos disponíveis:', Object.keys(items[0]));
  }

  items.forEach((it) => {
    const start = it.start || it.Start || '';
    const end = it.end || it.End || '';
    const day = it.day || it.Day || (typeof start === 'string' && start.includes('T') ? start.split('T')[0] : '');
    if (!day) return;

    let slotId = it.slotId || it.SlotId || it.slot_id;
    if (!slotId) {
      const timeKey = (start || '').slice(11, 16).replace(':', '');
      slotId = `${day}-${timeKey}`;
    }

    if (!byDay[day]) byDay[day] = new Map();
    const dayMap = byDay[day];
    if (!dayMap.has(slotId)) {
      dayMap.set(slotId, { id: slotId, start, end, talks: [] });
    }

    const talk = {
      id: it.id || it.talkId || it.TalkId || `${slotId}-talk`,
      title: it.title || it.titulo || '',
      speaker: it.speaker || it.palestrante || '',
      track: it.track || it.trilha || '',
      room: it.room || it.sala || '',
      description: it.description || it.descricao || '',
      level: it.level || it.nivel || '',
      isFull: it.lotado === true || it.Lotado === true ||
              String(it.lotado).toLowerCase() === 'true' ||
              it.isFull === true || it.IsFull === true || it.is_full === true ||
              it.isfull === true || it.ISFULL === true ||
              String(it.isFull).toLowerCase() === 'true' ||
              String(it.IsFull).toLowerCase() === 'true' ||
              String(it.is_full).toLowerCase() === 'true' ||
              String(it.isfull).toLowerCase() === 'true'
    };

    // Debug: mostra no console quando uma palestra está lotada
    if (talk.isFull) {
      console.log('🔴 Sala Lotada:', talk.title, '- Sala:', talk.room, '- lotado:', it.lotado);
    }

    dayMap.get(slotId).talks.push(talk);
  });

  const schedule = {};
  Object.entries(byDay).forEach(([day, slotMap]) => {
    schedule[day] = Array.from(slotMap.values()).sort((a, b) => new Date(a.start) - new Date(b.start));
  });
  return schedule;
}

function applyServerSelections(serverSelections) {
  const slotsIndex = new Map();
  Object.entries(currentSchedule).forEach(([day, slots]) => {
    slots.forEach((slot) => slotsIndex.set(slot.id, { day, slot }));
  });

  serverSelections.forEach((sel) => {
    const slotId = sel.slotId || sel.SlotId;
    const talkId = sel.talkId || sel.TalkId;
    const item = slotsIndex.get(slotId);
    if (!item) return;
    const { day, slot } = item;
    const talk = slot.talks.find((t) => t.id === talkId);
    if (!talk) {
      selections[slot.id] = createVacantSelection(slot, day);
      return;
    }
    selections[slot.id] = {
      day,
      slotId: slot.id,
      talkId: talk.id,
      talkTitle: talk.title,
      track: talk.track,
      room: talk.room,
      speaker: talk.speaker,
      isVacant: false
    };
  });
  saveSelections();
}

async function saveAgenda() {
  if (!userEmail) {
    await promptAuthFlow();
    return;
  }
  const payload = Object.values(selections).map((s) => ({ slotId: s.slotId, talkId: s.talkId }));
  console.log(payload);
  const res = await apiSaveAgendaRemote(userEmail, payload);
  if (!res.ok) {
    displayToast(res.message || 'Erro ao salvar agenda.');
    return;
  }
  displayToast('Agenda salva!');
  // opcional: ainda gerar CSV local
  // downloadCsv();
}

// Implementação real para salvar agenda via Power Automate
// Real backend: carregar agenda do usu�rio
async function apiLoadAgendaRemote(email) {
  const base = 'https://default5745ebc3a9564b3ca71051f857949e.4d.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/773c6bbd1d6b4c8596a9afe8461968d3/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SvUfOtq9WIa1YPOt8OjP1Yw4mDc0Cu9YqkGd6a9S580';
  let url = email ? `${base}&Email=${encodeURIComponent(email)}` : base;
  url += `&Code=${encodeURIComponent(userCode ?? '')}`; // envia o código, mesmo vazio
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, { method: 'GET', signal: controller.signal, mode: 'cors' });
    clearTimeout(timeout);
    if (!res.ok) {
      return { ok: false, status: res.status, message: `Falha ao carregar agenda (HTTP ${res.status}).` };
    }
    let data = null;
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await res.json();
    } else {
      try { data = JSON.parse(await res.text()); } catch (_) { data = {}; }
    }
    return { ok: true, data: data || {} };
  } catch (err) {
    clearTimeout(timeout);
    console.warn('apiLoadAgendaRemote error', err);
    const aborted = err && (err.name === 'AbortError');
    return { ok: false, message: aborted ? 'Tempo esgotado ao carregar agenda.' : 'Não foi possível carregar sua agenda.' };
  }
}

async function apiSaveAgendaRemote(email, selectionsArray) {
  const url = 'https://default5745ebc3a9564b3ca71051f857949e.4d.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/651d93aa905649ff93a23e51f6e16adb/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cBYvE-ZKs3324iWH1RJ0KopHgbZ78h8YN_dBSRbQ-xU';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const payload = {
    Email: email,
    Selections: (selectionsArray || []).map((s) => ({ SlotId: s.slotId, TalkId: s.talkId }))
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      mode: 'cors'
    });
    clearTimeout(timeout);
    if (!res.ok) {
      return { ok: false, status: res.status, message: `Falha ao salvar (HTTP ${res.status}).` };
    }
    return { ok: true };
  } catch (err) {
    clearTimeout(timeout);
    console.warn('apiSaveAgendaRemote error', err);
    const aborted = err && (err.name === 'AbortError');
    return { ok: false, message: aborted ? 'Tempo esgotado ao salvar.' : 'Não foi possível salvar sua agenda.' };
  }
}

ensureDefaultSelections();
buildFilters();
// garante seleção padrão no filtro múltiplo
ensureTrackFilterDefault();
setupEvents();
// Carrega palestras (grade) a partir da API dedicada
loadTalksFromServer();
updateSummary();
renderSchedule();
registerServiceWorker();

// inicia fluxo de autenticação
promptAuthFlow();



async function apiLoadTalksRemote() {
  const url = 'https://default5745ebc3a9564b3ca71051f857949e.4d.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/a63d4891b08e4216a181f7c1c1d056e8/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=T3Ln5vzPxmiTOEZ4mxQ5JimBEyUoAJ-mfDzpcxHpepc';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, { method: 'GET', signal: controller.signal, mode: 'cors' });
    clearTimeout(timeout);
    if (!res.ok) {
      return { ok: false, status: res.status, message: `Falha ao carregar palestras (HTTP ${res.status}).` };
    }
    const ct = res.headers.get('content-type') || '';
    let data = null;
    if (ct.includes('application/json')) data = await res.json();
    else { try { data = JSON.parse(await res.text()); } catch { data = {}; } }
    return { ok: true, data: data || {} };
  } catch (err) {
    clearTimeout(timeout);
    console.warn('apiLoadTalksRemote error', err);
    const aborted = err && (err.name === 'AbortError');
    return { ok: false, message: aborted ? 'Tempo esgotado ao carregar palestras.' : 'Não foi possível carregar as palestras.' };
  }
}

// Carrega palestras do JSON local (Palestras.json)
async function apiLoadTalksLocal() {
  try {
    const res = await fetch('./Palestras.json');
    if (!res.ok) {
      return { ok: false, status: res.status, message: `Falha ao carregar Palestras.json (HTTP ${res.status}).` };
    }
    const data = await res.json();
    return { ok: true, data: data || {} };
  } catch (err) {
    console.warn('apiLoadTalksLocal error', err);
    return { ok: false, message: 'Não foi possível carregar o arquivo Palestras.json.' };
  }
}

async function loadTalksFromServer() {
  // Usa configuração para decidir a fonte de dados
  console.log(`📚 Carregando palestras de: ${USE_LOCAL_JSON ? 'JSON LOCAL (Palestras.json)' : 'API POWER AUTOMATE (Excel)'}`);
  const res = USE_LOCAL_JSON ? await apiLoadTalksLocal() : await apiLoadTalksRemote();
  
  if (!res.ok) {
    console.warn(res.message || 'Falha ao carregar palestras.');
    return;
  }
  const payload = res.data || {};
  const items = Array.isArray(payload) ? payload : (payload.body || payload.Talks || payload.talks || payload.items || []);
  if (!Array.isArray(items) || items.length === 0) return;

  currentSchedule = normalizeScheduleFromFlatTalks(items);
  currentDay = Object.keys(currentSchedule)[0] || currentDay;
  buildFilters();
  ensureTrackFilterDefault();
  ensureDefaultSelections();
  updateSummary();
  renderSchedule();
}

// Helper: seleciona 'Todas' por padrão no multi-select
function ensureTrackFilterDefault() {
  if (!trackFilter) return;
  const anySelected = Array.from(trackFilter.options).some((o) => o.selected);
  if (!anySelected) {
    Array.from(trackFilter.options).forEach((o) => (o.selected = o.value === 'all'));
  }
}

// Multi-trilha: leitura das trilhas selecionadas
function getSelectedTracks() {
  if (!trackFilter) return [];
  const values = Array.from(trackFilter.selectedOptions).map((o) => o.value);
  if (values.length === 0 || values.includes('all')) return [];
  return values;
}

// Ajusta eventos para multi-seleção
try {
  trackFilter.addEventListener('change', () => {
    const selected = Array.from(trackFilter.selectedOptions).map((o) => o.value);
    if (selected.length > 1 && selected.includes('all')) {
      Array.from(trackFilter.options).forEach((o) => { if (o.value === 'all') o.selected = false; });
    } else if (selected.length === 0) {
      Array.from(trackFilter.options).forEach((o) => (o.selected = o.value === 'all'));
    }
    renderSchedule();
  });
  document.querySelector('#clearFilters')?.addEventListener('click', () => {
    Array.from(trackFilter.options).forEach((o) => (o.selected = o.value === 'all'));
    searchFilter.value = '';
    renderSchedule();
  });
} catch {}
