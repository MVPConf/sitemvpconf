let talksData = null;

// Display local timezone time
function displayLocalTime() {
  const localTimeEl = document.getElementById('local-time');
  if (!localTimeEl) return;
  
  // Event times in UTC: March 7, 2026 08:00-17:00 (UTC+1 = 07:00-16:00 UTC)
  const startUTC = new Date('2026-03-07T07:00:00Z');
  const endUTC = new Date('2026-03-07T16:00:00Z');
  
  // Get user's timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const lang = document.documentElement.lang || 'en';
  
  // Format times in local timezone
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const startLocal = startUTC.toLocaleTimeString(lang, timeOptions);
  const endLocal = endUTC.toLocaleTimeString(lang, timeOptions);
  
  // Get timezone abbreviation or offset
  const tzAbbr = new Date().toLocaleTimeString(lang, { timeZoneName: 'short' }).split(' ').pop();
  
  // Check if local time differs from UTC (offset 1)
  const utcOffset = -new Date().getTimezoneOffset() / 60;
  if (utcOffset === 1) {
    localTimeEl.style.display = 'none';
    return;
  }
  
  // Multilingual labels
  const labels = {
    en: 'In your local time',
    fr: 'Dans votre fuseau horaire',
    pt: 'No seu hor\u00e1rio local'
  };
  
  localTimeEl.innerHTML = `<span data-lang="en">${labels.en}: ${startLocal} - ${endLocal} (${tzAbbr})</span><span data-lang="fr">${labels.fr}: ${startLocal} - ${endLocal} (${tzAbbr})</span><span data-lang="pt">${labels.pt}: ${startLocal} - ${endLocal} (${tzAbbr})</span>`;
  localTimeEl.style.display = 'block';
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  
  // Update button states
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');
  document.getElementById('btn-pt').classList.toggle('active', lang === 'pt');
  
  // Save preference
  localStorage.setItem('mvpconf-africa-lang', lang);
  
  // Sync session track with language
  setTrack(lang);
}

function setTrack(track) {
  // Update tab states
  document.querySelectorAll('.track-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.track === track);
  });
  
  // Update track visibility
  document.querySelectorAll('.sessions-track').forEach(trackEl => {
    trackEl.classList.toggle('active', trackEl.id === 'track-' + track);
  });
}

function createSpeakerCard(speaker, language) {
  const langFlags = {
    'pt-br': '🇦🇴',
    'fr-FR': '🇫🇷',
    'en-US': '🇬🇧'
  };
  const langNames = {
    'pt-br': 'Português',
    'fr-FR': 'Français',
    'en-US': 'English'
  };
  const hasPhoto = speaker.photoUrl && speaker.photoUrl.trim() !== '';
  
  const photoContent = hasPhoto 
    ? `<img src="${speaker.photoUrl}" alt="${speaker.name}" loading="lazy">` 
    : `<div class="speaker-card-initials">${speaker.initials}</div>`;
  
  const linkedinLink = speaker.linkedin 
    ? `<div class="speaker-card-social"><a href="${speaker.linkedin}" target="_blank" rel="noopener noreferrer" title="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></div>` 
    : '';
  
  const speakerTitle = speaker.title 
    ? `<span class="speaker-card-title">${speaker.title}</span>` 
    : '';
  
  return `
    <div class="speaker-card">
      <div class="speaker-card-photo">
        ${photoContent}
      </div>
      <h3 class="speaker-card-name">${speaker.name}</h3>
      ${speakerTitle}
      <span class="speaker-card-lang">${langFlags[language] || '🌍'} ${langNames[language] || language}</span>
      ${linkedinLink}
    </div>
  `;
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderSpeakers(data) {
  const speakersContainer = document.getElementById('speakers-container');
  const allSpeakers = [];
  const seenNames = new Set();
  
  // Collect unique speakers from all tracks
  for (const [langKey, track] of Object.entries(data.tracks)) {
    track.talks.forEach(talk => {
      talk.speakers.forEach(speaker => {
        if (!seenNames.has(speaker.name)) {
          seenNames.add(speaker.name);
          allSpeakers.push({
            ...speaker,
            talkTitle: talk.title,
            language: langKey
          });
        }
      });
    });
  }
  
  // Shuffle and render speaker cards
  const shuffledSpeakers = shuffleArray(allSpeakers);
  speakersContainer.innerHTML = shuffledSpeakers.map(speaker => createSpeakerCard(speaker, speaker.language)).join('');
}

function createSessionCard(talk) {
  const timeDisplay = talk.time || 'TBA';
  
  // Handle break items differently
  if (talk.isBreak) {
    return `
      <div class="agenda-item agenda-break">
        <div class="agenda-time-block">
          <div class="agenda-time agenda-time-break">${timeDisplay}</div>
          <div class="agenda-time-line"></div>
        </div>
        <div class="agenda-content agenda-content-break">
          <h3 class="agenda-title">${talk.title}</h3>
          <p class="agenda-abstract">${talk.abstract}</p>
        </div>
      </div>
    `;
  }
  
  const speakerNames = talk.speakers.map(s => s.name).join(' & ');
  const firstSpeaker = talk.speakers[0];
  const initials = talk.speakers.map(s => s.initials).join('/');
  
  const speakersHtml = talk.speakers.map(speaker => {
    const hasPhoto = speaker.photoUrl && speaker.photoUrl.trim() !== '';
    const avatarContent = hasPhoto 
      ? `<img src="${speaker.photoUrl}" alt="${speaker.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` 
      : speaker.initials;
    const hasLinkedin = speaker.linkedin && speaker.linkedin.trim() !== '';
    
    const avatarEl = hasLinkedin 
      ? `<a href="${speaker.linkedin}" target="_blank" rel="noopener noreferrer" class="agenda-speaker-avatar speaker-link">${avatarContent}</a>`
      : `<div class="agenda-speaker-avatar">${avatarContent}</div>`;
    
    const nameEl = hasLinkedin
      ? `<a href="${speaker.linkedin}" target="_blank" rel="noopener noreferrer" class="speaker-name-link"><span class="agenda-speaker-name">${speaker.name}</span></a>`
      : `<span class="agenda-speaker-name">${speaker.name}</span>`;
    
    return `
    <div class="agenda-speaker">
      ${avatarEl}
      <div class="speaker-info">
        ${nameEl}
        <p>${speaker.title|| ""}</p>
      </div>
    </div>
  `;
  }).join('');
  
  // Generate data attributes for live status check
  const timeDataAttr = timeDisplay !== 'TBA' ? `data-time="${timeDisplay}"` : '';
  
  return `
    <div class="agenda-item" ${timeDataAttr}>
      <div class="agenda-time-block">
        <div class="agenda-time">${timeDisplay}</div>
        <div class="agenda-time-line"></div>
      </div>
      <div class="agenda-content">
        <div class="agenda-speakers-row">
          ${speakersHtml}
        </div>
        <h3 class="agenda-title">${talk.title}</h3>
        <p class="agenda-abstract">${talk.abstract}</p>
        <span class="agenda-online-badge" style="display: none;"><span class="online-dot"></span>AO VIVO</span>
      </div>
    </div>
  `;
}

// Parse time range like "09:00 – 09:30" and check if current time is within
function isSessionLive(timeStr) {
  if (!timeStr || timeStr === 'TBA') return false;
  
  // Event date: March 7, 2026
  const eventDate = '2026-03-07';
  const now = new Date();
  
  // Parse time range (handles both "–" and "-")
  const timeParts = timeStr.split(/\s*[–-]\s*/);
  if (timeParts.length !== 2) return false;
  
  const [startTime, endTime] = timeParts;
  
  // Create Date objects for start and end times (UTC+1 = West Africa Time)
  const startDate = new Date(`${eventDate}T${startTime}:00+01:00`);
  const endDate = new Date(`${eventDate}T${endTime}:00+01:00`);
  
  return now >= startDate && now <= endDate;
}

// Update live status for all agenda items
function updateLiveStatus() {
  const agendaItems = document.querySelectorAll('.agenda-item[data-time]');
  
  agendaItems.forEach(item => {
    const timeStr = item.getAttribute('data-time');
    const badge = item.querySelector('.agenda-online-badge');
    
    if (badge) {
      if (isSessionLive(timeStr)) {
        badge.style.display = 'inline-flex';
        item.classList.add('is-live');
      } else {
        badge.style.display = 'none';
        item.classList.remove('is-live');
      }
    }
  });
}

// Start live status checker (updates every 30 seconds)
function startLiveStatusChecker() {
  updateLiveStatus();
  setInterval(updateLiveStatus, 30000);
}

// Sort talks by time
function sortTalksByTime(talks) {
  return [...talks].sort((a, b) => {
    const timeA = a.time || 'ZZZ';
    const timeB = b.time || 'ZZZ';
    return timeA.localeCompare(timeB);
  });
}

function renderTracks(data) {
  const tabsContainer = document.getElementById('track-tabs-container');
  const sessionsContainer = document.getElementById('sessions-container');
  
  // Track mapping: JSON key -> display tab key
  const trackMapping = {
    'pt-br': { key: 'pt', flag: '🇦🇴', name: 'Português' },
    'fr-FR': { key: 'fr', flag: '🇫🇷', name: 'Français' },
    'en-US': { key: 'en', flag: '🇬🇧', name: 'English' }
  };
  
  // Clear existing content
  tabsContainer.innerHTML = '';
  sessionsContainer.innerHTML = '';
  
  // Create tabs and track containers
  let isFirst = true;
  for (const [jsonKey, trackInfo] of Object.entries(trackMapping)) {
    const track = data.tracks[jsonKey];
    if (!track) continue;
    
    // Create tab button
    const tabBtn = document.createElement('button');
    tabBtn.className = 'track-tab' + (isFirst ? ' active' : '');
    tabBtn.dataset.track = trackInfo.key;
    const talkCount = track.talks.filter(talk => !talk.isBreak).length;
    tabBtn.textContent = `${trackInfo.flag} ${trackInfo.name} (${talkCount})`;
    tabBtn.addEventListener('click', function() {
      setTrack(this.dataset.track);
    });
    tabsContainer.appendChild(tabBtn);
    
    // Create track container
    const trackDiv = document.createElement('div');
    trackDiv.className = 'sessions-track' + (isFirst ? ' active' : '');
    trackDiv.id = 'track-' + trackInfo.key;
    
    const agendaList = document.createElement('div');
    agendaList.className = 'agenda-list';
    
    // Sort and add session cards
    const sortedTalks = sortTalksByTime(track.talks);
    sortedTalks.forEach(talk => {
      agendaList.innerHTML += createSessionCard(talk);
    });
    
    trackDiv.appendChild(agendaList);
    sessionsContainer.appendChild(trackDiv);
    
    isFirst = false;
  }
}

async function loadTalks() {
  try {
    const response = await fetch('./talks.json');
    talksData = await response.json();
    renderSpeakers(talksData);
    renderTracks(talksData);
    startLiveStatusChecker();
  } catch (error) {
    console.error('Error loading talks:', error);
  }
}

// Registration modal functions
function openRegistrationModal(event) {
  event.preventDefault();
  const modal = document.getElementById('registration-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeRegistrationModal() {
  const modal = document.getElementById('registration-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Load saved language preference and talks data
document.addEventListener('DOMContentLoaded', function() {
  displayLocalTime();
  
  // Attach click handlers to registration buttons
  document.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', openRegistrationModal);
  });
  
  // Close modal when clicking outside
  const modal = document.getElementById('registration-modal');
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      closeRegistrationModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeRegistrationModal();
    }
  });
  
  loadTalks().then(() => {
    const savedLang = localStorage.getItem('mvpconf-africa-lang') || 'en';
    setLanguage(savedLang);
  });
});
